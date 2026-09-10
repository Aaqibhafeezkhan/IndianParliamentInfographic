# Indian Parliament Explorer

An independent, browser-based civic-data explorer for exploring parliamentary representation, member participation, party distribution, state representation and comparative statistics.

**Live demo:** https://aaqibhafeezkhan.github.io/IndianParliamentInfographic/

## What changed

The application has been rebuilt around a clearer product structure:

- Overview dashboard with headline metrics, party representation, state representation and rankings.
- Member directory with search, filtering, sorting and table/card modes.
- Member profiles with participation, representation, declaration and derived-score views.
- Analytics for gender, cabinet composition, attendance, education, age and party performance.
- Side-by-side comparison for up to four members.
- Responsive layouts for desktop and mobile.
- Explicit distinction between embedded source data and calculated statistics.
- Dedicated methodology and provenance surface.
- CSV export of the currently filtered member set.

## Data architecture

The previous monolithic application has been preserved as `legacy.html` so the existing embedded dataset remains available while the application layer is modernized. The new `index.html` loads that dataset client-side and provides the redesigned experience.

The inherited dataset should be treated as a project dataset requiring validation, not as a claim of live parliamentary data. Parliamentary membership and statistics change over time and should be verified against authoritative sources before publication as current facts.

## Sources

See [`SOURCES.md`](SOURCES.md) for provenance, methodology, reuse guidance and preferred Digital Sansad references.

## Deployment

The project remains a static GitHub Pages application. No server runtime or GitHub Actions workflow is required.

## Disclaimer

Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha or Digital Sansad product.
