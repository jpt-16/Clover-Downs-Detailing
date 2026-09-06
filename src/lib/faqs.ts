/**
 * FAQ question bank.
 *
 * Every question below is grounded in research, not invented. Two sources:
 *
 *  1. competitor-research.md §3, Sam's Mobile Detailing FAQ — a written record
 *     of the seven questions that decide bookings in this market. The audit
 *     (§3.5) repeats five of them for the same reason.
 *  2. competitor-research.md §2.3 and §2.4 — what customers hesitated over,
 *     and the complaint themes in one-star reviews across six businesses.
 *
 * The source is named against each entry. If a question cannot be traced to
 * one of them, it does not belong here — a plausible-sounding FAQ nobody
 * actually asks is filler that dilutes the ones people do ask.
 *
 * Answers are the site's existing positions, stated plainly. Nothing here
 * promises anything the business does not already do.
 */

export type Faq = { q: string; a: string };

/** Water and power. Sam's FAQ asks it directly; audit §5.2 says answer it in
 *  the open because our answer differs from competitors who bring their own. */
export const WATER_AND_POWER: Faq = {
  q: "Do I have to provide water and electricity?",
  a: "Yes — an outdoor tap and a standard power outlet within reach of the car. Almost every house on the North Shore has both. If your spigot is shut off for the winter, or nothing reaches the car, say so when you ask for a quote and we will work it out beforehand rather than on the day.",
};

/** Sam's FAQ: "Is a driveway necessary?" — and §2.3, where a customer worried
 *  their narrow street made the job impossible. */
export const DRIVEWAY: Faq = {
  q: "Do I need a driveway?",
  a: "A driveway is easiest, but it is not the only option. What the job needs is somewhere the car can sit for a few hours with a tap and an outlet in reach. If you are on the street or in a shared lot, tell us where the car sits when you ask and we will tell you straight whether it works.",
};

/** Sam's FAQ: "How long does a full car detailing take?" — and §2.2, where
 *  customers cite four and five hours approvingly. */
export const HOW_LONG: Faq = {
  q: "How long does it take?",
  a: "Three to five hours for a full interior, about an hour for an exterior hand wash on its own, and most of a session for both together. Bigger or dirtier cars take longer. A realistic time is a good sign — nobody does a proper interior in forty-five minutes.",
};

/** §2.4 complaint 3: a one-star review about seats still soaked on the drive
 *  home. Nobody publishes drying time. */
export const COMES_BACK_WET: Faq = {
  q: "Does the car come back wet?",
  a: "Damp, not wet. Extracted carpet gives the water back rather than holding it, and it dries in a few hours with the windows cracked. Genuinely soaked seats mean shampoo went in and never came out, which is the opposite of what extraction does.",
};

/** §2.4 complaint 1: the biggest theme across every negative review — no
 *  expectation-setting, belongings emptied onto the floor, a first-time
 *  customer with no idea what was supposed to happen. */
export const HOW_TO_PREPARE: Faq = {
  q: "What should I do before you arrive?",
  a: "Take out anything you care about — change in the cupholder, sunglasses, the garage remote, paperwork in the door pockets, the kids' things off the seat backs. That is all. A cleared-out car gets a better job, because the seats can move and the corners are reachable. You do not need to clean anything first.",
};

/** §2.4 complaint 6: a review describing a deposit and a disputed card charge
 *  escalating to the bank. §5 of the research: nobody markets its absence. */
export const DEPOSIT_AND_PAYMENT: Faq = {
  q: "Do you take a deposit, and how do I pay?",
  a: "No deposit. You pay on the day, once the car is done and you have looked at it. Cash, check, Zelle, Venmo or Cash App. The price quoted is the price paid unless you add something to the job.",
};

/** Sam's FAQ: "Do you offer same-day service?" — and §2.2, where fast human
 *  response is one of the top booking reasons. */
export const SAME_DAY: Faq = {
  q: "How soon can you come out?",
  a: "Quotes usually come back the same day. The visit itself depends on the week and the weather — exterior work needs a day above freezing. Text a photo and you will get a real answer rather than a holding reply.",
};

/** Sam's FAQ: "What's the difference between mobile and in-shop detailing?"
 *  — and §2.3, "is it just an expensive car wash?" */
export const WHY_MOBILE: Faq = {
  q: "What is the difference between this and a shop?",
  a: "The work happens where the car is parked, so there is no drop-off, no waiting room and no second trip to collect it. We do interior detailing and exterior hand washing. We do not do ceramic coating or paint correction — those need a shop, and we will say so rather than sell you something else.",
};

/** §2.1 and §2.5: pet hair is a paid add-on at every competitor, at $25-$75,
 *  and noticeable enough that customers mention the charge in reviews. */
export const PET_HAIR: Faq = {
  q: "Is there an extra charge for pet hair?",
  a: "No. Pet hair is part of the full interior detail. Most places locally add $25 to $75 for it. If your car has a dog in it, that is just the job.",
};

/** §2.4 complaint 4: a reviewer told about the vacuum bag and the sand in the
 *  machine, and reading it as being blamed for the mess they booked to fix. */
export const HOW_MESSY: Faq = {
  q: "My car is really bad. Is that a problem?",
  a: "No, and the messier it is the more useful a photo is. We would rather see it than guess, and a car in a state is the reason the service exists. You will not be charged more than the quote for it being what you already told us it was.",
};

/** The general set used on the homepage and, in part, on every town page. */
export const GENERAL_FAQS: Faq[] = [
  WATER_AND_POWER,
  DRIVEWAY,
  HOW_LONG,
  COMES_BACK_WET,
  HOW_TO_PREPARE,
  DEPOSIT_AND_PAYMENT,
  WHY_MOBILE,
  SAME_DAY,
];

/** The three general questions carried onto every town page, alongside two
 *  local ones. Kept to the booking blockers rather than the full set, so the
 *  town pages do not turn into eight copies of the homepage FAQ. */
export const TOWN_GENERAL_FAQS: Faq[] = [WATER_AND_POWER, DRIVEWAY, DEPOSIT_AND_PAYMENT];
