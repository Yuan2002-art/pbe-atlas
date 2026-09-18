---
name: HOKA
country: United States
founded: 2009
category: trail
positioning: Maximal cushioning as a visible, arguable design position.
accent: "#c8371f"
status: partially-verified
sources:
  - title: "Meet HOKA — \"HOKA was born in the French Alps in 2009, when two athletes set out to design a running shoe that made downhill running feel like flying. Their first shoe, the Mafate, completely disrupted the industry's minimalist leanings with its oversized shape and high-cushion design.\" Names the co-founders as Jean-Luc Diard and Nicolas Mermoud; states that Hoka means \"to fly\"."
    publisher: HOKA
    url: https://www.hoka.com/en/gb/explore-about-hoka/
    type: official-brand
    accessed: 2026-09-17
---

Founded in 2009 in the French Alps and now operated from California, HOKA grew
from an oversized-midsole curiosity into a mainstream running brand. Because its
core idea is visually obvious, its activations lean on letting people feel the
difference immediately.

Relevant here as the clearest example of **product trial** as the primary
experiential mechanism.

**What is verified:** the 2009 founding, the French Alps origin, and that there
were two founders — Jean-Luc Diard and Nicolas Mermoud, named on the page as
co-founders. The design premise this record leans on is also the brand's own:
the first shoe, the Mafate, is described by HOKA as having "completely disrupted
the industry's minimalist leanings with its oversized shape and high-cushion
design", and the founders are quoted saying the original goal was to design a
shoe to go downhill faster. So "maximal cushioning as a visible design position"
is HOKA's account of itself, not an outside reading.

**What is not, and it matters for the `country` field.** HOKA's own page says the
brand was born in the **French Alps**; this record's `country` says **United
States**. Both can be true — the schema defines the field as country of origin
*or* headquarters — but the field is currently carrying headquarters while the
brand's own history points at France, and nothing on this page states the move to
California. Treat `country` as the operating country, not the origin, until
either the field is split or a source for the California operation is attached.

**"Two French trail runners" is not what the source says.** The page says "two
athletes", and gives a French *location*, not a nationality. The founders' names
are French and the brand was born in the Alps, but their nationality is inferred
here rather than sourced, and the wording above has been changed accordingly.

**Note on retrieval, because it cost a session.** `hoka.com/en/us/` and
`/en/is/` return empty documents to this client across About, Our Story and
About HOKA — this record sat at `unsourced` for that reason. The `/en/gb/`
locale renders normally. The UK "Our Story" page is pure brand-voice copy with
no dates, places or names in it; the factual history is on "Meet HOKA" at
`/en/gb/explore-about-hoka/`. If another HOKA fact needs sourcing, start there.
