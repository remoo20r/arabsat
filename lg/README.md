# Arabesk TV for LG smart TVs (webOS)

`lg/app/` is the LG app: it reads the TV's own ID and opens the Arabesk TV web app with it,
so each TV keeps one fixed activation code. The remote's Back button works inside the app.

GitHub Actions (`.github/workflows/lg.yml`) builds `ArabeskTV-LG.ipk` on every change and
publishes it as the `lg-latest` release.

Install on a TV: LG Developer Mode app on the TV, then `ares-setup-device` + `ares-install ArabeskTV-LG.ipk`
from a computer (or the webOS Dev Manager app). App updates come from the server, so the TV
only needs reinstalling when the LG shell itself changes.
