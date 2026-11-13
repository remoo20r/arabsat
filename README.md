# Arab Sat - web IPTV player

Web version of the ArabeskTV / BellaTV app (same black, red and silver look) for iPhone, iPad and any browser.
Open the link in Safari, then Share > Add to Home Screen.

- `public/` - the web app (HTML/CSS/JS, no build step)
- `server.py` - tiny Python server: serves the app, hides the server hosts, proxies the Xtream API
- `servers.json` - server names and hosts (kept on the server only, not in git; see `servers.example.json`)
- `deploy/setup.sh` - installs it as a service on a Linux server with auto-update from this repo every 5 minutes
