# UTMB Mont-Blanc 2026 — brand activation leads

**149 leads · every one `research lead / unverified` · not a single fact here is confirmed.**

## What this is

The complete brand-event listing that marathon-weekend.com publishes for
**UTMB Mont-Blanc 2026 (24–30 August 2026, Chamonix)**. It is a shortlist of
*candidates to research*, not a dataset. Nothing here may be copied into
`data/cases/` without independent verification — see `research/README.md`.

## Where it came from

| | |
|---|---|
| Source | `https://www.marathon-weekend.com/chamonix/utmb-2026` |
| Retrieved | 17 September 2026 |
| Method | The page publishes a `schema.org/ItemList` of all 149 events in its own markup. Brand and event-type come from the rendered listing rows; dates, venue, coordinates, description and per-event URL come from the structured data. Both were joined on event title — all 149 matched, none dropped. |
| Access | `robots.txt` is `User-Agent: *` / `Allow: /` (it blocks only utm- and fbclid-tracked URLs). The site publishes an Imprint under German §5 TMG with no terms of use and no clause restricting automated access or reuse. |

## How much weight this source carries — very little

marathon-weekend.com is a **third-party aggregator run by a sole proprietor**
(Michel Tucker, Einzelunternehmer, Berlin, per its Imprint). It is not the
brand, not the event organiser, and not an editorial publication. In the
Atlas's own `SOURCE_TYPES` it would not qualify as `editorial`; it is a
**pointer to where to look**, nothing more.

Several entries are the aggregator openly admitting it is guessing — those
admissions are preserved verbatim in the notes below and are the single most
useful thing in this file. Examples:

- *"The post gives the day but no time, so the hours shown here are a placeholder rather than the real ones."*
- *"The chalet's address has not been published, so the map pin sits on Chamonix centre rather than the venue."*
- *"Two times are published and they disagree."*

Any lead carrying one of those sentences has **no usable date, time or address**
until a real source is found.

## Reading the fields

- **Dates** are the UTC dates from the structured data. Times in the source are
  genuine UTC and run two hours behind local Chamonix time (CEST, UTC+2) —
  a listing showing `06:00` is an `08:00` local start. Verified against three
  entries whose descriptions state the local time. Only dates are reproduced
  below; go to the source URL for times.
- **Coordinates** are the source's own pin. Where the venue address was never
  published the source pins Chamonix centre (`45.9237, 6.8694`) or the
  Ultra-Trail Village (`45.925066, 6.871988`) as a stand-in. Treat any pin
  matching those two exactly as *town-level only*.
- **Brand** is as the listing labels it. Where two or more are named, the
  activation is shared or one party is hosting the other — which of those it is
  has not been checked.

## Leads outside the official race week

`data/events/utmb-mont-blanc-2026.md` gives the edition as **24–30 August 2026**,
which matches this source exactly.

**Thirteen leads start before that window** (18–23 August) — the source flags
one of them as *"the week ahead of race week rather than during it."* Each is
marked *(starts before race week)* below. If any becomes a case, it does not sit
inside the edition's published window, which matters for the occupancy timeline
on the event page:

| Start | Lead |
|---|---|
| 18 Aug | Snell Sports Run Test with Salomon |
| 18–19 Aug | Snell Sports Run Tests |
| 19 Aug | Snell Sports Run Test with HOKA |
| 20 Aug | Hastko Run Test |
| 20 Aug | Big Mountain Basecamp at UTMB Mont-Blanc |
| 20 Aug | Rossignol x Petzl Trail Running Test |
| 20 Aug | Rossignol at UTMB Mont-Blanc |
| 21 Aug | HOKA Base Camp |
| 22 Aug | La Marzocco x i-Run Home of Mountains Chalet |
| 22 Aug | La Marzocco Home Barista Workshops |
| 23 Aug | Columbia: Crystal Curious, Hike x Gems |
| 23 Aug | Columbia Hike Society Summer Residency |
| 23 Aug | FUGA at the Ultra-Trail Village |

Note that **HOKA Base Camp is one of them** — the source gives it as 21–30
August, which starts three days before the edition does.

## Counts by listed type

| Type | Leads |
|---|---|
| Shakeout Run | 44 |
| **Pop-up / Expo** | **26** |
| Talk / Panel | 25 |
| Group Run | 19 |
| Other | 17 |
| Party | 11 |
| Recovery | 5 |
| Race | 2 |
| **Total** | **149** |

`Pop-up / Expo` is the type that maps onto what this Atlas records — a space
with a duration. `Shakeout Run`, the largest group, is mostly timed departures
from someone else's doorstep, and a departure point is not an activation.

## Leads that touch cases already in the Atlas

Flagged because they overlap existing records, not because they are verified:

- **The North Face at UTMB Mont-Blanc** — store-based, all week. Bears on the
  existing `the-north-face-basecamp-chamonix` case and on the 2025 TNF case
  noted as a future addition.
- **ASICS Trail Camp** at L'Index, 24–27 Aug, listed separately from the
  Runpack opening run. Bears on `asics-trail-pop-up-chamonix` and on the
  recorded hybrid-`spatialType` limitation.
- **SATISFY Off-Road Supply & Fuel Station** plus five numbered morning runs.
  Bears on `satisfy-chamonix-off-road-supply`.
- **HOKA Base Camp** (21–30 Aug, La Folie Douce terrace) and **HOKA Flylab**,
  listed as two separate spaces. Bears on `hoka-utmb-mont-blanc-ecosystem`.
- **Arc'teryx × Distance Aid Station** — its description mentions *"the nearby
  Echoes display at Place de l'Aiguille du Midi"*, which is the subject of the
  existing `arcteryx-echoes` case.

---

# Pop-up / Expo — 26 leads

**Big Mountain — Big Mountain Basecamp at UTMB Mont-Blanc**
20–27 Aug *(starts before race week)* · Big Mountain Basecamp · Chamonix-Mont-Blanc · 45.918118, 6.863855
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/big-mountain-basecamp-at-utmb-mont-blanc) · research lead / unverified
> The Big Mountain Basecamp on Avenue Ravanel le Rouge hosts three sessions across race week. Hastko runs a shoe test on 20 August. The Big Mountain Trail Club social run goes out on the evening of 26 August with beers and a raffle afterwards, and the CHAM-O orienteering challenge starts from there on the evening of 27 August.

**HOKA — HOKA Base Camp**
21–30 Aug *(starts before race week)* · La Folie Douce Hotels Chamonix, Après-Ski terrace · Chamonix-Mont-Blanc · 45.925429, 6.867371
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/hoka-base-camp) · research lead / unverified
> HOKA takes over the terrace at La Folie Douce Hotels Chamonix for a free public race-week pop-up. The ten-day base camp hosts group runs, athlete talks and evening parties.

**La Marzocco, i-Run — La Marzocco x i-Run Home of Mountains Chalet**
22–30 Aug *(starts before race week)* · Home of Mountains chalet · Chamonix-Mont-Blanc · 45.92307, 6.869984
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-marzocco-x-i-run-home-of-mountains-chalet) · research lead / unverified
> La Marzocco and i-Run take a chalet in Chamonix for nine days, from 22 to 30 August. A True Artisan Cafe runs daily from 09:00 to 15:00 with guest roasters, and the open house puts the espresso machines out to be tried. Free, with no registration for the chalet. The chalet's address has not been published, so the map pin sits on Chamonix centre rather than the venue.

**Columbia — Columbia Hike Society Summer Residency**
23–29 Aug *(starts before race week)* · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-hike-society-summer-residency) · research lead / unverified
> Columbia takes an ephemeral chalet in Chamonix from 23 to 29 August and runs a daily programme of guided hikes, workshops and community sessions as a slow counterpoint to race week. Mornings head into the massif behind a theme, from crystal hunting to navigation. Afternoons stay at the chalet for photography, mindfulness and debate. Every session is free and booked one at a time, with the exact meeting point shared by WhatsApp beforehand.

**FUGA, Kailas — FUGA at the Ultra-Trail Village**
23–28 Aug *(starts before race week)* · FUGA, Ultra-Trail Village Booth 87 · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/fuga-at-the-ultra-trail-village) · research lead / unverified
> FUGA, the trail line from Kailas, takes Booth 87 in the Ultra-Trail Village from 23 to 28 August, with athlete talks, workshops, social runs and product launches through the week. The same announcement gives a FUGA Store running 18 to 26 August, listed separately as the Kailas shop on Place de l'Église. No daily opening hours or session times are published.

**Compressport — Compressport Couloir Coffee Support Station**
24–30 Aug · Couloir Chamonix · Chamonix-Mont-Blanc · 45.923001, 6.87242
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/compressport-couloir-coffee-support-station) · research lead / unverified
> Compressport runs a support station inside Couloir Chamonix on Avenue Michel Croz, open 08:00 to 17:00 every day from 24 to 30 August. The Born to Race challenge starts at the door, a timed 2.92km Strava segment with 196 metres of climbing set against the Compressport athletes' times. Entries go in through the form with a screenshot of the activity, and the fastest man and woman on the evening of 30 August each take a full race kit. Free, with no registration for the station.

**Compressport — Compressport UTMB Week**
24–30 Aug · Ultra-Trail Village, Place du Mont-Blanc · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/compressport-utmb-week) · research lead / unverified
> Compressport works race week from a stand in the Ultra-Trail Village on Place du Mont-Blanc, where the range is out to try and the athlete team appears through the week. The Wednesday carries a morning run, an athlete presentation at 10:30 and a compression talk at 16:00, all at the Fan Experience. Friday night takes the brand to the Les Contamines cheer zone and Sunday to a support crew at La Flégère. A separate support station runs daily at Couloir Chamonix, listed here as its own entry. Free, with no registration for the stand.

