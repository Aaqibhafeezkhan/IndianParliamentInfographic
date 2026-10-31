# Parliament data layer

- `loader.js` parses CSV/JSON member files, normalizes both Houses, validates required fields and duplicate IDs, and stores successful imports in browser local storage.
- `metadata.json` records the offline-first import contract and official reference links. It contains no member records.
- `schema.json` defines the normalized member contract.
- `history.json` contains historical chronology and official archive links, not a historical member dataset.
- The previous runtime Sansad API loader has been removed.

Use **Import data** in the app to load a CSV or JSON file. The file remains in the current browser profile and is not uploaded. Successful imports persist after reload. While the page is loaded, member workflows use the saved data without calling an external member API.

Run `node scripts/validate-data.mjs` and `node scripts/test-import.mjs` for local checks. No official member snapshot is bundled because permission to redistribute the source compilation has not been confirmed.
