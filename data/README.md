# Parliament data layer

This directory is the structured-data boundary for the explorer.

The current member records are still inherited from the preserved `legacy.html` dataset. They are intentionally classified as `inherited-unverified` until an authoritative refresh is performed.

`metadata.json` records the intended provenance contract. `schema.json` classifies the fields used by the application. `loader.js` provides a single loader and validation boundary for the transitional dataset.

A future refresh should replace the inherited source with a versioned machine-readable member dataset and populate `retrievedAt`, `asOf`, `lastVerifiedAt` and field-level validation status. The application should then consume that dataset without parsing HTML.
