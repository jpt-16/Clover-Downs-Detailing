/**
 * Per-town content for the /mobile-detailing/[town] pages.
 *
 * These pages exist to rank for typed searches — "mobile detailing Danvers
 * MA" and the like — which show ordinary blue-link results underneath the
 * map. They do not affect "detailing near me": that is the map pack, and the
 * map pack is decided by the Google Business Profile and by how far the
 * searcher is from you, not by anything on this site.
 *
 * The rule that makes or breaks this set: eight pages with the town name
 * swapped and nothing else changed are doorway pages, which Google
 * demotes on purpose. So every field below is written from something
 * genuinely true of that specific town — the roads, the coast, the trees,
 * what parking is like. If a new town is added and there is nothing real to
 * say about it, leave it out of this file rather than padding it. It can
 * still appear in `site.towns` and be served like any other.
 *
 * Nothing here claims work already done in a town. Describing what a place
 * does to cars is honest; inventing a customer history is not, and Google
 * has no way to tell the difference but people do.
 */

export type Town = {
  /** URL segment. */
  slug: string;
  /** Display name, matching the entry in site.towns. */
  name: string;
  /**
   * Page meta description. Written per town around what that town actually
   * does to a car — these were eight copies of one sentence, which Google
   * rewrites and which wastes the click. Keep under 155 characters.
   */
  metaDescription: string;
  /** Where it sits relative to Beverly, in plain terms. */
  proximity: string;
  /** Opening paragraph. Specific to the town, never a template. */
  intro: string;
  /** What this particular town does to a car. Two or three, concrete. */
  conditions: { label: string; copy: string }[];
  /** Practical note on detailing there — space, water, parking. */
  logistics: string;
  /**
   * Two questions specific to this town, shown above the three general ones.
   *
   * Grounded in the conditions already listed above and in
   * competitor-research.md §2.1, which is where beach sand, road salt, tree
   * sap and highway film come from as recurring customer language. A town
   * question that could be asked about anywhere is not a town question —
   * leave it out rather than pad the set.
   */
  faqs: { q: string; a: string }[];
};