**Goldwin — Goldwin Voxeloft Trail Jacket Launch**
24 Aug · Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/goldwin-voxeloft-trail-jacket-launch) · research lead / unverified
> Goldwin drops the Voxeloft Trail Jacket in limited numbers at the Ultra-Trail Village, an early look at it ahead of the 2026-27 autumn and winter season. Its adjustable multi-layer air structure changes how much it insulates as the weather and the effort change, and Pertex Shield Pro handles the waterproofing and the breathability. The post gives the day but no time, so the hours shown here are a placeholder rather than the real ones.

**Enduraw — Enduraw at UTMB Mont-Blanc**
24–27 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-at-utmb-mont-blanc) · research lead / unverified
> Enduraw runs its race week from its performance centre in Argentière, eight kilometres up the valley from Chamonix. Community trail runs go out on the Monday, Tuesday and Thursday mornings, a KOM challenge runs on the Wednesday morning and a performance and data conference fills the Wednesday afternoon. Each session is booked separately.

**Merrell — Merrell at the Ultra-Trail Village**
24–28 Aug · Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/merrell-at-the-ultra-trail-village) · research lead / unverified
> Merrell takes a stand in the Ultra-Trail Village on Place du Mont-Blanc from 24 to 28 August. The week runs on community runs, product testing and time with the Merrell team and other runners. Free, with no registration for the stand itself.

**Science in Sport — Science in Sport at the Ultra-Trail Village**
24–28 Aug · Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/science-in-sport-at-the-ultra-trail-village) · research lead / unverified
> Science in Sport takes a stand in the Ultra-Trail Village for five days, from 24 to 28 August, with athlete support and fuelling advice over the counter. Supported athletes including Josh Wade appear through the week. The stand publishes no daily opening hours.

**Ronhill — Ronhill at the Ultra-Trail Village**
24–28 Aug · Ultra-Trail Village (Stand 35) · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/ronhill-at-the-ultra-trail-village) · research lead / unverified
> Ronhill takes Stand 35 in the Ultra-Trail Village from 24 to 28 August, so race-week visitors can find the Manchester running brand in person. A test run is planned during the week with the time and route published separately. The stand publishes no daily opening hours.

**Goldwin, Product Index — Goldwin: Motion Studies Vol. 10 by Product Index**
24–29 Aug · Japonyard · Chamonix-Mont-Blanc · 45.915659, 6.863038
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/goldwin-motion-studies-vol-10-by-product-index) · research lead / unverified
> Product Index takes over Japonyard on Chemin du Lai from 24 to 29 August with an installation and workshop series built on Goldwin's Voxeloft insulation. Two invite-only field sessions test the material in the mountains, a hike on the 24th and a run on the 25th. Two open community runs follow on the 26th and 27th, each meeting at 08:00 and leaving at 08:15, with coffee and pancakes back at the installation. Open hours run 10:00 to 12:00 on both those mornings, free and with no booking.

**Rabbit — rabbit Clubhouse at Hotel Le Faucigny**
24–30 Aug · rabbit Clubhouse, Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rabbit-clubhouse-at-hotel-le-faucigny) · research lead / unverified
> rabbit takes over Hotel Le Faucigny for race week, open 09:00 to 18:00 Monday to Saturday and 09:00 to 11:00 on the Sunday. The week carries a 5k shakeout walk with Natalia Mastrota, Carbs and Coffee, a welcome reception, a 5k shakeout with Run the Alps, a Meet the Founders session with Tailwind and Halo, a wine and cheese evening with Raziq Rauf and a closing Toast to Chamonix. None of them has a published time and one registration covers the lot. A second rabbit chalet sits in the Vendor Village on Place du Mont-Blanc, open 24 to 28 August. Free, with registration for the clubhouse

**La Sportiva — La Sportiva at the Ultra-Trail Village**
24–30 Aug · La Sportiva booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-sportiva-at-the-ultra-trail-village) · research lead / unverified
> La Sportiva takes a booth in the Ultra-Trail Village from 24 to 30 August, with community runs, coffee with its athletes and trail shoes out to test. The programme is announced on the brand's Instagram rather than a published timetable, so daily opening hours are not given.

**(no brand given — event organiser) — Ultra-Trail Village Animations**
24–30 Aug · Fan Experience, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/ultra-trail-village-animations) · research lead / unverified
> The official animations programme on Place du Mont-Blanc, running through race week at the Fan Experience stage and around the village. Standing fixtures include the Suunto 90-year exhibition, Casa Vibram product testing and free Sidas Feetbox Evo foot analysis daily from 10:00 to 18:00. The stage carries solidarity talks, the Meet the UTMB World Series slots, a yoga and gong bath, a compression talk, a session on trail running and disability, a nightly L'Equipe broadcast and a DJ set. Free, though a few sessions such as the Sidas foot study take booking.

**Amazfit — Amazfit Hub**
24–30 Aug · Amazfit Hub · Chamonix · 45.920026, 6.871694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/amazfit-hub) · research lead / unverified
> The Amazfit Hub is the brand's base in Chamonix for UTMB Mont-Blanc week, open to the public with free activities that bring together the trail running community, athletes and outdoor enthusiasts. The week runs from morning core and mobility sessions to a live podcast conversation with Ben Dhiman and Rod Farvard, the mileSTONES social run and a night cheering point on Friday. Each activity is free and separately ticketed.

**Dans la Tête d'un Coureur — DLTDC House**
24–31 Aug · DLTDC House, Place du Triangle de l'Amitié · Chamonix-Mont-Blanc · 45.923405, 6.86879
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/dltdc-house) · research lead / unverified
> DLTDC House is a temporary gathering and creation space in central Chamonix from 24 to 31 August. Its week-long programme includes public podcast recordings, conversations with athletes, artists, creators and adventurers, plus workshops focused on nutrition, care, recovery and movement. Yoga sessions, culinary experiences and festive gatherings are also planned. Recordings and other content produced at the house will later appear across Dans la Tête d'un Coureur's podcasts, social channels and media platforms.

**The North Face — The North Face at UTMB Mont-Blanc**
24–30 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/the-north-face-at-utmb-mont-blanc) · research lead / unverified
> Through the last week of August in Chamonix, The North Face is on the ground all week, based at its store on Avenue Michel Croz. The programme covers trail running expeditions, athlete talks, film screenings, footwear test events, in-store customisation and DJ sets. Some sessions are bookable in advance and the rest are drop-in.

**Asics — ASICS Trail Camp**
24–27 Aug · L'Index · Chamonix-Mont-Blanc · 45.93145, 6.878013
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/asics-trail-camp) · research lead / unverified
> ASICS runs a four-day trail camp at L'Index above Chamonix, open 10:00 to 19:00 daily from 24 to 27 August. The days carry group runs, product testing, athlete meet-ups and animations through UTMB week. Free, with no registration for the camp itself.

**La Sportiva — La Sportiva Test & Feel**
24–28 Aug · La Sportiva booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-sportiva-test-feel) · research lead / unverified
> Test and Feel puts the Prodigio family of trail shoes out to try at the La Sportiva booth. The brand's Instagram carousel gives it as a daily fixture across 24 to 28 August rather than a single session, so the hours shown here cover the run of days rather than one appointment.

**Altra running — Altra Chalet**
24–28 Aug · Altra Chalet, Ultra-Trail Village · Chamonix · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/altra-chalet) · research lead / unverified
> The Altra Chalet at the Ultra-Trail Village is Altra's base for UTMB Mont-Blanc week. Foot health expert James Wauchope leads foot health workshops there, demo shoes are available to take out on a test run and the team hands out community t-shirts and giveaways. Altra has also set two official Strava segments for the week, Climb to Chalet La Floria and Balcon Sud. The brand keeps a hub at Discopic Bar in the evenings and a branded space at the PlanB Hotel.

**SATISFY — SATISFY Off-Road Supply & Fuel Station Chamonix**
24–29 Aug · SATISFY Off-Road Supply & Fuel Station · Chamonix · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-fuel-station-chamonix) · research lead / unverified
> SATISFY's high-altitude outpost returns for UTMB week with new and limited-edition trail gear, terrain-tested staples and a Fuel Station for pre-run top-ups or post-effort refuelling. Visitors can meet SATISFY Pro Athletes and take part in community runs departing from the chalet each morning. The pop-up runs through August 29, with opening-day hours from 10 AM to 6 PM.

**Sidas — Sidas at the Ultra-Trail Village**
24–26 Aug · Sidas stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/sidas-at-the-ultra-trail-village) · research lead / unverified
> Sidas runs two group runs out of its stand in the Ultra-Trail Village. The first is an afterwork run with the What's Life Project on the Monday evening and the second is a community run on the Wednesday morning.

**Arc'teryx, Distance, Strava — Arc'teryx × Distance Aid Station**
25–30 Aug · Arc'teryx Chamonix store · Chamonix · 45.920886, 6.867501
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/arcteryx-distance-aid-station) · research lead / unverified
> From 24 to 30 August, the store transforms into a trail-community aid station where visitors can tackle Strava Challenges, collect limited-edition rewards and explore the exclusive collection. The week also features a screening of Unplugged, an athlete Q&A, a customisation workshop and gatherings with athletes, filmmakers and creatives, plus drinks and snacks. A free printed journal of project photography and stories is available in-store, while the nearby Echoes display at Place de l'Aiguille du Midi explores trail running through images. Entry and activities are free and open to racers, supporters and passers-by, with advance RSVP required for the film screening and athlete panel.

*Note: the listing's own dates (25–30 Aug) and its description (24–30 Aug) disagree.*

