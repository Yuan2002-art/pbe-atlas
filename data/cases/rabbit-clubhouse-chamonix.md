---
title: Clubhouse Chamonix
brand: rabbit
primaryActivationLogic: community-programming
secondaryActivationLogic: limited-drop
activationLogicRationale: >-
  Seven sessions across seven days — shakeouts, a founders' panel, a wine and
  cheese evening, a closing toast — for people staying in the building, so the
  mechanism depends on the second and third visit and Community Programming
  passes its own test. Limited Drop is the second mechanism: the Vendor
  Village chalet carried a Chamonix-exclusive collection, making the trip a
  condition of buying it. Retail applies as an attribute and is tagged.

  Recorded honestly: the thing that actually distinguishes this case has no
  value in the vocabulary. Access was sold as accommodation — rabbit's own
  page says "BOOK NOW" — and no existing logic describes paid hospitality.
  `service` is the nearest and it is wrong: its definition is repair, fitting
  and maintenance, and its test asks whether there is a reason to walk in
  without buying anything. So the logic under-describes this case, and adding
  a value to the vocabulary is a decision for the author, not a side effect of
  one case.
status: partially-verified
collaborators:
  - name: Hotel Le Faucigny
    role: Host property — 118 Place de l'Église
  - name: Appart'Hotel Le Genepy
    role: Second host property, taken over at the same time
  - name: Natalia Mastrota
    role: Professional trail runner — led the 5k shakeout walk
  - name: Run the Alps
    role: Partner on the 5k shakeout
  - name: Tailwind Nutrition
    role: Meet the Founders panel
  - name: Halo
    role: Meet the Founders panel
  - name: Raziq Rauf
    role: Author — wine and cheese evening
location:
  venue: Hotel Le Faucigny, 118 Place de l'Église
  city: Chamonix
  region: Haute-Savoie
  country: France
  countryCode: FR
  coordinates: [6.8694, 45.9237]
  coordinatePrecision: city
date:
  start: 2026-08-24
  end: 2026-08-30
  precision: day
primarySpatialType: activation
secondarySpatialType: pop-up
relatedEvent: utmb-mont-blanc-2026
product: Chamonix-exclusive collection, sold at the Vendor Village chalet
tags:
  - community
  - collaboration
  - limited-drop
  - retail
  - event-activation
images: []
sources:
  - title: "rabbit Clubhouse Series — \"The rabbit Clubhouse is a home base during race week. Part hotel room, part pop-up shop, part community hub\"; \"rabbit is taking over Hotel Le Faucigny & Appart'Hotel Le Genepy, creating a home base in the heart of Chamonix\"; carries a BOOK NOW call to action"
    publisher: rabbit
    url: https://www.runinrabbit.com/blogs/rabbit-chatter/rabbit-clubhouse-series
    type: official-brand
    accessed: 2026-09-17
  - title: "rabbit @ UTMB 2026 — listing giving the Clubhouse at Hotel Le Faucigny, 24–30 August, open 09:00–18:00 Monday to Saturday and 09:00–11:00 Sunday, with a Vendor Village chalet carrying the Chamonix collection"
    publisher: Movemint
    url: https://www.movemint.cc/events/rabbit__utmb_2026
    type: other
    accessed: 2026-09-17
  - title: "HOKA UTMB Mont-Blanc 2026 — event dates, 24–30 August"
    publisher: UTMB Mont-Blanc
    url: https://montblanc.utmb.world/discover/the-event/animation
    type: event-organiser
    accessed: 2026-09-16
---

## Description
For UTMB race week, **24–30 August 2026**, rabbit took over two properties in
central Chamonix — **Hotel Le Faucigny** at 118 Place de l'Église and the
neighbouring **Appart'Hotel Le Genepy** — and ran them as a **Clubhouse**.

rabbit describes the format in its own words: *"The rabbit Clubhouse is a home
base during race week. Part hotel room, part pop-up shop, part community hub;
it's where runners settle in, dial it back, and fully soak in the experience."*

**It is sold, not opened.** The Clubhouse Series page is a booking page — it
carries a "BOOK NOW" call to action, and describes the format as "a curated
hospitality experience". Access to this space was a room reservation. No other
case in this Atlas works that way.

