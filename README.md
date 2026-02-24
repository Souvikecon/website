# Economics Job Market Candidates

A static website for browsing economics candidates and papers.

## Local development

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Update data

Edit `data/candidates.json` and include:
- candidate name, school, fields
- job market paper title + URL
- CV + website URL
- source URL and verification date

## GitHub hosting

1. Push this repo to GitHub.
2. Ensure your default branch is `main`.
3. In GitHub Settings → Pages, set source to "GitHub Actions".
4. Push to `main`; workflow `.github/workflows/pages.yml` deploys automatically.
