# Parliament data layer

This directory contains the normalized data contract, official source metadata, historical reference chronology, and the production browser loader.

- `official-loader.js` loads current member records directly from the official Digital Sansad endpoints. It normalizes the two Houses to a common record shape and reports partial source failures rather than silently treating a partial load as complete.
- `metadata.json` records the source URLs, intended coverage, and runtime freshness contract.
- `schema.json` classifies fields and defines the normalized House enum.
- `history.json` contains historical chronology and official archive links, not a copied historical membership dataset.
- `loader.js` is a legacy transitional loader retained for reference only; it reads `legacy.html` and must not be used by the production app.

## Refresh and validation

Run `node scripts/validate-data.mjs` for offline repository-contract checks. Run `node scripts/check-live-data.mjs` to fetch both current official sources and validate response shape, record IDs, duplicate IDs, names, and basic completeness. The live checker emits counts and quality summaries only; it does not persist source records.

Before creating a redistributable snapshot, first verify the source terms and record permission in `DATA-LICENSE.md`. Runtime availability is not proof of redistribution rights.
