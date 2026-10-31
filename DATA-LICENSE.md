# Data and third-party material reuse audit

## Scope

The MIT license in LICENSE.md applies only to original project code and documentation owned by the repository copyright holder. It does not license Digital Sansad records, official photographs, logos, PDFs, fonts, or third-party content.

## Current production inputs

| Material | Source | Current handling | Reuse status |
| --- | --- | --- | --- |
| Lok Sabha member records | User-supplied CSV/JSON; reference: https://sansad.in/ls/members | Imported locally; no automatic download or bundled snapshot | User confirms permission for their imported file |
| Rajya Sabha member records | User-supplied CSV/JSON; reference: https://sansad.in/rs/members | Imported locally; no automatic download or bundled snapshot | User confirms permission for their imported file |
| Historical references | https://eparlib.sansad.in/ and official Rajya Sabha publications | Links and limited chronology metadata | Rights for copied publication material must be reviewed separately |
| Archived implementation | legacy.html | Kept as archive; excluded from production loading | Field-level provenance and rights have not been independently audited |
| UI styling and code | Repository-authored files | Used by this project | Covered by LICENSE.md to the extent owned by the repository copyright holder |

## Release restrictions

- Public availability is not proof of permission to republish or redistribute a dataset or asset.
- The production app does not call Digital Sansad APIs and does not bundle official member records.
- Do not add copied official photographs, logos, PDFs or bulk datasets unless the applicable permission or license has been verified.
- Do not describe imported records as current or verified unless their source and as-of date support that claim.
- Confirm applicable terms before distributing a downloadable data snapshot or making rights-sensitive commercial reuse.

## Audit status

**Open / partially audited.** This file records known source boundaries; it is not a legal opinion and does not claim that all third-party reuse permissions have been obtained.
