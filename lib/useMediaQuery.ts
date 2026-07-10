"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Defaults to `false` until mounted so the
 * mobile (stacked, non-flex-grow) layout is always what gets server-rendered
 * and hydrated first — then desktop-only behavior is layered on after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
