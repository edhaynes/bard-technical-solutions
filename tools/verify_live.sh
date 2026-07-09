#!/bin/sh
# Verify the DEPLOYED site matches the local working tree — the gate
# that closes the loop after every push. "Committed" is not "done";
# this script proves what bardtek.com actually serves.
#
# Usage: tools/verify_live.sh <expected-version>   e.g. tools/verify_live.sh 1.3.2
# Exit 0 = live site verified; non-zero = live site does NOT match.
#
# Every request carries a cache-busting query string so the GitHub
# Pages CDN cannot serve a stale artifact into the check.

set -eu

EXPECTED_VERSION="${1:?usage: tools/verify_live.sh <expected-version>}"
BASE="${SITE_BASE:-https://bardtek.com}"
BUST="cb=$(date +%s)"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fail() { echo "FAIL: $1" >&2; exit 1; }

echo "Verifying $BASE against local tree ($REPO_ROOT)..."

# 1. Live main.js carries the expected version stamp.
curl -fsS "$BASE/main.js?$BUST" -o "$TMP/main.js"
grep -q "version: \"$EXPECTED_VERSION\"" "$TMP/main.js" \
  || fail "live main.js is not version $EXPECTED_VERSION (got: $(grep -m1 'version:' "$TMP/main.js" || echo none))"

# 2. No flying-owl code anywhere in the live JS/CSS.
curl -fsS "$BASE/styles.css?$BUST" -o "$TMP/styles.css"
if grep -q "flying-owl\|wireFlyingOwl\|owl-flight" "$TMP/main.js" "$TMP/styles.css"; then
  fail "flying-owl code still present in live main.js/styles.css"
fi

# 3. Live text assets are byte-identical to the local tree.
for f in main.js styles.css index.html; do
  curl -fsS "$BASE/$f?$BUST" -o "$TMP/$f"
  cmp -s "$TMP/$f" "$REPO_ROOT/$f" || fail "live $f differs from local $f"
done

# 4. Live images are byte-identical to the local tree.
for f in assets/owl.png assets/favicon.png; do
  curl -fsS "$BASE/$f?$BUST" -o "$TMP/$(basename "$f")"
  cmp -s "$TMP/$(basename "$f")" "$REPO_ROOT/$f" || fail "live $f differs from local $f"
done

echo "PASS: $BASE serves v$EXPECTED_VERSION, no flying owl, all 5 assets byte-identical to local tree."
