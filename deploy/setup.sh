#!/bin/bash
# Arabesk TV - install on a Debian/Ubuntu server (run as root). Safe to re-run.
# Needs /opt/arabsat/servers.json (server names + hosts), which is NOT in git.
set -e
apt-get update -y >/dev/null && apt-get install -y git python3 python3-cryptography curl >/dev/null
IP=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip | tr . -)
RP="arabsat.$IP.sslip.io"
if [ ! -d /opt/arabsat/.git ]; then
  tmp=$(mktemp -d); git clone -q https://github.com/remoo20r/arabsat "$tmp/a"
  mkdir -p /opt/arabsat; cp -a "$tmp/a/." /opt/arabsat/; rm -rf "$tmp"
fi
id arabsat >/dev/null 2>&1 || useradd -r -s /usr/sbin/nologin arabsat
chown -R arabsat:arabsat /opt/arabsat
cat > /etc/systemd/system/arabsat.service <<UNIT
[Unit]
Description=Arabesk TV web player
After=network-online.target
Wants=network-online.target
[Service]
User=arabsat
WorkingDirectory=/opt/arabsat
Environment=PORT=8090
Environment=BIND=127.0.0.1
Environment=RP_ID=$RP
ExecStart=/usr/bin/python3 /opt/arabsat/server.py
Restart=always
RestartSec=3
MemoryMax=200M
[Install]
WantedBy=multi-user.target
UNIT
# auto-update from GitHub every 5 minutes
cat > /usr/local/bin/arabsat-update <<'UPD'
#!/bin/bash
cd /opt/arabsat || exit 0
old=$(git rev-parse HEAD)
sudo -u arabsat git -c safe.directory=/opt/arabsat pull -q --ff-only || exit 0
[ "$old" != "$(git rev-parse HEAD)" ] && systemctl restart arabsat
exit 0
UPD
chmod +x /usr/local/bin/arabsat-update
cat > /etc/systemd/system/arabsat-update.service <<UNIT
[Unit]
Description=Arabesk TV auto update
[Service]
Type=oneshot
ExecStart=/usr/local/bin/arabsat-update
UNIT
cat > /etc/systemd/system/arabsat-update.timer <<UNIT
[Unit]
Description=Arabesk TV auto update timer
[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
[Install]
WantedBy=timers.target
UNIT
# activation key shared with the Arabesk TV Telegram bot (derived from its token)
if [ ! -s /opt/arabsat/activate.key ] && [ -f /opt/arabesk/config.json ]; then
  python3 -c 'import json,hashlib;t=json.load(open("/opt/arabesk/config.json"))["bot_token"];print(hashlib.sha256((t+":arabsat").encode()).hexdigest())' > /opt/arabsat/activate.key
  chown arabsat:arabsat /opt/arabsat/activate.key; chmod 600 /opt/arabsat/activate.key
fi
# web address through Caddy: the app on plain http (IPTV streams are http, an https page would block them)
# and the same host on https only for the Face ID / passcode key page
if [ -f /etc/caddy/Caddyfile ]; then
  changed=0
  if ! grep -q "http://arabsat" /etc/caddy/Caddyfile; then
    printf '\nhttp://%s, http://tv.%s.sslip.io {\n  encode gzip\n  reverse_proxy 127.0.0.1:8090\n}\n' "$RP" "$IP" >> /etc/caddy/Caddyfile; changed=1
  fi
  if ! grep -q "https://arabsat" /etc/caddy/Caddyfile; then
    printf '\nhttps://%s {\n  encode gzip\n  reverse_proxy 127.0.0.1:8090\n}\n' "$RP" >> /etc/caddy/Caddyfile; changed=1
  fi
  [ $changed = 1 ] && systemctl reload caddy
fi
systemctl daemon-reload
systemctl enable --now arabsat arabsat-update.timer
systemctl restart arabsat
sleep 2; systemctl is-active arabsat && curl -s 127.0.0.1:8090/api/servers && echo && echo ARABSAT_OK
