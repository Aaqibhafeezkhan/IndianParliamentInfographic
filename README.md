# Indian Parliament Explorer

An independent, browser-based civic-data explorer for exploring current parliamentary representation from official Digital Sansad member sources.

**Live demo:** https://aaqibhafeezkhan.github.io/IndianParliamentInfographic/

## Current scope

- Official-source Lok Sabha and Rajya Sabha member loading at runtime.
- Overview of house, party and state representation.
- Search and filtering across official member records.
- Member profiles and side-by-side comparison.
- Calculated representation analytics.
- CSV export of the loaded official member directory.
- Explicit provenance and data-freshness information.
- Responsive GitHub Pages interface.

## Data

Production member data comes from Digital Sansad:

- Lok Sabha: https://sansad.in/ls/members
- Rajya Sabha: https://sansad.in/rs/members

The application does not use `legacy.html` as a production data source. The file remains only as an archive of the previous implementation.

Performance and declaration fields such as attendance, questions, debates, bills, assets, liabilities and criminal cases are not invented or inherited from the archive. They remain unavailable until separately validated from authoritative records.

See [`SOURCES.md`](SOURCES.md) for the full provenance and methodology policy.

## Deployment

The project remains a static GitHub Pages application. No server runtime or GitHub Actions workflow is required.

## Disclaimer

Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.
