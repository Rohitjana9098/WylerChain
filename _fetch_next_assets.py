"""Download all /_next/static assets referenced by the local /app dashboard
(which was mirrored from https://www.wylerchain.io/app) so the SPA works
fully offline/static on localhost."""
import os
import re
import urllib.request

BASE = "https://www.wylerchain.io"
ROOT = r"e:\WylerChain"
HTML = os.path.join(ROOT, "app", "index.html")

with open(HTML, encoding="utf-8") as f:
    html = f.read()

paths = set(re.findall(r'(?:src|href)=["\'](/_next/[^"\']+)["\']', html))
# chunk references inside self.__next_f.push scripts, and CSS url(...) refs
paths |= set(re.findall(r'"(/_next/static/[^"]+\.(?:js|css))"', html))
paths |= set(re.findall(r"url\(['\"]?(/_next/[^)'\"]+)['\"]?\)", html))

ok, errs = 0, 0
for p in sorted(paths):
    clean = p.split("?")[0]
    if not clean.startswith("/_next/"):
        continue
    dest = os.path.join(ROOT, *clean.lstrip("/").split("/"))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        continue
    try:
        urllib.request.urlretrieve(BASE + clean, dest)
        print("OK ", clean)
        ok += 1
    except Exception as e:  # noqa: BLE001
        print("ERR", clean, e)
        errs += 1

print(f"\nDone: {ok} fetched, {errs} errors")