The Clubhouse was open **09:00–18:00 Monday to Saturday and 09:00–11:00 on the
Sunday** — the only case in this Atlas with published opening hours for every
day of its run. Seven sessions ran across the week: a 5k shakeout walk led by
the professional trail runner Natalia Mastrota, Carbs and Coffee, a welcome
reception, a second 5k shakeout with Run the Alps, a Meet the Founders panel
with Tailwind and Halo, a wine and cheese evening with the author Raziq Rauf,
and a closing Toast to Chamonix.

A **second rabbit space** operated separately: a chalet in the Vendor Village on
Place du Mont-Blanc, carrying a Chamonix-exclusive collection.

**Chamonix is one of three.** rabbit runs the Clubhouse Series at three races in
2026 — Chamonix, Chicago (the Arlo Chicago) and New York City. This is a
portable format, not a one-off: the same concept page sells all three.

## Verification notes
**The brand's own page and the third-party listing disagree about money, and the
brand wins.** The aggregator listing that first surfaced this case describes the
Clubhouse as "Free, with registration for the clubhouse". rabbit's own page is a
booking page with a "BOOK NOW" button that calls the format "a curated
hospitality experience". Those cannot both be right about the same space. The
record follows rabbit, and the discrepancy is noted here rather than silently
resolved — it is possible the individual *sessions* were free to registrants
while the *stay* was paid, but no retrieved source says so.

**The opening hours and the session list come from the listing, not the brand.**
rabbit's own page describes "a welcome party, pre-race strategy sessions, and
post-race celebrations" without times or a schedule; it links to a schedule page
that was not retrieved. So the 09:00–18:00 hours, the Sunday 09:00–11:00, the
seven named sessions and the Vendor Village chalet all rest on the Movemint
listing, filed as `other`. Open the brand's own schedule page to upgrade them.

**The address is documented but the pin is not.** Hotel Le Faucigny is at 118
Place de l'Église, 74400 Chamonix, per the listing; that address was not
geocoded here, so the coordinate is the town centre and precision is `city`.

**`primarySpatialType` is `activation` and `secondarySpatialType` is `pop-up`.**
The leading form is a takeover of two existing hotels, which is not `pop-up`,
not `permanent-retail` and not an `event` — a guest in premises the brand does
not own is what `activation` names. The second form is real and now recorded:
rabbit itself calls the Clubhouse "part pop-up shop", and the Vendor Village
chalet is a separate pop-up in a second location.

This was the case that triggered the change. It was the third hybrid in the
dataset — after The North Face and ASICS — and CLAUDE.md set a third hybrid as
the point at which the single-valued field should be revisited. It has been:
the field is now one primary plus one optional secondary, and all three hybrids
carry both.

**Two spaces, one record.** The Clubhouse and the Vendor Village chalet were in
different places with different purposes and, per the listing, different dates
— the chalet ran 24–28 August. They are recorded as one case because the sources
present them as one programme, but a reader should know the case covers two
sites.

**Nothing after the fact.** Every source is a listing or a concept page written
before or during the week. No post-event coverage, photographs, attendance or
booking figures were found, so there is no confirmation of how the space was
actually used.

## Strategic purpose
*Not yet written.* This layer is the author's reading and has not been drafted.
The material: a brand with no permanent retail in Chamonix bought a week of
someone else's hotel and resold it as the product.

## Archive use
*Not yet written.* What exists: a Chamonix-exclusive collection, a founders'
panel with two nutrition brands, and an evening with an author — but no
documented archive, exhibition or recorded material.

## Why this location?
*Not yet written.* The constraint: rabbit does not own or lease anything in
Chamonix. It selected two existing hotels in the town centre, one of them on
Place de l'Église, and the format is explicitly portable — the same concept ran
in Chicago and New York in the same year.

## Why this timing?
*Not yet written.* 24–30 August 2026, the full race week, with published daily
hours that close at 11:00 on the final Sunday — the morning after the UTMB
finishers come through.

## What performance claim is being reinforced?
*Not yet written.* Note for the record: no product performance claim appears in
any retrieved source. The named product is a place-exclusive collection, not a
technical one.

## What cultural meaning is being built?
*Not yet written.* rabbit's own framing to work from: "part hotel room, part
pop-up shop, part community hub… where runners settle in, dial it back, and
fully soak in the experience."

## What role does the physical experience play?
*Not yet written.* What is known: the space was somewhere to sleep as well as
somewhere to gather, open to guests for nine hours a day, and the experience was
inseparable from staying there. Nothing is documented about how either building
was altered, fitted or branded.
