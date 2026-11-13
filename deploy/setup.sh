#!/bin/bash
# Arab Sat - install on a Debian/Ubuntu server (run as root). Safe to re-run.
# Needs /opt/arabsat/servers.json (server names + hosts), which is NOT in git.
set -e
apt-get update -y >/dev/null && apt-get install -y git python3 >/dev/null
if [ ! -d /opt/arabsat/.git ]; then
  tmp=$(mktemp -d); git clone -q https://github.com/remoo20r/arabsat "$tmp/a"
  mkdir -p /opt/arabsat; cp -a "$tmp/a/." /opt/arabsat/; rm -rf "$tmp"
fi
id arabsat >/dev/null 2>&1 || useradd -r -s /usr/sbin/nologin arabsat
chown -R arabsat:arabsat /opt/arabsat
cat > /etc/systemd/system/arabsat.service <<UNIT
[Unit]
Description=Arab Sat web player
After=network-online.target
Wants=network-online.target
[Service]
User=arabsat
WorkingDirectory=/opt/arabsat
Environment=PORT=80
AmbientCapabilities=CAP_NET_BIND_SERVICE
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
Description=Arab Sat auto update
[Service]
Type=oneshot
ExecStart=/usr/local/bin/arabsat-update
UNIT
cat > /etc/systemd/system/arabsat-update.timer <<UNIT
[Unit]
Description=Arab Sat auto update timer
[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload
systemctl enable --now arabsat arabsat-update.timer
sleep 2; systemctl is-active arabsat && echo ARABSAT_OK