**Maurten — Maurten at UTMB Mont-Blanc**
25–28 Aug · Maurten, Chemin de la Corbette · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-at-utmb-mont-blanc) · research lead / unverified
> Maurten holds a four-day run of talks at its Chamonix space on Chemin de la Corbette, from 25 to 28 August. The Facing Limitations sessions put athletes on stage to talk about where their limits sat and what moved them, and the Fuelling sessions put Maurten's own nutritionists there instead. Every session takes questions from the room and runs about an hour. Each talk is free and booked separately.

---

# Other — 17 leads

**Rossignol — Rossignol at UTMB Mont-Blanc**
20–26 Aug *(starts before race week)* · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rossignol-at-utmb-mont-blanc) · research lead / unverified
> Rossignol puts the Vezor, Venosk and new Vercors trail shoes out to test across race week, from two places in Chamonix. A sunset run partnered by Petzl leaves the Rossignol store on Avenue Michel Croz on 20 August. A community run partnered by Püls and Shokz then runs on three evenings from 24 to 26 August out of the Rossignol stand in the Ultra-Trail Village. Each is booked separately.

**NNormal — NNormal at UTMB Mont-Blanc**
24–28 Aug · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-at-utmb-mont-blanc) · research lead / unverified
> NNormal has no single space in Chamonix and runs its race week across several venues around the town. The Women's Cadí shoe test and talks is at La Guinguette on the Monday afternoon. The test run with Julbo and Lucille Germain is at ARCUS Coffee on the Tuesday morning. Films and Conversations screens at the MBC microbrewery that afternoon, and the Trail Keepers premiere and roundtable is at the MBC on the Thursday. A gear test with an apéro runs on the Wednesday evening and a gear test with breakfast leaves ARCUS Coffee on the Friday morning. Every session is booked separately.

**Running Club Catalans, New Balance — Running Club Catalans in Chamonix**
25–29 Aug · Chalet RCC (town-level pin) · Chamonix · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/running-club-catalans-in-chamonix) · research lead / unverified
> Running Club Catalans bases itself at Chalet RCC in Chamonix for UTMB week, from Tuesday 25 to Saturday 29 August, alongside New Balance. The week takes in club runs from the chalet, cheer points on the ETC, CCC and UTMB courses, a barbecue and a pétanque tournament. On CCC day, Friday 28 August, the club follows the course to cheer New Balance athletes Davide Cheraz and Candice Fertin.

**Rabbit — Carbs and Coffee at the rabbit Clubhouse**
25 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/carbs-and-coffee-at-the-rabbit-clubhouse) · research lead / unverified
> The free morning session serves coffee from the rabbit coffee cart and artisan pastries from an award-winning local pastry chef recognised as the best in Haute-Savoie. Pastries are available while supplies last.

**Amazfit — Core Activity**
25 Aug · Amazfit Hub · Chamonix · 45.920026, 6.871694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/core-activity) · research lead / unverified
> A morning session at the Amazfit Hub built around targeted core activation rather than extra physical load. Low-impact stability drills wake up the neuromuscular system and prime the body for movement without adding fatigue. The session is free and needs its own ticket.

**The North Face — Train Like a Pro, Tuesday 25 August**
25 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/train-like-a-pro-tuesday-25-august) · research lead / unverified
> Three coached trail sessions cover trail-specific strength, uphill and downhill running technique and balancing easy running with higher-intensity training. Trail footwear is available to test during the sessions. The programme runs from 9:30am to 5:30pm with breaks between sessions, and advance registration is available.

**The North Face — Orienteering Workshop**
25 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/orienteering-workshop) · research lead / unverified
> Guide Claire Janigo covers map reading, compass use and route planning before leading a hands-on orienteering session in Bois du Bouchet. Participants navigate with traditional tools and the OpenRunner app during the two-hour workshop.

**Naak — Naak at UTMB Mont-Blanc**
25–28 Aug · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/naak-at-utmb-mont-blanc) · research lead / unverified
> Naak runs two race-week events in different parts of Chamonix. Ultra Night is an invitation-only evening at its chalet camp on Rue la Mollard on 25 August, with its international athletes a few days out from their races. The Triple Espresso Run is a free coffee shakeout on race morning, 28 August, from the Fan Experience in the Ultra-Trail Village, put on with Suunto and BUFF.

**The North Face — Train Like a Pro, Wednesday 26 August**
26 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/train-like-a-pro-wednesday-26-august) · research lead / unverified
> This coached trail programme combines trail-specific strength training with uphill and downhill running technique. A final session focuses on balancing easy running with higher-intensity training, and trail footwear is available to test. The three sessions run between 9:30am and 4pm with breaks in the programme.

**The North Face — Nutrition Workshop**
26 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nutrition-workshop) · research lead / unverified
> Nutritionist Romane Guerot leads a practical, hands-on session on fuelling for trail running. Participants make an energy bar, prepare a homemade sports drink and pick up performance-focused nutrition tips during the hour-long workshop.

**Altra running — HEAL: Altra Movie Première**
26 Aug · Maison des Artistes · Chamonix · 45.921946, 6.871635
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/heal-altra-movie-premiere) · research lead / unverified
> A happy hour reception at Maison des Artistes opens the evening at 7 PM and the screening of HEAL begins at 8:30 PM. The film follows Altra elite athlete Alban Berson, whose ADHD went undiagnosed until later in life. It traces a youth marked by bullying and social exclusion, a difficult period of alcohol and substance abuse and running as the force that carried them toward recovery. Alban Berson attends alongside Matteo Vettorel of STL production, Altra head of marketing Rob Herdman and Claudine Casavecchia of HyperSupers TDAH France. The premiere is a ticketed event.

**Raidlight — Raidlight and Lazarus Lake in Chamonix**
27 Aug · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/raidlight-and-lazarus-lake-in-chamonix) · research lead / unverified
> Raidlight brings Gary Cantrell, the man behind the Barkley Marathons, to Chamonix for a day on 27 August. The two halves happen in different places. A social walk in the woods above town runs in the morning, with the meeting point given to entrants rather than published. The world premiere of the documentary Lazarus Lake: The Hillbilly Scientist then screens three times at Cinéma Vox from the afternoon, with Cantrell taking questions after each one. Both halves are booked separately through Raidlight.

**The North Face — Train Like a Pro, Thursday 27 August**
27 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/train-like-a-pro-thursday-27-august) · research lead / unverified
> The day begins with coached trail-specific strength training. Afternoon sessions cover uphill and downhill running technique, then balancing easy running with higher-intensity training. Trail footwear is available to test, and the programme includes long breaks between its three sessions.

**Running Club Catalans, New Balance — Tournoi de Pétanque**
27 Aug · Boulodrome de Chamonix · Chamonix · 45.928643, 6.877061
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/tournoi-de-petanque) · research lead / unverified
> Running Club Catalans holds a pétanque tournament at the Boulodrome de Chamonix, played over the evening with a prize pool for the winners. It falls midway through the club's UTMB week in the valley.

**The North Face — Train Like a Pro, Friday 28 August**
28 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/train-like-a-pro-friday-28-august) · research lead / unverified
> A pair of coached trail sessions covers trail-specific strength training, followed by uphill and downhill running technique. Trail footwear is available to test during the morning programme, which runs from 9:30am to 1pm with a break between sessions.

**The North Face — Safety Workshop**
28 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/safety-workshop) · research lead / unverified
> Local guide Laurent Langoisseur leads a practical one-hour session on mountain safety, covering weather checks, route planning and how to assess trail difficulty. The workshop also explores emergency-response reflexes for handling problems on the trail.

**The North Face — Train Like a Pro, Saturday 29 August**
29 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/train-like-a-pro-saturday-29-august) · research lead / unverified
> Three coached sessions focus on trail-specific strength, uphill and downhill running technique and balancing easy running with higher-intensity training. Trail footwear is available to test. The sessions are spread from 9:30am to 5:30pm with breaks in the programme.

---

# Group Run — 19 leads

**Columbia — Columbia: Crystal Curious, Hike x Gems**
23 Aug *(starts before race week)* · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-crystal-curious-hike-x-gems) · research lead / unverified
> A full-day 12km hike goes beyond the classic Mer de Glace trails, climbing 610 metres through the mineral landscape above Chamonix. Crystal hunter Paul Besson leads it and explains how Alpine gems form, how they are found and what ties crystal hunters to the Mont Blanc massif. Mountaineering boots, crampons, poles, a helmet and a harness are required, with rental gear arranged for anyone who needs it. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**Columbia — Columbia: Fuel the Machine, Hike x Nutrition**
24 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-fuel-the-machine-hike-x-nutrition) · research lead / unverified
> The morning opens with a hands-on workshop making simple trail snacks and covering the basics of sports nutrition. A guided 9km hike around Chamonix follows, climbing up to 750 metres, so the advice gets tested on the trail. Columbia footwear and apparel are available to try along the way. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**SATISFY — SATISFY Off-Road Supply Chamonix Run #1**
24 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-chamonix-run-1) · research lead / unverified
> This 7.1km morning loop climbs 405 metres through Chamonix's south balconies, with Mont Blanc in view along the way. Runners meet at 8:30am for an 8:45am start and should have trail experience and feel comfortable spending more than an hour on challenging terrain. Bag drop is available, followed by seasonal food and drinks from the Fuel Station after the run. Advance sign-up is mandatory and places are limited.

