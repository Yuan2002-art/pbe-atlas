"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ===========================================================================
   Back — one step along the reader's own path.

   A record sits in three registers at once: a case belongs to a brand, to an
   edition and to the register, and a fixed "All cases" link sent everyone to
   the same place no matter which of the three they arrived from. This goes
   back the way they came.

   It falls back to a real link when there is nowhere to go back to — someone
   opening the page from a search result or a pasted url has no history, and a
   dead arrow is worse than a wrong one. The fallback is rendered until the
   component knows, so the page is never without a way out.
   =========================================================================== */

export function BackLink({ fallback }: { fallback: { href: string; label: string } }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // history.length > 1 means this tab has somewhere to return to. It is the
    // only signal available without tracking the reader.
    setCanGoBack(window.history.length > 1);
  }, []);

  if (!canGoBack) {
    return (
      <Link href={fallback.href} className="glass btn-back" title={fallback.label}>
        <span aria-hidden="true">←</span>
        <span className="btn-back__label">{fallback.label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="glass btn-back"
    >
      <span aria-hidden="true">←</span>
    </button>
  );
}
