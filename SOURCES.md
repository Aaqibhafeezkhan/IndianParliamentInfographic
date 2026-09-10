# Data Sources & Methodology

This document records the provenance and interpretation rules for Indian Parliament Explorer. It is intentionally conservative: an official website is treated as a reference source, not as automatic permission to reproduce every page, image, PDF, graphic, logo, or compilation.

## Current application

The explorer is a static Lok Sabha visualization. The application preserves the previous embedded member dataset in `legacy.html` for continuity, while the structured data boundary now lives under `data/`.

The current member records are explicitly classified as **inherited and unverified**. They are not represented as live official parliamentary data.

## Structured data contract

The maintained data layer should record at least:

| Field | Purpose |
| --- | --- |
| `sourceUrl` | Official or otherwise authoritative location from which data was obtained or validated |
| `retrievedAt` | Date/time when the source was accessed |
| `asOf` | Date the dataset is intended to represent |
| `coverage` | House, session, election, or population covered |
| `lastVerifiedAt` | Date the maintained records were last checked against the source |
| `validation` | Field-level validation state |
| `notes` | Important interpretation or normalization details |

The current metadata intentionally leaves retrieval and verification dates null until an authoritative refresh is completed.

## Primary reference sources

The following official Digital Sansad resources are the preferred starting points for validation:

- Lok Sabha member information: https://sansad.in/ls/ipg/list-of-members
- Rajya Sabha member directory: https://sansad.in/rs/members
- Rajya Sabha terms: https://sansad.in/rs/termsAndConditions
- Digital Sansad copyright/privacy information: https://sansad.in/rs/privacyPolicy
- Parliament Digital Library copyright policy: https://eparlib.sansad.in/help/copyright-policy.jsp

These links are reference sources for validation and future data ingestion. They do not establish unrestricted permission to reproduce every hosted asset or compilation.

## Facts vs derived statistics

### Source-backed facts

Examples include member names, parties, states/UTs, constituencies, term information, and other attributes explicitly published by an authoritative source.

### Derived statistics

Examples include party seat shares, rankings, percentages, totals, comparisons, distributions, and performance scores calculated from the maintained dataset.

Derived values should be labelled as calculated rather than presented as directly sourced facts.

## Data freshness

Parliamentary information changes over time. A dataset is not permanently current.

Every authoritative refresh should record both:

1. **Retrieved date** — when the source was accessed.
2. **As-of date** — the point in time the dataset represents.

The application should surface these values when they become available rather than implying freshness from the presence of an official source URL alone.

## Validation policy

A validation pass should check membership identity, party, state/constituency, term status and any statistical or declaration fields against their relevant authoritative source context. A field should remain marked unverified when no reliable validation evidence is available.

Missing information should remain missing rather than being guessed or silently inferred.

## Normalization policy

Official naming should be preserved for factual display where practical. Normalized names may be used for filtering, grouping, or stable internal identifiers, but normalization should not silently change the underlying fact.

## Reuse and copyright checks

Before adding externally sourced assets or data to the repository:

- Verify the source and provenance.
- Check the source's copyright/reuse policy.
- Record attribution where required.
- Confirm that photographs, logos, graphics, PDFs, and other protected materials are permitted for the intended use.
- Prefer linking to official material rather than copying it when reuse rights are unclear.
- Keep original project code clearly separated from third-party content.

Public accessibility does not by itself establish unrestricted reuse rights.

## Independent project disclaimer

**Indian Parliament Explorer is an independent visualization project. It is not an official Parliament of India, Lok Sabha, Rajya Sabha, or Digital Sansad product.**

## Correction policy

Potential data errors should be traceable to a source. A correction should identify the affected field, the authoritative source used to validate it, and the date of verification.

## Future refresh record

When an authoritative dataset is introduced, record:

```text
Dataset: <name>
House/Coverage: <scope>
Source URL: <official source>
Retrieved At: <YYYY-MM-DD>
As Of: <YYYY-MM-DD>
Last Verified At: <YYYY-MM-DD>
Validation: <how records were checked>
Notes: <normalization, exclusions, or caveats>
```