**Goldwin, Product Index — Goldwin Voxeloft Field Test: Hike**
24 Aug · Japonyard · Chamonix-Mont-Blanc · 45.915659, 6.863038
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/goldwin-voxeloft-field-test-hike) · research lead / unverified
> A guided field-test hike putting Goldwin's Voxeloft insulation through real alpine conditions, with the session data and the wearers' notes captured through the Product Index platform. Invitation only. The caption gives the day but no start time, distance or kit list, so the hours shown here are a placeholder rather than the real ones.

**SATISFY — SATISFY Off-Road Supply Chamonix Run #2**
25 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-chamonix-run-2) · research lead / unverified
> This 11.7km trail run leaves the valley for a more exposed balcony route, gaining 520 metres over roughly two hours and 15 minutes. The group meets at 7:45am for an 8am start, with bag drop available before departure and seasonal food and drinks served afterward at the Fuel Station. It is suited to runners with trail experience who are comfortable spending more than an hour on challenging terrain. Advance sign-up is required and places are limited.

**Columbia — Columbia: Get Flexy, Hike x Yoga**
25 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-get-flexy-hike-x-yoga) · research lead / unverified
> A 9km hike leaves central Chamonix for a valley buvette, climbing up to 650 metres with views across the Drus and the Mont Blanc massif. Back down, the group finishes with an outdoor yoga session for mobility and tension release, mats provided. Columbia footwear and apparel are available to try. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**Goldwin, Product Index — Goldwin Voxeloft Field Test: Run**
25 Aug · Japonyard · Chamonix-Mont-Blanc · 45.915659, 6.863038
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/goldwin-voxeloft-field-test-run) · research lead / unverified
> The running half of the Voxeloft field test, taking the insulation into alpine conditions with the session data captured through the Product Index platform. Invitation only. The caption gives the day but no start time or route, so the hours shown here are a placeholder rather than the real ones.

**SATISFY — SATISFY Off-Road Supply Chamonix Run #3**
26 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-chamonix-run-3) · research lead / unverified
> This 12.5 km sunrise trail run climbs 730 metres to the Christ-Roi statue as the Chamonix valley opens below. Runners meet at 7:30 AM for a 7:45 AM start and should allow around two and a half hours. The challenging route is suited to runners with trail experience who are comfortable running for more than two hours. Bag drop is available. Seasonal food and drinks follow at the SATISFY Fuel Station. Advance sign-up is required due to limited capacity.

**Columbia — Columbia: Recovery Lab, Hike x Recovery**
26 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-recovery-lab-hike-x-recovery) · research lead / unverified
> An 8km mountain hike climbs up to 650 metres before the group turns to recovery work. Cold-water immersion in a mountain river is optional and is followed by stretching and a workshop on self-massage and recovery habits, with mats provided. Columbia footwear and apparel are available to try. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**Enduraw — Enduraw KOM Challenge**
26 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-kom-challenge) · research lead / unverified
> A two-hour group trail run brings runners together for a social outing in the Chamonix mountains. Coffee is served back at the finish.

**Norrøna, Naak — Social Recovery Run with NAAK Run IX**
26 Aug · Norrøna Partner Store Chamonix · Chamonix · 45.920683, 6.867128
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/social-recovery-run-with-naak-run-ix) · research lead / unverified
> This social recovery run offers an easygoing group outing during race week. The source provides no distance, pace groups, route, timing or attendee logistics.

**Columbia — Columbia: Get Lost, Hike x Orientation**
27 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-get-lost-hike-x-orientation) · research lead / unverified
> The session starts by plotting a route on a topographic map, reading contour lines and estimating distance and climb. The group compares that plan against the Whympr app, then hikes 9km into the mountains with up to 650 metres of climbing. Beginners and experienced hikers are both welcome. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**Merrell — Merrell: Run All In All Down**
27 Aug · Tremplin du Grépon (Chamonix Ski Jump) · Chamonix-Mont-Blanc · 45.9171, 6.8724
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/merrell-run-all-in-all-down) · research lead / unverified
> A three-hour evening challenge puts runners and Merrell's latest trail shoe to the test on repeats around the Chamonix ski jump. An after party follows the running. Free and open to anyone, including people coming only for the atmosphere.

**Big Mountain, SportsShoes — CHAM-O Orienteering Challenge**
27 Aug · Big Mountain Basecamp · Chamonix-Mont-Blanc · 45.918117, 6.863856
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/cham-o-orienteering-challenge) · research lead / unverified
> This 3.5-hour orienteering challenge sends participants around central Chamonix to find six checkpoints and collect HOKENS for a chance to win prizes. The focus is on exploring the town, sharing the experience and having fun rather than racing. HOKA test shoes and Silva headtorches are available on a first-come, first-served basis, with bag storage provided.

**SATISFY — SATISFY Off-Road Supply Chamonix Run #4**
27 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-chamonix-run-4) · research lead / unverified
> This demanding 12–14K trail run climbs 800–900 metres toward the snowline, turning back when ice appears underfoot. Designed for runners with trail experience who are comfortable on challenging terrain for more than two hours, it meets at 7:15am for a 7:30am start and lasts around two hours 45 minutes. Bag drop is available, followed by seasonal food and drinks from the SATISFY Fuel Station. Advance sign-up is required and places are limited.

**SATISFY — SATISFY Off-Road Supply Chamonix Run #5**
28 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-off-road-supply-chamonix-run-5) · research lead / unverified
> This steep 11.3 km trail run climbs 1,000 metres over roughly two hours and 45 minutes, with poles in use and sustained effort on challenging terrain. Runners meet at 7:15 AM for a 7:30 AM start, then return for seasonal food and drinks from the SATISFY Fuel Station. Bag drop is available. The run is intended for experienced trail runners comfortable running for more than two hours. Advance sign-up is mandatory due to limited capacity.

**Columbia — Columbia: Sunset Stories, Hike x Sunset Podcast**
28 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-sunset-stories-hike-x-sunset-podcast) · research lead / unverified
> An 11km afternoon hike climbs 970 metres to a panoramic viewpoint for sunset over the Chamonix peaks. Near the top the group listens to Vadim Druelle's podcast about his Annapurna expedition, then the alpinist takes questions as the light goes. Hiking shoes, poles and a headlamp are required for the descent. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

**SATISFY — SATISFY Chamonix LSD Trail Edition**
29 Aug · SATISFY Off-Road Supply · Chamonix-Mont-Blanc · 45.917495, 6.852005
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/satisfy-chamonix-lsd-trail-edition) · research lead / unverified
> This three-hour trail run follows a 13.7 km route through Chamonix with 286 metres of climbing at a long, slow pace. The outing is designed for runners with trail experience who are comfortable on challenging terrain for more than two hours. Meet-up is at 7 AM for a 7:15 AM start, with bag drop available. Seasonal food and drinks follow at the Fuel Station. Advance sign-up is required due to limited capacity.

**Columbia — Columbia: Race Insider, Hike x Race Follow**
29 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-race-insider-hike-x-race-follow) · research lead / unverified
> The day starts with a sign-making session at the chalet, then the group hikes out onto the course to meet the race leaders and cheer runners through several points. The 13km route gains 430 metres and is paced for cheering rather than covering ground. Columbia footwear and apparel are available to try. Free and registration required, with the exact meeting point shared by WhatsApp beforehand.

---

# Recovery — 5 leads

**Columbia — Columbia: Escape the Crowd, Reset x Community**
26 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-escape-the-crowd-reset-x-community) · research lead / unverified
> A calm hour in the chalet and its garden, away from the race-week crowds, with coffee, tea, infusions and homemade seasonal cakes. Guests can customise Columbia clothing with exclusive transfers, write postcards or read. There is no route and no stopwatch, and the session is open to anyone. Free, registration required.

**Icebreaker — Icebreaker Chamonix Yoga**
26 Aug · Icebreaker, Rue Joseph Vallot · Chamonix-Mont-Blanc · 45.92494, 6.86956
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/icebreaker-chamonix-yoga) · research lead / unverified
> Andréa leads an hour of athletic yoga pitched at every level. The group meets at the Icebreaker shop on Rue Joseph Vallot and, weather allowing, walks out to the Champ du Savoy to practise outdoors. Bring a mat. Part of each fee goes to the Eco-Tri Velo association.

**The North Face — Warm Up Session with Fernanda Maciel**
27 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/warm-up-session-with-fernanda-maciel) · research lead / unverified
> The North Face trail athlete Fernanda Maciel leads an hour of morning mobility, movement and stretching. The session is designed to prepare the body for time on the trails and is available for advance registration.

**Amazfit — Mobility Activity**
27 Aug · Amazfit Hub · Chamonix · 45.920026, 6.871694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/mobility-activity) · research lead / unverified
> A morning mobility routine at the Amazfit Hub built around active recovery and restoring fluid movement. It works on joint tightness and flexibility, getting the body ready to perform without piling on fatigue. The session is free and needs its own ticket.

**Columbia — Columbia: Breathe In, Reset x Mindfulness**
27 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-breathe-in-reset-x-mindfulness) · research lead / unverified
> An afternoon reset away from the race-week noise, built on guided breathing, outdoor meditation, nature observation and a little introspective writing. Participants write a letter to their future selves that the team keeps and sends back a year later. Every experience level is welcome, from runners to supporters. Free and registration required, with the session running outdoors when the weather allows.

---

# Talk / Panel — 25 leads

**La Marzocco, i-Run — La Marzocco Home Barista Workshops**
22–30 Aug *(starts before race week)* · Home of Mountains chalet · Chamonix-Mont-Blanc · 45.92307, 6.869984
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-marzocco-home-barista-workshops) · research lead / unverified
> A hands-on home barista workshop runs every morning at 11:00 inside the Home of Mountains chalet, from 22 to 30 August. Each session is capped at fifteen places and is bookable in advance only, with the booking route given on the brands' Instagram rather than a published link. The chalet's address has not been published, so the map pin sits on Chamonix centre.

