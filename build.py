"""Static page builder for FareWise Japan.
Pages live in pages/*.html as body fragments with a front-matter-like first line:
<!-- title: ... | description: ... | path: index.html -->
Run: python3 build.py   (writes the final HTML files at the repo root)
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SITE = "FareWise Japan"

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500&display=swap">
<link rel="stylesheet" href="{base}assets/style.css">
</head>
<body>
<header class="site-head"><div class="wrap">
  <a class="brand" href="{base}index.html"><b>FareWise Japan</b><span lang="ja">運賃を賢く</span></a>
  <nav class="nav" aria-label="Main">
    <a href="{base}tools/index.html">Tools</a>
    <a href="{base}about.html">How we check fares</a>
    <a href="{base}disclosure.html">Disclosure</a>
  </nav>
</div></header>
<main><div class="wrap stack">
"""

FOOT = """</div></main>
<footer class="site-foot"><div class="wrap">
  <nav aria-label="Footer">
    <a href="{base}about.html">About</a>
    <a href="{base}disclosure.html">Affiliate disclosure</a>
    <a href="{base}privacy.html">Privacy</a>
  </nav>
  <p>Fares and pass prices change. We link every number to the operator's official page with the date we checked it. Always confirm before you buy.</p>
  <p>&copy; 2026 FareWise Japan</p>
</div></footer>
</body>
</html>
"""


def build():
    for src in sorted((ROOT / "pages").rglob("*.html")):
        text = src.read_text(encoding="utf-8")
        m = re.match(r"<!--\s*title:(.*?)\|\s*description:(.*?)\|\s*path:(.*?)-->\n", text)
        if not m:
            raise SystemExit(f"missing header line in {src}")
        title, desc, path = (s.strip() for s in m.groups())
        body = text[m.end():]
        depth = path.count("/")
        base = "../" * depth
        out = ROOT / path
        out.parent.mkdir(parents=True, exist_ok=True)
        full_title = title if title.endswith(SITE) else f"{title} | {SITE}"
        out.write_text(
            HEAD.format(title=full_title, description=desc, base=base) + body + FOOT.format(base=base),
            encoding="utf-8",
        )
        print("built", path)


if __name__ == "__main__":
    build()