export const towns: Town[] = [
  {
    slug: "beverly",
    faqs: [
      {
        q: "Can you get beach sand out of the carpet?",
        a: "Yes, and it is one of the most common reasons people book here. Sand from Lynch Park and Dane Street sinks past the pile to the carpet backing, which is why vacuuming lifts some and leaves the rest — drive a mile and a fresh scatter appears. It needs the carpet flushed and pulled back out, which is the extraction step in a full interior detail.",
      },
      {
        q: "I park on the street in town. Can you still do it?",
        a: "Usually, yes. Street-parked cars in the denser parts of Beverly are normally workable — the limit is whether a tap and an outlet reach the car, not whether there is a driveway. Say where the car sits when you ask and you will get a straight answer before anything is booked.",
      },
    ],
    metaDescription:
      "Mobile detailing in Beverly, MA — done in your driveway. Winter salt off 128, harbor air, Lynch Park sand. Free quote by text, no deposit.",
    name: "Beverly",
    proximity: "Home base. The van starts here.",
    intro:
      "Beverly is where this business is based, so it is the town we know best and the one we can usually reach soonest. From Ryal Side and North Beverly down to the Cove and Prides Crossing, it is all within a few minutes of the door.",
    conditions: [
      {
        label: "Winter salt off 128 and Cabot Street",
        copy: "Beverly's main roads get salted hard, and it collects in the wheel wells and along the rocker panels where it sits and works on the paint long after the snow is gone. It also comes inside on boots, into the carpet, where it dries to a white crust that vacuuming alone does not lift.",
      },
      {
        label: "Harbor air",
        copy: "Anywhere near the water carries salt in the air year-round, not just in winter. It settles on trim and glass and dulls a finish faster than most people expect.",
      },
      {
        label: "Beach sand, June to September",
        copy: "Dane Street and Lynch Park put sand in the footwells and under the seat rails all summer. Sand is abrasive — left in the carpet it grinds at the fibres every time someone shifts their feet.",
      },
    ],
    logistics:
      "Most Beverly homes have a driveway and an outdoor spigot, which is all the job needs. Street-parked cars in the denser parts of town are usually workable too — just say where it sits when you ask for a quote.",
  },
  {
    slug: "beverly-farms",
    faqs: [
      {
        q: "Is a wax worth it out here?",
        a: "More than almost anywhere else we cover. Beverly Farms gets salt in the air all year, not only when the roads are treated, and it settles on trim and glass and dulls the finish. A hand wax gives that something to sit on other than your clear coat, and makes the next wash pull it off far more easily.",
      },
      {
        q: "Our driveway is gravel. Does that matter?",
        a: "Not for the work itself. Gravel and shell drives throw dust up onto the lower panels between washes, which is worth knowing when you decide how often to book, but the job runs the same as it does on asphalt.",
      },
    ],
    metaDescription:
      "Mobile detailing in Beverly Farms, MA. Year-round salt air, sap under the trees, gravel drives. Free quote by text.",
    name: "Beverly Farms",
    proximity: "About ten minutes up the coast from downtown Beverly.",
    intro:
      "Beverly Farms is coastal, wooded and quiet, and cars there take a particular kind of beating — not road grime so much as salt air, tree cover and gravel. It is a short run from home base, so scheduling is rarely a problem.",
    conditions: [
      {
        label: "Salt air, all year",
        copy: "Close enough to the water that salt never really leaves the paint. It is the single best argument for a hand wax out here: the wax is the layer that takes the abuse instead of the clear coat.",
      },
      {
        label: "Sap and pollen under the trees",
        copy: "The tree cover that makes the Farms pleasant to live in also drops sap on the roof and hood, and coats everything in yellow for a few weeks each spring. Sap hardens and bonds — the longer it sits, the more work it is to remove without marring anything.",
      },
      {
        label: "Gravel and shell driveways",
        copy: "Grit gets tracked from the drive into the footwells, and thrown up into the wheel wells and along the lower doors. It is the reason interiors out here often need extraction rather than a vacuum.",
      },
    ],
    logistics:
      "Space is rarely an issue — driveways here tend to be long and private. Some of the lanes are narrow, so we park considerately and work off your outdoor tap.",
  },
  {
    slug: "danvers",
    faqs: [
      {
        q: "What is the film that builds up from commuting on 1 and 128?",
        a: "Road film — a mix of exhaust particulate, brake dust and whatever the road surface throws up, bonded on rather than sitting loose. A tunnel wash takes the top off it. It comes off properly with a two-bucket hand wash, wheels and wells done first with their own tools so the brake dust never reaches the paint.",
      },
      {
        q: "When is bug season worth booking around?",
        a: "Late spring through summer, and the sooner after a long drive the better. Bug residue is acidic and etches into clear coat if it bakes on, so it gets taken off chemically as its own step rather than scrubbed at once it has set.",
      },
    ],
    metaDescription:
      "Mobile detailing in Danvers, MA. Highway film off 1 and 128, bug season, winter spray. Free quote by text, no deposit to book.",
    name: "Danvers",
    proximity: "Ten minutes inland from Beverly.",
    intro:
      "Danvers sits where Route 1 meets 128, which makes it convenient to live in and hard on cars. Most of what we see on a Danvers car is highway mileage: the grime, the bug splatter and the winter spray that come from spending real time at speed.",
    conditions: [
      {
        label: "Highway film",
        copy: "Miles on 1 and 128 lay down a grey film of road grime and brake dust that a drive-through wash smears rather than removes. It shows up worst on white and silver cars, and on the wheels.",
      },
      {
        label: "Bug season",
        copy: "Late spring through summer, the front bumper, mirrors and windshield take the worst of it. Bug residue is acidic — left baked on through a few hot days it etches into the clear coat, so it is worth getting off sooner rather than later.",
      },
      {
        label: "Winter spray",
        copy: "Salt brine off high-speed lanes coats the whole lower half of the car, not just the wheel wells. It is the reason a winter wash matters more here than it looks like it should.",
      },
    ],
    logistics:
      "Danvers is mostly suburban driveways with easy access and an outdoor tap, which is the straightforward version of this job. Commercial and office lots work too if you would rather it happen while you are at work — just clear it with whoever manages the lot.",
  },
  {
    slug: "salem",
    faqs: [
      {
        q: "I do not have a driveway. Does that rule me out?",
        a: "No. Plenty of Salem is street-parked and it is usually workable — what matters is whether a tap and an outlet reach the car, and that the car can sit for a few hours. Tell us where it parks when you ask for a quote so it is settled beforehand rather than on the doorstep.",
      },
      {
        q: "Does street parking actually make the car dirtier?",
        a: "Yes, in winter especially. Snow gets ploughed into the parking lane and sits against the car far longer than it would in a driveway, so salt spends more time against the paint and more of it comes inside on boots. It is worth washing more often through the winter here than a driveway car would need.",
      },
    ],
    metaDescription:
      "Mobile detailing in Salem, MA. Street-parked or driveway, we work around it. Free quote by text — tell us where the car sits.",
    name: "Salem",
    proximity: "Ten minutes south along the coast.",
    intro:
      "Salem is the densest town on our list, and the one where the logistics matter as much as the detailing. A lot of Salem cars live on the street rather than in a driveway, which changes what they need and how we plan the visit — worth sorting out up front rather than on the day.",
    conditions: [
      {
        label: "Street parking wear",
        copy: "Cars parked on tight downtown streets pick up curbed wheels, door marks and a general film that garaged cars do not. Wheel cleaning and a proper hand wash make more visible difference here than almost anywhere else we go.",
      },
      {
        label: "Harbor salt",
        copy: "Salem is on the water, and the same salt air that works on boats works on cars — on trim, on glass, and on any paint that has not been waxed in a while.",
      },
      {
        label: "October",
        copy: "The month Salem fills up. Traffic, foot traffic and street closures make scheduling tighter, and parking harder to guarantee. Book further ahead in the autumn than you would any other time of year.",
      },
    ],
    logistics:
      "Here is the honest part: the job needs a spot to work and access to water and power. If you have a driveway or a dedicated space, no problem. If your car lives on the street, a quiet stretch with a resident permit usually works, or a shared lot if your building has one — but tell us when you ask for the quote so we can plan it rather than discover it.",
  },
  {
    slug: "peabody",
    faqs: [
      {
        q: "What does commuting do to the wheels?",
        a: "Brake dust, mostly, and it is metallic — it embeds rather than settles. That is why wheels and wheel wells get done first with their own tools and never with anything that later touches paintwork. Commuter miles put more of it on than most people expect.",
      },
      {
        q: "Is it worth washing in the middle of winter?",
        a: "Yes. The January wash is worth more than the April one. Brine coats the lower panels, sills and wheel wells and holds moisture against bare metal at the seams — that becomes a bodyshop problem, which costs a great deal more than a wash. It needs a day above freezing and a working outdoor tap.",
      },
    ],
    metaDescription:
      "Mobile detailing in Peabody, MA. Commuter miles, brake dust, road salt. Done in your driveway — free quote by text, no deposit.",
    name: "Peabody",
    proximity: "About fifteen minutes west.",
    intro:
      "Peabody is the biggest of the towns we cover and the most spread out, which mostly means more driving per car. Inland, so less of the coastal salt air, but a full share of commuter miles and winter road treatment.",
    conditions: [
      {
        label: "Commuter miles",
        copy: "Peabody sits on the daily run into Boston for a lot of people, and cars that do that mileage collect brake dust on the wheels and road film along the sides faster than weekend cars do.",
      },
      {
        label: "Winter road salt",
        copy: "Inland means less airborne salt, not less salt. Peabody roads get treated thoroughly, and it ends up in the wheel wells, along the sills, and inside on the carpet.",
      },
      {
        label: "Retail lot life",
        copy: "Time in the big lots off Route 114 is where door dings and shopping-cart marks come from. We cannot undo a dent, but a proper wash and wax makes the paint around it stop drawing the eye.",
      },
    ],
    logistics:
      "Suburban driveways throughout, so access is usually simple. Peabody is at the outer edge of our normal range, which occasionally means less flexibility on same-day timing — ask and we will tell you honestly.",
  },
  {
    slug: "wenham",
    faqs: [
      {
        q: "Can you get tree sap off without damaging the paint?",
        a: "Yes. Sap is bonded to the clear coat rather than sitting on it, so it comes off chemically before anything is dragged across it. That order matters — wiping at sap smears it into a wider, thinner film and can put fine scratches in the paint.",
      },
      {
        q: "The car is always dusty from the unpaved edges. Is that just a wash?",
        a: "Usually. Dust off the unpaved shoulders is loose rather than bonded, so an exterior hand wash handles it. It is worth knowing that dust is abrasive when dry — dragging a cloth over a dusty panel is how swirl marks start, which is why a proper wash floods it off first.",
      },
    ],
    metaDescription:
      "Mobile detailing in Wenham, MA. Sap, pollen and dust off the unpaved edges. Done in your driveway — free quote by text.",
    name: "Wenham",
    proximity: "Ten minutes north.",
    intro:
      "Wenham is small, green and quiet, and cars there tend to come in with a different problem than the highway towns: less grime, more of what falls out of trees and blows off unpaved ground.",
    conditions: [
      {
        label: "Sap, pollen and leaf stain",
        copy: "Heavy tree cover means sap on the paint in summer, a yellow coat of pollen in spring, and wet leaves in autumn that leave tannin marks if they sit on a horizontal panel long enough. All three are easier to remove early than late.",
      },
      {
        label: "Dust off unpaved edges",
        copy: "Dirt and gravel shoulders throw fine dust that settles into panel gaps, door shuts and the lower trim, and gets tracked inside on shoes.",
      },
      {
        label: "Winter salt, same as everywhere",
        copy: "Rural roads still get treated. Quieter roads sometimes means it sits longer before a rain rinses any of it off.",
      },
    ],
    logistics:
      "Space and water are almost never a problem in Wenham — long driveways, room to work, outdoor taps as standard. This is the easy version of the job.",
  },
  {
    slug: "hamilton",
    faqs: [
      {
        q: "The truck has hay and dirt in the back. Is that a problem?",
        a: "No. Hay, feed and dirt off the farm tracks are ordinary work here, and it costs no more than the quote for being what you already described. Send a photo of the worst of it and the price accounts for it up front.",
      },
      {
        q: "Can you come to the barn instead of the house?",
        a: "Yes, provided the same two things are there — an outdoor tap and a power outlet within reach of where the vehicle sits. Whichever is easier for you. Say which when you ask so the visit is planned around it.",
      },
    ],
    metaDescription:
      "Mobile detailing in Hamilton, MA. Dirt roads, hay, pet hair, sap. Detailed at the house or the barn — free quote by text.",
    name: "Hamilton",
    proximity: "About fifteen minutes north.",
    intro:
      "Hamilton is horse country, and it shows up in the cars. Between the dirt roads, the farm tracks and everything that gets carried in the back, Hamilton interiors are usually the ones that benefit most from a full extraction rather than a wash.",
    conditions: [
      {
        label: "Dirt roads and farm tracks",
        copy: "Mud in the wheel wells and along the lower panels in the wet months, fine dust everywhere in the dry ones. Both end up inside on the mats and the seat bases.",
      },
      {
        label: "What rides in the back",
        copy: "Hay, feed, dog hair, wet boots and tack are ordinary cargo out here. Pet hair in particular does not vacuum out cleanly once it is worked into the carpet — it needs to be lifted, which is part of a full interior rather than a quick clean.",
      },
      {
        label: "Tree cover",
        copy: "Same sap and pollen story as Wenham next door, and the same argument for wax as the thing that takes the hit instead of your paint.",
      },
    ],
    logistics:
      "Long driveways and plenty of room, which makes this a straightforward visit. If the car lives at a barn rather than the house, that is usually workable — we just need water and an outlet within reach.",
  },
  {
    slug: "manchester-by-the-sea",
    faqs: [
      {
        q: "How much sand does Singing Beach actually put in a car?",
        a: "More than it looks, and it is fine enough to work into the seat mechanism and the belt reel as well as the carpet. Because it sits at the backing rather than the surface, a vacuum takes what is on top and the rest shakes back up as you drive. Extraction is what actually clears it.",
      },
      {
        q: "Does living this close to the water change what the car needs?",
        a: "Yes. Ocean salt is in the air year-round here, not just when the roads are treated, and harbor damp keeps interiors slower to dry out. In practice that means washing more often than an inland car, a wax before winter rather than after it, and dealing with a musty smell at the source rather than spraying over it.",
      },
    ],
    metaDescription:
      "Mobile detailing in Manchester-by-the-Sea. Singing Beach sand, ocean salt, harbor damp. Detailed in your driveway — free quote by text.",
    name: "Manchester-by-the-Sea",
    proximity: "About fifteen minutes up the coast.",
    intro:
      "Manchester is the most exposed town we cover. Sitting directly on the ocean, it is harder on paint, trim and brightwork than anywhere else on the list — and the one place where keeping wax on the car is less about shine than about protection.",
    conditions: [
      {
        label: "Direct ocean salt",
        copy: "Not the diluted version a few miles inland — actual sea air, constantly. It works on clear coat, pits brightwork over time, and leaves a haze on glass that ordinary washing does not fully clear.",
      },
      {
        label: "Singing Beach sand",
        copy: "Fine, and it travels. It gets under the seat rails, into the seat-belt buckles, and deep into the carpet pile where it stays until something extracts it. It is abrasive, so it is not only a tidiness problem.",
      },
      {
        label: "Harbor damp",
        copy: "Cars parked near the water sit in damp air for long stretches, which is how interiors start to smell musty even when they look clean. That is an odor-at-the-source job, not an air freshener one.",
      },
    ],
    logistics:
      "Coastal driveways, some narrow lanes near the harbor. We park considerately and work off your outdoor tap. Worth asking about a hand wax here more than anywhere else we go — it is the town where it earns its money fastest.",
  },
];

export const townBySlug = new Map(towns.map((t) => [t.slug, t]));