**HOKA — HOKA OTOTW Radio from the Flylab**
24–30 Aug · HOKA Flylab (town-level pin) · Chamonix-Mont-Blanc · 45.92307, 6.869984
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/hoka-ototw-radio-from-the-flylab) · research lead / unverified
> HOKA broadcasts a live radio show from its Flylab in Chamonix, so the week can be followed from anywhere. It goes on air at 09:00 on the Monday. The schedule for the rest of the week is not published, and neither is the Flylab's address, so the map pin sits on Chamonix centre.

**La Sportiva — La Sportiva Espresso with the Athletes**
24–28 Aug · La Sportiva booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-sportiva-espresso-with-the-athletes) · research lead / unverified
> Coffee with the La Sportiva athletes at the brand's booth in the Ultra-Trail Village. The brand's Instagram carousel gives it as a daily fixture across 24 to 28 August rather than a single session, so the hours shown here cover the run of days rather than one appointment.

**Maurten — Maurten: A Chat with Molly Seidel**
25 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-a-chat-with-molly-seidel) · research lead / unverified
> Olympic bronze medallist Molly Seidel talks about moving from road marathons to trail ultras, taking in her 100K debut at Black Canyon and her build for OCC. The hour also covers fuelling for trail and ultra distances, then opens to questions from the room. Doors open at 09:40 for a 10:00 start. Free, registration required, all ages welcome and capacity is limited.

**Outdoor Sports Valley — OSV Talk: Climate Change is Reshaping Outdoor**
25 Aug · Business Center, Place du Mont-Blanc · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/osv-talk-climate-change-is-reshaping-outdoor) · research lead / unverified
> Outdoor Sports Valley hosts an industry session on how climate change is reshaping the outdoor sector and what adapting to it looks like in practice. It runs at the Business Center on Place du Mont-Blanc, in the middle of race week. Industry audience.

**NNormal — NNormal Films and Conversations**
25 Aug · MBC Chamonix Microbrewery · Chamonix-Mont-Blanc · 45.927401, 6.875829
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-films-and-conversations) · research lead / unverified
> Three films explore creativity, resilience and purpose through trail running: Creativity Is a Muscle, Kilian Jornet's latest film project, The Nomad from Elhousine Elazzaoui and Not Just Running from Joyce Njeru. Each screening is followed by a short conversation with members of the NNormal team behind the films, before the two-hour program wraps up with an apéro. Places are limited and the event is currently operating a waitlist.

**Maurten — Maurten: A Chat with Petter Engdahl**
25 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-a-chat-with-petter-engdahl) · research lead / unverified
> CCC champion Petter Engdahl sits down for an hour on preparing for this year's OCC, building an ultra fuelling plan and rediscovering the joy of running after injury. He draws on a decade of racing, from trail podiums to a 2:23:37 at the 2026 Boston Marathon. Questions from the room follow, and doors open at 15:40. Free, registration required, all ages welcome and capacity is limited.

**SunGod, SportsShoes — SunGod Live Podcast with Tom Evans and Hayden Hawks**
25 Aug · Vert Lodge – Rooms & Dorms, Chamonix · Chamonix-Mont-Blanc · 45.915884, 6.849506
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/sungod-live-podcast-with-tom-evans-and-hayden-hawks) · research lead / unverified
> Ben Mounsey and Gary House host a live RunCensored podcast with 2025 UTMB champion Tom Evans and 2024 CCC champion Hayden Hawks. The two-hour conversation covers trail running stories and insights during UTMB week. Admission is free and advance booking is required due to limited capacity.

**Maurten — Maurten: Fuelling with Ainhoa Prieto**
26 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-fuelling-with-ainhoa-prieto) · research lead / unverified
> Maurten nutritionist Ainhoa Prieto leads a practical hour on fuelling for trail and ultra running. It covers Hydrogel technology, carbohydrate needs by duration and intensity, gut training, flavour fatigue and race-day logistics where support is thin, plus how to combine Maurten products across distances. Questions from the room follow. Doors open at 09:40, free and registration required, all ages welcome with limited capacity.

**Amazfit — Breakfast & Ben Dhiman & Rod Farvard Live Podcast**
26 Aug · Amazfit Hub · Chamonix · 45.920026, 6.871694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/breakfast-ben-dhiman-rod-farvard-live-podcast) · research lead / unverified
> A relaxed morning gathering that brings runners, creators and media closer to the Amazfit trail running team. It opens with an informal breakfast for networking, athlete conversation and product discovery, then moves into a live podcast session with Ben Dhiman and Rod Farvard. The session is free and needs its own ticket.

**Columbia — Columbia: Frame of Mind, Reset x Outdoor Photography**
26 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-frame-of-mind-reset-x-outdoor-photography) · research lead / unverified
> An outdoor photography session where small teams work through a quiz, photo challenges and creative missions around the chalet. The images are then edited down into one shared story. It runs about two and a quarter hours and suits any level of camera or phone. Free, registration required.

**Enduraw — Enduraw: Performance and Data Conference**
26 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-performance-and-data-conference) · research lead / unverified
> The afternoon opens at 15:30 and runs three hour-long talks, on performance testing, on nutrition from 10K to ultra-trail and on reading the training data a sports watch produces. Sessions are drop-in and the last one finishes at 19:00. A cocktail follows. Registration required.

**Maurten — Maurten: Facing Limitations as Female Athletes**
26 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-facing-limitations-as-female-athletes) · research lead / unverified
> Nutritionist Ainhoa Prieto leads a conversation with trail runners Sophia Laukli, Clémentine Geoffray and Sylvie Geissler, alongside record-setting ultrarunner and triathlete Amy Palmiero-Winters. The panel takes on carbohydrate fear, body image, menstrual cycles, race-day fuelling and what training and performing actually look like for a female endurance athlete. Questions from the room follow. Doors open at 15:40, free and registration required, all ages welcome with limited capacity.

**Coros, Enduraw — COROS Vertical Lab**
26 Aug · Le Prieuré · Chamonix · 45.920577, 6.865859
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/coros-vertical-lab) · research lead / unverified
> COROS opens its Vertical Lab at Le Prieuré for an afternoon on race-day strategy. The session runs through a course breakdown with Enduraw, the performance-data analysts who model how terrain and conditions shape pacing, then a meet and greet with athletes and help with watch setup and customization. Cocktails on the terrace follow. The session is open to everyone.

**(no brand given) — UTMB: More Than a Race**
26 Aug · Hôtel Lyret · Chamonix-Mont-Blanc · 45.92177, 6.869454
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/utmb-more-than-a-race) · research lead / unverified
> An open community discussion explores the human stories and motivations behind endurance events such as UTMB. Rafael Hidalgo, Stephen Cousins and Jeremiah Maestre discuss challenge, adventure, belonging and meaning, with Catherine Poletti joining for the opening conversation from 18:15 to 18:40. Advance registration is required.

**Rabbit, Tailwind, Halo — Meet the Founders with Tailwind, Halo and rabbit**
27 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/meet-the-founders-with-tailwind-halo-and-rabbit) · research lead / unverified
> Tailwind co-founders Jenny and Jeff Vierling and Halo founder Hilary Fenet sit down with rabbit co-founder Monica for an open, hour-long conversation on entrepreneurship, innovation and building communities around sport. The session is free, and attendees can enter to win a HydraPak Fuel Kit.

**Maurten — Maurten: A Chat with Tom Evans**
27 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-a-chat-with-tom-evans) · research lead / unverified
> Ultrarunner Tom Evans breaks down the fuelling strategy behind his 2025 UTMB win and how he handles the physical and mental load of racing ultras. The hour also looks ahead to his coming season, then opens to questions from the room. Doors open at 10:10. Free, registration required, all ages welcome and capacity is limited.

**Raidlight — Lazarus Lake: The Hillbilly Scientist (World Premiere)**
27 Aug · Cinéma Vox · Chamonix-Mont-Blanc · 45.923157, 6.868953
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/lazarus-lake-the-hillbilly-scientist-world-premiere) · research lead / unverified
> The only official documentary on Gary Cantrell, the man who made the Barkley Marathons and Big's Backyard Ultra, filmed over more than a year by Paul Mellor and Luke Jarmey. Cinéma Vox screens it three times on 27 August, at 14:00, 16:00 and 19:00. Cantrell takes questions after each screening. The 16:00 one is sold out. Tickets are announced on Raidlight's documentary page, which at the time of writing links only to its social walks, so check there for the cinema booking.

**Rabbit — Wine and Cheese with Raziq Rauf**
27 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/wine-and-cheese-with-raziq-rauf) · research lead / unverified
> Author Raziq Rauf leads an hour-long workshop exploring how running and movement can fuel the creative process. Artisan cheese and charcuterie, seasonal crudités and alcoholic and non-alcoholic drinks are served, with each attendee receiving a copy of This Is Running and a rabbit Clubhouse Journal. Admission is free, though the session is currently waitlist only.

**NNormal — Trail Keepers Film Premiere and Roundtable**
27 Aug · MBC Chamonix Microbrewery · Chamonix-Mont-Blanc · 45.927401, 6.875829
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/trail-keepers-film-premiere-and-roundtable) · research lead / unverified
> This two-hour screening premieres a documentary exploring the bonds between people, mountains and the trails connecting them. A roundtable with several of the film's protagonists follows, with drinks and light food served. The programme runs from 3 to 5pm and places are limited, with a waitlist in operation.

