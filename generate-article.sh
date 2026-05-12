#!/bin/bash
# myFly24 Magazin – Automatische Artikel-Generierung
# Cronjob: alle 2 Wochen
# Einrichtung: crontab -e
# 0 9 1,15 * * /var/www/myfly24.com/generate-article.sh >> /var/www/myfly24.com/shared/article-cron.log 2>&1

set -e

APP_URL="http://localhost:3000"
ADMIN_KEY="${MYFLY24_ADMIN_KEY:-myfly24-admin-2026}"

echo "[$(date)] Starte automatische Artikel-Generierung..."

# 1. Nächstes Thema holen
SUGGESTION=$(curl -s -H "Authorization: Bearer $ADMIN_KEY" "$APP_URL/api/admin/generate-article")
TOPIC=$(echo "$SUGGESTION" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['suggestion']['topic'])")
CATEGORY=$(echo "$SUGGESTION" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['suggestion']['category'])")

echo "[$(date)] Thema: $TOPIC ($CATEGORY)"

# 2. Artikel generieren
RESULT=$(curl -s -X POST \
  -H "Authorization: Bearer $ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"topic\": \"$TOPIC\", \"category\": \"$CATEGORY\"}" \
  "$APP_URL/api/admin/generate-article")

TITLE=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('article',{}).get('title','FEHLER'))")

if [ "$TITLE" = "FEHLER" ]; then
  echo "[$(date)] FEHLER: Artikel-Generierung fehlgeschlagen"
  echo "$RESULT"
  exit 1
fi

echo "[$(date)] Artikel erstellt: $TITLE"
echo "[$(date)] Fertig."
