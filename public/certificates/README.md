# /public/certificates

All certificates below are backed by real files, copied in from the
provided PDFs and renamed for clarity. Nothing here is a placeholder.

| File | Certificate | Referenced from |
|---|---|---|
| `internship-ict-academy.pdf` | Certificate of Internship — ICT Academy of Kerala | `data/experience.ts` |
| `ict-data-science-specialist.pdf` | Certified Specialist in Data Science and Analytics — ICT Academy of Kerala | `data/certifications.ts` |
| `linkedin-become-a-data-scientist.pdf` | Become a Data Scientist — LinkedIn Learning | `data/certifications.ts` |
| `linkedin-python-for-data-science-ml-part1.pdf` | Python for Data Science and Machine Learning — Part 1 (LinkedIn Learning) | `data/certifications.ts` (`linkedin-python-ds-ml`, `certificates[0]`) |
| `linkedin-python-for-data-science-ml-part2.pdf` | Python for Data Science and Machine Learning — Part 2 (LinkedIn Learning) | `data/certifications.ts` (`linkedin-python-ds-ml`, `certificates[1]`) |
| `linkedin-power-bi-for-data-analysts.pdf` | Complete Guide to Power BI for Data Analysts by Microsoft Press — LinkedIn Learning | `data/certifications.ts` |
| `linkedin-tableau-certified-data-analyst-prep.pdf` | Tableau Certified Data Analyst Cert Prep — LinkedIn Learning | `data/certifications.ts` |
| `neuralnest-power-bi-workshop.pdf` | Power BI Workshop — NeuralNest (2024) | `data/certifications.ts` |

## Adding another certificate later

1. Drop the file in this folder.
2. Append a new entry to the `certifications` array in `data/certifications.ts`
   with a unique `id`, the exact `title`/`issuer`/`year` from the certificate,
   and a `certificate: { fileUrl: '/certificates/your-file.pdf', fileType: 'pdf' }`.

The UI only ever shows "Certificate coming soon" for an entry whose
`fileUrl` is `undefined` — every entry currently in the data file has a
real file attached.
