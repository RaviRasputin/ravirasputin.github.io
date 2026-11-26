# ravirasputin.github.io

Academic website of Ravi Kumar. Static HTML, no framework.

## Structure

- Each page has its own address: `/about/`, `/research/`, `/publications/`, `/research-in-progress/`, `/datasets/`, `/book-reviews/`, `/talks/`, `/teaching/`, `/cv/`, `/book/`, `/reading/`, `/photographs/`, `/contact/`.
- Page bodies are in `src/pages/`. The shared navigation, footer, photograph viewer and structured data are in `src/`.
- `tools/build.py` assembles the finished pages (`index.html` and one `index.html` per folder) and `sitemap.xml`. After editing anything in `src/`, run `python3 tools/build.py` and commit the result.
- Styles are in `style.css` (light theme), behaviour in `assets/site.js`.
- Old links of the form `/#publications` redirect to the new addresses.
