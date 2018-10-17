ufw reset
ufw default deny incoming
ufw default allow outgoing
ufw allow https
ufw allow http
ufw allow 30303

for ip in $ALLOWED_IPS; do ufw allow from $ip to any port 8545; done

ufw enable

