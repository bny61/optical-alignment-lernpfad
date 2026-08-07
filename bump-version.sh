#!/bin/sh
# Erhöht den Cache-Buster ?v=N in index.html. Vor jedem Deploy ausführen,
# sonst liefern Browser die alten js/css-Dateien aus dem Cache aus.
set -e
cd "$(dirname "$0")"
alt=$(grep -o '?v=[0-9]\+' index.html | head -1 | cut -d= -f2)
neu=$((alt + 1))
sed -i '' "s/?v=$alt\"/?v=$neu\"/g" index.html
echo "Version $alt -> $neu"
