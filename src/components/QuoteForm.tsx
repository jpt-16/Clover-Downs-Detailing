"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { site, telHref, smsHref, FORMSUBMIT_ENDPOINT } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

// No focus:outline-none here. The green border alone is a 1px cue, weaker
// than the 2px ring every other control on the site gets; keeping both means
// the fields match, and focus stays obvious against a dark field.
const FIELD =
  "w-full border border-rule-strong bg-ink-raised px-4 py-3.5 text-[0.9375rem] text-bone placeholder:text-dim/70 transition-colors focus:border-leaf";
const LABEL = "block text-[0.6875rem] tracking-[0.2em] text-dim uppercase mb-2";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          // FormSubmit's underscore-prefixed fields configure the email it sends.
          _subject: `Quote request — ${data.name || "new customer"} (${data.town || "North Shore"})`,
          // Replies from your inbox go straight back to the customer.
          _replyto: data.email,
          _template: "table",
          // Their captcha page cannot be completed from an AJAX request.
          _captcha: "false",
        }),
      });

      // FormSubmit returns success as the string "true", not a boolean.
      const result = (await res.json()) as { success?: boolean | string; message?: string };
      const ok = res.ok && (result.success === true || result.success === "true");

      if (ok) {
        setStatus("sent");
        // The conversion. Counted here rather than on the button so a failed
        // send is never recorded as a lead.
        track("quote_requested");
        form.reset();
      } else {
        setStatus("error");
        setError(result.message || "That did not go through.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server. Check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-leaf/40 bg-leaf/[0.06] p-8 sm:p-10">
        <span className="eyebrow">Request received</span>
        <p className="mt-4 text-2xl font-light tracking-[-0.02em] text-bone">Thanks — we&rsquo;ll be in touch.</p>
        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
          You&rsquo;ll get a price and a time back, usually the same day. If it&rsquo;s urgent, call or text{" "}
          <a href={telHref} className="text-leaf underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.75rem] tracking-[0.18em] text-dim uppercase transition-colors hover:text-leaf"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
      {/* FormSubmit's spam trap — hidden from people, tempting to bots. Any
          submission that fills it in is silently discarded on their side. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={LABEL}>
            Name
          </label>
          <input id="q-name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={FIELD} />
        </div>
        <div>
          <label htmlFor="q-email" className={LABEL}>
            Email
          </label>
          <input
            id="q-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="q-phone" className={LABEL}>
            Phone
          </label>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(978) 555-0142"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="q-town" className={LABEL}>
            Town
          </label>
          <input
            id="q-town"
            name="town"
            type="text"
            required
            list="town-list"
            placeholder={site.city}
            className={FIELD}
          />
          <datalist id="town-list">
            {site.towns.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="q-vehicle" className={LABEL}>
            Vehicle
          </label>
          <input
            id="q-vehicle"
            name="vehicle"
            type="text"
            required
            placeholder="2019 Subaru Outback"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="q-service" className={LABEL}>
            Service
          </label>
          <select id="q-service" name="service" required defaultValue="" className={`${FIELD} appearance-none`}>
            <option value="" disabled>
              Choose one
            </option>
            <option value="Full interior detail">Full interior detail</option>
            <option value="Exterior hand wash">Exterior hand wash</option>
            <option value="Exterior hand wash + wax">Exterior hand wash + wax</option>
            <option value="Both, one visit">Both, one visit</option>
            <option value="Not sure — recommend something">Not sure — recommend something</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="q-notes" className={LABEL}>
          Anything we should know
        </label>
        <textarea
          id="q-notes"
          name="notes"
          rows={4}
          placeholder="Pet hair in the back, a coffee spill on the passenger seat, sap on the roof — the more you tell us, the tighter the quote."
          className={`${FIELD} resize-y`}
        />
      </div>

      {!FORMSUBMIT_ENDPOINT && (
        <p role="status" className="border border-rule-strong bg-ink-raised px-4 py-3 text-[0.8125rem] leading-relaxed text-dim">
          Form delivery is not configured yet — set <code className="text-leaf">email</code> in{" "}
          <code className="text-leaf">src/lib/site.ts</code>. Until then, use the call or text buttons.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="border border-red-500/40 bg-red-500/[0.07] px-4 py-3 text-[0.875rem] text-red-200">
          {error} You can always call or text{" "}
          <a href={telHref} onClick={() => track("call_tapped", { from: "quote_form" })} className="underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={status === "sending" || !FORMSUBMIT_ENDPOINT}
          className="btn-primary w-full px-8 py-4 text-sm disabled:opacity-60 sm:w-auto"
        >
          {/* Matches the hero button wording — the same promise, kept the
              whole way down the page. */}
          {status === "sending" ? "SENDING…" : "GET MY FREE QUOTE"}
        </button>
        <a href={smsHref} onClick={() => track("text_tapped", { from: "quote_form" })} className="btn-secondary w-full px-8 py-4 text-sm sm:w-auto">
          TEXT INSTEAD
        </a>
      </div>

      <p className="text-[0.75rem] tracking-[0.14em] text-dim uppercase">
        Free · No deposit · No obligation
      </p>

      <p className="text-[0.75rem] leading-relaxed text-dim">
        We use what you send here to quote your car and get back to you — nothing else. See our{" "}
        <a href="/privacy" className="text-leaf underline underline-offset-4">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