**Maurten — Maurten: Fuelling with Lucie Meyer**
27 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-fuelling-with-lucie-meyer) · research lead / unverified
> Nutritionist Lucie Meyer leads a practical hour in French on fuelling for trail and ultra running. It covers Hydrogel technology, carbohydrate needs by duration and intensity, strategies by race distance, gut training, flavour fatigue and what to do when support is thin. Questions from the room follow. Doors open at 15:40, free and registration required, all ages welcome with limited capacity.

**Norrøna — Norrøna: Recovery Talk with Arnaud Tortel**
27 Aug · Norrøna Pro Store Chamonix (town-level pin) · Chamonix · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/norrna-recovery-talk-with-arnaud-tortel) · research lead / unverified
> Arnaud Tortel leads a discussion focused on recovery, offering a conversation-led break from the week's running events.

**Ultra Sports Science — Women, Health and Ultra-Endurance Congress**
27 Aug · Hall du Majestic, Centre des Congrès · Chamonix-Mont-Blanc · 45.922188, 6.866309
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/women-health-and-ultra-endurance-congress) · research lead / unverified
> A free morning congress on women's health in ultra-endurance, run by the Ultra Sports Science foundation. Sessions cover chronic stress, mental workload, anxiety, burnout and body image, then menstrual health, pelvic floor, hormonal impact and gastrointestinal problems with prevention strategies. It is aimed at researchers, clinicians, coaches, institutions and media. Anyone can attend, and the talks are in English or bilingual with simultaneous French translation.

**Maurten — Maurten: A Chat with Tove Alexandersson**
28 Aug · Maurten · Chamonix-Mont-Blanc · 45.920177, 6.86023
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/maurten-a-chat-with-tove-alexandersson) · research lead / unverified
> World champion Tove Alexandersson talks about trail and ultrarunning performance, including how she fuelled her OCC and how she worked around an ankle injury. The hour draws on a record-breaking season at Zegama and the Marathon du Mont-Blanc, where she became the first woman under four hours. Questions from the room follow, and doors open twenty minutes before. Free, registration required, all ages welcome and capacity is limited.

**Columbia — Columbia: Fish and Fraude, Reset x Community Debate**
28 Aug · Columbia chalet · Chamonix-Mont-Blanc · 45.91206, 6.856352
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/columbia-fish-and-fraude-reset-x-community-debate) · research lead / unverified
> Placide hosts a participatory debate weighing the fishing talents of trail athletes, creators and personalities, built on dubious anecdotes and cheerful exaggeration. The audience votes at the end on who the real anglers are and who the frauds are. No knowledge of trail running or fishing is needed. Free, registration required.

---

# Shakeout Run — 44 leads

**Snell Sports, Salomon — Snell Sports Run Test with Salomon**
18 Aug *(starts before race week)* · Snell Sports · Chamonix-Mont-Blanc · 45.922259, 6.868341
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/snell-sports-run-test-with-salomon) · research lead / unverified
> A trail shoe test run at Snell Sports lets participants try Salomon's new summer models. Salomon representatives will present the shoes and answer questions.

**Snell Sports, Salomon, HOKA — Snell Sports Run Tests**
18–19 Aug *(starts before race week)* · Snell Sports, Rue du Docteur Paccard · Chamonix-Mont-Blanc · 45.922259, 6.868341
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/snell-sports-run-tests) · research lead / unverified
> Snell Sports runs two evening trail shoe tests from the shop on Rue du Docteur Paccard, Salomon on the Tuesday and HOKA on the Wednesday. Both fall in the week ahead of race week rather than during it. Each evening is booked separately.

**Snell Sports, HOKA — Snell Sports Run Test with HOKA**
19 Aug *(starts before race week)* · Snell Sports · Chamonix-Mont-Blanc · 45.922259, 6.868341
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/snell-sports-run-test-with-hoka) · research lead / unverified
> A 7 km trail run from Snell Sports offers runners the chance to test Hoka's latest carbon-plated model and the Speedgoat 7. The run finishes with cold drinks at the shop. Dogs are welcome.

**Hastko — Hastko Run Test**
20 Aug *(starts before race week)* · Big Mountain Basecamp · Chamonix-Mont-Blanc · 45.918117, 6.863856
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/hastko-run-test) · research lead / unverified
> An open 10 km maximum test run starts and finishes at BIG MOUNTAIN Base Camp. Participants can try HASTKO products during the run. Pizza and beer follow from 19:00, with a HASTKO sports bra prize drawn after the run.

**Rossignol, Petzl — Rossignol x Petzl Trail Running Test**
20 Aug *(starts before race week)* · Rossignol Store Chamonix · Chamonix-Mont-Blanc · 45.923434, 6.871171
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rossignol-x-petzl-trail-running-test) · research lead / unverified
> Rossignol puts the Vezor, Venosk and new Vercors out to test on a sunset run, with Petzl as partner for the evening of 20 August. @benjyrun leads one of his favourite local routes, then the group heads back to the shop for a drink. Open to runners aged 15 and over, and the listing gives it as one hour. Two times are published and they disagree: the ticket lists 18:30 at the Rossignol store, while the organiser's text says meet at 19:30 at Hôtel Le Lykke for a 20:00 start, in copy shared with three later dates. The ticket page is worth a check before setting off.

**NNormal, Moonvalley — NNormal Women's Cadí Shoe Test and Talks**
24 Aug · La Guinguette · Chamonix-Mont-Blanc · 45.929226, 6.877284
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-womens-cadi-shoe-test-and-talks) · research lead / unverified
> This two-hour, women-only session starts with a group run to test the new Cadí shoe, with Moonvalley nutrition available along the way. Apparel designer Lucie shares the thinking behind women-specific gear, including NNormal's trail crop top, before an open Q&A with Emelie Forsberg, Joyce Njeru and Lucille Germain on product, resilience, community and a lifelong relationship with the mountains. Places are limited.

**Enduraw — Enduraw Community Run (Monday)**
24 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-community-run-monday) · research lead / unverified
> A two-hour group trail run from the Enduraw Performance Center in Argentière, with coffee at the finish. It is the Monday running of a series that repeats on the Tuesday and the Thursday. Free, registration required.

**VAGA — VAGA Shakeout Run**
24–30 Aug *(date never published — spans race week)* · Statue de Saussure et Balmat · Chamonix-Mont-Blanc · 45.92307, 6.869984
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/vaga-shakeout-run) · research lead / unverified
> A steady 7km shakeout on the Chamonix trails, meeting at the Saussure and Balmat statue, run at a pace made for company rather than competition. Every runner gets a hat. VAGA has not published the date or the time, so this entry spans race week and the map pin sits on Chamonix centre.

**Asics, Runpack — Runpack x ASICS Trail Camp Opening Run**
24 Aug · L'Index, ASICS Trail Camp · Chamonix-Mont-Blanc · 45.93145, 6.878013
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/runpack-x-asics-trail-camp-opening-run) · research lead / unverified
> Runpack opens UTMB week with a group run on the trails above Chamonix, testing the newest ASICS trail models. It sets off from the ASICS Trail Camp at L'Index. Registration required, by direct message on Instagram.

**Sidas, What's Life Project — What's Life Project x Sidas Community Run**
24 Aug · Sidas stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/whats-life-project-x-sidas-community-run) · research lead / unverified
> A 4 to 5 km community run with the What's Life Project team starts from the Sidas stand in the UTMB exhibitor village. Meet at 5pm for a 5:15pm departure. The one-hour event includes a conversation about the association's projects and a pack of Sidas and What's Life Project products. Registration is limited to 30 participants.

**Rossignol, Püls, Shokz — Rossignol Community Run with Püls and Shokz**
24–26 Aug · Rossignol stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rossignol-community-run-with-puls-and-shokz) · research lead / unverified
> Rossignol runs this on three evenings, Monday to Wednesday of race week, meeting at its stand at 17:00 each time. The Vezor, Venosk and new Vercors are out to test, @benjyrun leads one of his favourite local routes, then the group heads back to the shop for a drink. Püls and Shokz partner the Monday session. Free, and the ticket link carries a date picker for choosing an evening.

**Sums — The Coffee Run with Sums**
25 Aug · Ultra-Trail Village (SUMS stand 83) · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/the-coffee-run-with-sums) · research lead / unverified
> A conversational-pace 6 km trail run follows the river before looping back towards Chamonix in search of the SUMS camper. The 90-minute outing starts at 8am from SUMS stand 83 in the Ultra-Trail Village, followed by coffee and pastries. Participants receive SUMS socks, a limited-edition T-shirt and a tote. Capacity is 50 runners.

**Raide Research — Raide Research Feedback Loop**
25 Aug · Skimium – Sanglard Sports Chamonix · Chamonix-Mont-Blanc · 45.925081, 6.870915
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/raide-research-feedback-loop) · research lead / unverified
> An 8 km trail run leaves Raide Research's showroom at Sanglard Sports and finishes at the offsite Raide Refuge. Breakfast follows at the mountain refuge, alongside a first look at Raide Research's newest RaceTech tee print.

**Rabbit — rabbit 5K Shakeout Walk with Natalia Mastrota**
25 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rabbit-5k-shakeout-walk-with-natalia-mastrota) · research lead / unverified
> A free, hour-long 5K shakeout walk through Chamonix led by local professional trail runner Natalia Mastrota. The group meets in the Hotel Le Faucigny lobby before heading out. Registration is currently waitlist only.

**HOKA — HOKA UTMB Mont-Blanc Shakeout Run**
25 Aug · HOKA Base Camp, La Folie Douce · Chamonix-Mont-Blanc · 45.925429, 6.867371
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/hoka-utmb-mont-blanc-shakeout-run) · research lead / unverified
> The official HOKA shakeout splits into three guided groups, Fly High, Fly Wild and Fly Together, each with its own route, distance and climb around Chamonix. The Tecton X 4, Speedgoat 7 and Mafate 5 are on test, with a passport or ID left as a deposit. Check-in opens at 08:00 and all three groups reunite at La Folie Douce for breakfast afterwards. Free and registration required, with places allocated first come first served.

