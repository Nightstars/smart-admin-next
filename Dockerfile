FROM caddy

COPY dist/ /usr/share/caddy/

COPY caddy/Caddyfile /etc/caddy/Caddyfile
