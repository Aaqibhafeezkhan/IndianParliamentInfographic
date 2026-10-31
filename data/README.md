# Parliament data layer

- `loader.js` retrieves the RTI Wiki Lok Sabha and Rajya Sabha JSON snapshots, validates their metadata and record counts, normalizes the member fields used by the app, and caches successful loads in browser storage.
- `metadata.json` records the automatic-load contract, source URLs, attribution and freshness behavior.
- `schema.json` defines the normalized member contract.
- `history.json` contains historical chronology and official archive links, not a historical member dataset.
- The production application does not call Digital Sansad APIs directly.

Visitors do not upload a file. On first visit the app loads both published snapshots. On later visits it renders cached data immediately and checks the sources again. A failed refresh leaves the previous cache untouched. The UI displays the source as-of date separately from the local retrieval timestamp.

The provider catalogue is https://righttoinformation.wiki/static/data/csv/ and identifies the member snapshots as CC BY 4.0. Attribution: RTI Wiki — righttoinformation.wiki.