**Running Club Catalans, New Balance — RCC Social Run**
25 Aug · Chalet RCC (town-level pin) · Chamonix · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rcc-social-run) · research lead / unverified
> An open club run from Chalet RCC, hosted by Running Club Catalans during UTMB week in Chamonix. The group heads to Artic Juice afterwards.

**Enduraw — Enduraw Community Run (Tuesday)**
25 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-community-run-tuesday) · research lead / unverified
> A two-hour group trail run with a relaxed, social focus. The outing wraps up with coffee at the finish.

**NNormal, Julbo — NNormal x Julbo Test Run with Lucille Germain**
25 Aug · ARCUS Coffee, Chamonix · Chamonix-Mont-Blanc · 45.923759, 6.876078
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-x-julbo-test-run-with-lucille-germain) · research lead / unverified
> Runners can borrow NNormal's Cadí, Kjerag 02 or Tomir 02 shoes and Modular Trail Vest, plus Julbo performance sunglasses with REACTIV photochromic lenses. Gear pickup runs from 9 to 10am, leaving time to test everything on the trails at an individual pace before returning for a light breakfast and conversation with Lucille Germain, the NNormal team and fellow runners. An identity card is required as a deposit, and the session wraps up at 11:30am.

**Altra running — Community Run: Run Without Metrics**
25 Aug · Altra Chalet · Chamonix · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/community-run-run-without-metrics) · research lead / unverified
> Professional coaches lead a metrics-free run from the Altra Chalet through the Chamonix valley, with the focus on the landscape rather than pace or distance. Afterwards participants guess how far they covered and the closest estimate wins a free pair of shoes.

**RunMotion Coach — RunMotion Coach Community Run**
25 Aug · RunMotion Coach stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/runmotion-coach-community-run) · research lead / unverified
> An open community run leaving the RunMotion Coach stand in the Ultra-Trail Village at 17:00 on the Tuesday of race week. It is a social outing rather than a session, at a pace anyone can hold. Free, sign-up through the Google form.

**Aosta Run Club, Start Again — Aosta Run Club x Start Again Social Run**
26 Aug · Stade Olympique de Chamonix · Chamonix · 45.926667, 6.874167
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/aosta-run-club-x-start-again-social-run) · research lead / unverified
> A social trail run from Stade Olympique de Chamonix, led by The Magic Runner, an elite runner and Trail Blaze ABC coach. The briefing starts at 8:30 am and the run leaves at 9 am. The group then visits the UTMB Ultra-Trail Village to explore running and trail products for 2027. A limited-capacity shuttle from Aosta costs €40 per person, leaving at 6:15 am with return planned for 6 pm.

**Compressport — Compressport Support Morning Run**
26 Aug · Fan Experience, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/compressport-support-morning-run) · research lead / unverified
> A 30-minute easy run of up to 5km, split into pace groups so every level has one. Ludo Pommeret, Diego Pazos, Aurélien Dunand Palaz, Ariane Wilhem and Theres Leboeuf run with the groups. Breakfast and a pair of Pro Racing Socks v4.0 Trail follow, and the Compressport athlete presentation starts at 10:30. Free, registration required, capacity is limited.

**Mountain King — Mountain King SkyRunner Edge Test Run**
26 Aug · Mountain King booth, Avenue du Mont Blanc · Chamonix-Mont-Blanc · 45.925218, 6.870635
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/mountain-king-skyrunner-edge-test-run) · research lead / unverified
> A two-hour demo of Mountain King's SkyRunner Edge carbon poles, with a fitting and a run to try them on. The poles are RDC carbon, 138 grams each, with the Edge Clip glove system built in. It runs from the Mountain King booth on Avenue du Mont Blanc. Free, registration required.

**Shokz, Julbo, Baouw — Shokz Social Run and Julbo Product Test**
26 Aug · Shokz booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/shokz-social-run-and-julbo-product-test) · research lead / unverified
> A very easy 6 to 8km social run leaving the Shokz booth, with Shokz audio and Julbo eyewear out to test along the way. Everyone gets a welcome pack of Shokz and Baouw products. Afterwards there are snacks at Cool Cats and a draw for two Shokz products and a pair of Julbo sunglasses. Registration required, capped at 30 runners.

**La Sportiva — La Sportiva Morning Run**
26 Aug · La Sportiva booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-sportiva-morning-run) · research lead / unverified
> A 5.7km group trail run with 257 metres of climbing, leaving from the La Sportiva booth in the Ultra-Trail Village. The distance and the climb come from the brand's own Instagram carousel, which does not say whether a place has to be booked.

**Sidas — SIDAS Community Run**
26 Aug · Sidas stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/sidas-community-run) · research lead / unverified
> A short, social shakeout leaves from the SIDAS stand and loops around the Chamonix valley floor, with an hour set aside for the outing. The run is free and open to the public, with no advance registration published.

**Altra running — Women's Community Run**
26 Aug · Altra Chalet · Chamonix · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/womens-community-run) · research lead / unverified
> A women-only shakeout run, an easy 6 km through Chamonix starting from the Altra Chalet at the Ultra-Trail Village. Meet-up is from 2:30 PM and the run starts at 3 PM. The women in trail running panel at Maison des Artistes follows at 4 PM.

**The North Face — Expedition Run**
26 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/expedition-run) · research lead / unverified
> Runners follow a checkpoint-based route, collecting stamps and coordinates to unlock a secret outdoor finish between 5 and 7pm. Free food and drinks await at the destination, followed by an athlete panel and expedition film screening with Steph Case and Josh Wade from 8 to 9pm. An Expedition Party runs until 10:15pm, with a private bus back to town afterwards. Those leaving earlier can return on foot or run back.

**NNormal — NNormal Gear Test and Apéro**
26 Aug · Heliopic Hotel & Spa · Chamonix-Mont-Blanc · 45.917587, 6.870131
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-gear-test-and-apero) · research lead / unverified
> Participants can test NNormal's Cadí, Kjerag 02 and Tomir 02 shoes or the Modular Trail Vest on a self-paced trail run. Gear pick-up runs from 5:30 to 6:30 PM, followed by an apéro, product feedback and relaxed conversation with the NNormal team and fellow runners until 7:30 PM. An identity card is required as a deposit and places are limited.

**Oakley, Meta — Run Test Meta x Oakley (Wednesday)**
26 Aug · Oakley Store · Chamonix-Mont-Blanc · 45.92358, 6.869939
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/run-test-meta-x-oakley-wednesday) · research lead / unverified
> An 8–9 km group run gives participants an exclusive chance to test the new Oakley Meta Vanguard glasses throughout the outing and explore their features in real-world conditions. The session lasts around two hours, with limited capacity and advance registration required.

**Big Mountain — Big Mountain Trail Club Social Run**
26 Aug · Big Mountain Basecamp · Chamonix-Mont-Blanc · 45.918118, 6.863855
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/big-mountain-trail-club-social-run) · research lead / unverified
> An open social run from the Big Mountain Basecamp on Avenue Ravanel le Rouge, with beers and the club raffle afterwards. It runs on the Wednesday of race week and anyone can turn up. Free, no registration.

**Amazfit — Social Run: mileSTONES Chamonix Edition**
26 Aug · Amazfit Hub · Chamonix · 45.920026, 6.871694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/social-run-milestones-chamonix-edition) · research lead / unverified
> The mileSTONES format lands in Chamonix as an alternative to the traditional shakeout run. Runners cover a designated route and control their effort through pacing and navigation rather than raw speed, so the most precise runner takes the win. The run is free and needs its own ticket.

**Oakley, Meta — Run Test Meta x Oakley**
26–27 Aug · Oakley Store, Avenue Michel Croz · Chamonix-Mont-Blanc · 45.92358, 6.869939
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/run-test-meta-x-oakley) · research lead / unverified
> Two evening test runs of the Oakley Meta Vanguard glasses, both leaving from the Oakley store on Avenue Michel Croz and both covering 8 to 9km. They run on the Wednesday and the Thursday of race week and each evening is booked separately.

**Goldwin, Product Index — Tour du Chamonix by Natalia**
27 Aug · Japonyard · Chamonix-Mont-Blanc · 45.915659, 6.863038
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/tour-du-chamonix-by-natalia) · research lead / unverified
> An athlete-led morning run through Chamonix with Natalia, meeting at Japonyard at 08:00 and leaving at 08:15. Open hours at the installation follow from 10:00 to 12:00. RSVP through the Product Index Instagram.

**Rabbit, Run the Alps — 5K Shakeout with Run the Alps**
27 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/5k-shakeout-with-run-the-alps) · research lead / unverified
> An easy 5K shakeout through Chamonix with Run the Alps, starting from the Hotel Le Faucigny lobby and exploring the town's trails. The run is free and registration is currently waitlist only.

**Enduraw — Enduraw Community Run (Thursday)**
27 Aug · Enduraw Performance Center · Argentière · 45.980979, 6.924805
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/enduraw-community-run-thursday) · research lead / unverified
> A two-hour group trail run focused on easygoing company and shared time on the trails. The outing wraps up with coffee back at the performance center.

**Rudy Project — Rudy Project High Protection Social Run**
27 Aug · Rudy Project stand, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rudy-project-high-protection-social-run) · research lead / unverified
> A brand social run leaving the Rudy Project stand in the Ultra-Trail Village at 09:00 on the Thursday of race week. Free, no registration published.

