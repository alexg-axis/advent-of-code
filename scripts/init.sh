#!/usr/bin/env bash

set -e

year="${AOC_YEAR:-$(date +%Y)}"
month="${AOC_MONTH:-$(date +%m)}"
day="${AOC_DAY:-$(date +%-d)}"
padded_day="0$day"
padded_day="${padded_day: -2}"

if [[ ! "$month" -eq 12 ]]; then
  echo "It's not december quite yet. If you wish to access previous events"
  echo "specify AOC_YEAR, AOC_MONTH and AOC_DAY"
  exit 1
fi

mkdir -p "$year/$padded_day"

export PATH="/usr/local/opt/python@3.10/bin:$PATH"
session_cookie="$(security find-generic-password -w -a "com.adventofcode.SessionCookie")"
curl --silent --cookie "session=$session_cookie" "https://adventofcode.com/$year/day/$day" | ./scripts/html2md.py >"$year/$padded_day/README.md"
curl --silent --cookie "session=$session_cookie" "https://adventofcode.com/$year/day/$day/input" >"$year/$padded_day/input.txt"

echo "$day/12 $year initialized successfully in ./$year/$padded_day" >&2
