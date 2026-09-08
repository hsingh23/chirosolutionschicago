# 006 — Two component directories (legacy duplicate kept)

- **Date:** introduced 2025-01-19 (`0adcd41`), re-added 2025-02-19 (`438c334`)
- **Status:** Accepted as tech debt (documented, not resolved)
- **Context:** The initial site build placed Header/Footer/Providers/
  ScrollToTop/not-found under `app/components/`. Later work standardized on a
  top-level `components/` directory (shadcn convention alongside `components.json`
  and `lib/utils.ts`), but the old copies were never deleted — and `438c334` even
  added fresh `app/components` copies of Footer/Header/Providers again.
- **Decision:** Keep both directories; the root layout (`app/layout.tsx`) imports
  Header/Footer/Providers from `components/`. The `app/components/*` files are
  dead code.
- **Rationale:** Purely incidental — no commit explains the retention; deleting
  them was simply never prioritized on a marketing site that "works".
- **Consequences:**
  - Editing the wrong copy is a real hazard (see AGENTS.md gotchas). Searches for
    "Header" return two hits; the `components/` one is live.
  - Safe future cleanup: delete `app/components/` and `app/not-found.tsx`-adjacent
    duplicates after confirming no imports reference them
    (`grep -rn "app/components" app components lib`).