**Raidlight — Social Walk in the Woods of Chamonix with Lazarus Lake**
27 Aug · Raidlight booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/social-walk-in-the-woods-of-chamonix-with-lazarus-lake) · research lead / unverified
> Gary Cantrell, the man behind the Barkley Marathons, walks in the woods above Chamonix on the morning of his film premiere. It leaves from the Raidlight booth at the Ultra-Trail Village at 09:30, covers about 7km with 100 metres of climbing and takes around two hours at a conversational pace. Registration required, through Raidlight.

**The North Face — Skyrunning Expedition**
27 Aug · The North Face Store Chamonix · Chamonix · 45.923622, 6.870246
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/skyrunning-expedition) · research lead / unverified
> Professional guides lead a 2.5-hour, vert-focused loop on the Chamonix Valley's technical trails, with three difficulty levels available. Mountaineering helmets are provided and runners can test The North Face Offtrail Ultra shoes along the way.

**La Sportiva — La Sportiva Sunset Run**
27 Aug · La Sportiva booth, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/la-sportiva-sunset-run) · research lead / unverified
> A 5.2km group trail run with 210 metres of climbing, leaving from the La Sportiva booth in the Ultra-Trail Village at the end of the afternoon. The distance and the climb come from the brand's own Instagram carousel, which does not say whether a place has to be booked.

**Oakley, Meta — Run Test Meta x Oakley (Thursday)**
27 Aug · Oakley Store · Chamonix-Mont-Blanc · 45.92358, 6.869939
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/run-test-meta-x-oakley-thursday) · research lead / unverified
> An 8 to 9 km group run offers runners an exclusive chance to test the new Oakley Meta Vanguard glasses for the full outing and explore their features in real-world conditions. The in-person experience lasts around two hours, with limited places and advance registration required.

**Naak, Suunto, buff.com — Triple Espresso Run (Naak x Suunto x BUFF)**
28 Aug · Fan Experience, Ultra-Trail Village · Chamonix-Mont-Blanc · 45.925066, 6.871988
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/triple-espresso-run-naak-x-suunto-x-buff) · research lead / unverified
> A one-hour coffee shakeout on UTMB race morning, run together by Naak, Suunto and BUFF from the Fan Experience in the Ultra-Trail Village. Free, with no registration published.

**NNormal — NNormal Gear Test and Light Breakfast**
28 Aug · ARCUS Coffee, Chamonix · Chamonix-Mont-Blanc · 45.923759, 6.876078
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/nnormal-gear-test-and-light-breakfast) · research lead / unverified
> Runners can pick up NNormal's Cadí, Kjerag 02 or Tomir 02 shoes and Modular Trail Vest between 9 and 10am, then test the gear on local trails at their own pace. The group reconvenes for a light breakfast and time to meet fellow runners, with the session finishing at 11:30am. An identity card is required as a deposit and places are limited.

**SAP, Goldwin, Product Index — SAP Good Energy Shakeout**
26 Aug · Japonyard · Chamonix-Mont-Blanc · 45.915659, 6.863038
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/sap-good-energy-shakeout) · research lead / unverified
> A 6km community run at social pace, meeting at Japonyard at 08:00 and leaving at 08:15. Coffee and pancakes follow back at the Voxeloft installation, and the open hours run from 10:00 to 12:00 after it. RSVP through the Product Index Instagram.

---

# Party — 11 leads

**Arc'teryx, Distance — Arc'teryx x Distance Opening Night**
25 Aug · Arc'teryx Chamonix · Chamonix-Mont-Blanc · 45.920732, 6.866915
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/arcteryx-x-distance-opening-night) · research lead / unverified
> Arc'teryx and Distance Athletics open race week with a screening of Unplugged, an athlete panel Q&A and a customization workshop. The gathering also introduces the Arc'teryx x Distance collection and Aid Station, with drinks and snacks. Entry is free. RSVP is required for the film screening and panel.

**Rabbit — rabbit Welcome Reception**
25 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/rabbit-welcome-reception) · research lead / unverified
> A 90-minute race-week reception brings runners and friends together over complimentary drinks and light bites. The event is free and places are limited.

**Running Club Catalans, New Balance — Friends & Family BBQ**
25 Aug · Chalet RCC (town-level pin) · Chamonix · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/friends-family-bbq) · research lead / unverified
> An evening barbecue at Chalet RCC, where Running Club Catalans is based for UTMB week. It closes the club's opening day in Chamonix, which starts with a morning social run.

**Naak — Ultra Night at the Naak Chalet Camp**
25 Aug · Le Chalet Savoy · Chamonix-Mont-Blanc · 45.923591, 6.866257
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/ultra-night-at-the-naak-chalet-camp) · research lead / unverified
> Three hours off the trail at Le Chalet Savoy with drinks, food to share and Naak's international athletes a few hours before their biggest races of the year. It is deliberately a breather from race-week intensity. Invitation only.

**Altra running — Women in Trail Running Panel**
26 Aug · Maison des Artistes · Chamonix · 45.921946, 6.871635
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/women-in-trail-running-panel) · research lead / unverified
> A panel discussion at Maison des Artistes on the role of women in trail running, covering experiences, challenges and opportunities in the sport and the growing impact of women in the community. It is open to everyone and follows the women's community run earlier that afternoon. On the panel are elite athletes Eevi Bengs and Adriana Moser, Gloria Sarapong of Red Hot Run Club and Altra She Runs Free, nutritionist Noucka Simic, Altra head of product Costanza Campos and Karen Merlin of the UTMB World Series elite team.

**HOKA — HOKA: Let's Celebrate Ludo**
26 Aug · HOKA Base Camp, La Folie Douce · Chamonix-Mont-Blanc · 45.925429, 6.867371
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/hoka-lets-celebrate-ludo) · research lead / unverified
> HOKA throws an evening for Ludovic Pommeret, with a display of his career moments and his signature cocktail from check-in at 18:00. A ten-minute film of unseen footage screens at 19:00, followed by a live conversation with Ludo and then a DJ with complimentary cocktails and soft drinks. Free, registration required, capacity is limited and allocated first come first served. Bad weather moves it indoors to Club 1969.

**La Folie Douce — Guinguette Club at La Folie Douce**
27 Aug · La Folie Douce Hotels Chamonix · Chamonix-Mont-Blanc · 45.925429, 6.867371
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/guinguette-club-at-la-folie-douce) · research lead / unverified
> The hotel's own guinguette evening on the terrace at La Folie Douce, on the Thursday of race week. It is a sunset party rather than anything to do with the racing, and the hotel publishes no start time. Free and open to the public.

**La Folie Douce — Bella Vita at La Folie Douce**
28 Aug · La Folie Douce Hotels Chamonix · Chamonix-Mont-Blanc · 45.925429, 6.867371
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/bella-vita-at-la-folie-douce) · research lead / unverified
> The hotel's Italian night on the outdoor terrace at La Folie Douce, which runs every Friday through the summer and this week lands on UTMB start night. The hotel publishes no start time. Free and open to the public.

**Arc'teryx, Distance — Arc'teryx x Distance Closing Party**
28 Aug · Maison des Artistes · Chamonix-Mont-Blanc · 45.921955, 6.871636
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/arcteryx-x-distance-closing-party) · research lead / unverified
> Arc'teryx and Distance Athletics host an afternoon of music at Maison des Artistes celebrating the people, stories and experiences of UTMB Mont-Blanc race week. KOZ-FLOKA plays DJ sets, with drinks, snacks and a sun-faded T-shirt giveaway. Entry is free, open to all and does not require registration.

**Vert Lodge — UTMB BBQ with Live Music**
28 Aug · Vert Lodge Chamonix, Route des Gaillands · Chamonix-Mont-Blanc · 45.91577, 6.84944
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/utmb-bbq-with-live-music) · research lead / unverified
> A race-day barbecue at the Vert Lodge on Route des Gaillands, a short walk from the UTMB start. Food goes on from 15:00 and G plays live from 17:30. The plate is lemon pepper chicken or hot honey halloumi, with coleslaw, roast baby potatoes, salad and corn. Free to attend, the plate is paid.

**Rabbit — Toast to Chamonix**
30 Aug · rabbit Clubhouse at Hotel Le Faucigny · Chamonix-Mont-Blanc · 45.924456, 6.869022
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/toast-to-chamonix) · research lead / unverified
> A one-hour gathering closes rabbit's race-week programme in Chamonix. Fresh fruit is served with a choice of Prosecco, a mimosa or a non-alcoholic sparkling drink for a toast to new friendships, accomplishments and memories from the trails. Attendance is free and places are limited.

---

# Race — 2 leads

**Mind The Gap, KEEN — Mind The Gap x KEEN Checkpoint Race**
27 Aug *(date never published — spans race week)* · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/mind-the-gap-x-keen-checkpoint-race) · research lead / unverified
> Mind The Gap brings its checkpoint race format to Chamonix with KEEN. Runners hunt checkpoints across the valley rather than following a set course. Invitation only, with the route and the logistics sent to entrants directly. No date, time or start point has been published, so this entry spans race week and the map pin sits on Chamonix centre.

**Unsanctioned Athletics — Unsanctioned Athletics Chamonix Round 3**
27 Aug · Chamonix (town-level pin) · Chamonix-Mont-Blanc · 45.9237, 6.8694
[source](https://www.marathon-weekend.com/chamonix/utmb-2026/events/unsanctioned-athletics-chamonix-round-3) · research lead / unverified
> Unsanctioned Athletics brings the third round of its open-access race series to Chamonix, starting at 18:30 on the Thursday evening of race week. The start point is announced on their Instagram rather than published in advance, so the map pin sits on Chamonix centre.
