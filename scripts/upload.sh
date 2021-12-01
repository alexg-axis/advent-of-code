#!/usr/bin/env bash

set -e

year="${AOC_YEAR:-$(date +%Y)}"
month="${AOC_MONTH:-$(date +%m)}"
day="${AOC_DAY:-$(date +%-d)}"

if [[ ! "$month" -eq 12 ]]; then
  echo "It's not december quite yet. If you wish to access previous events"
  echo "specify AOC_YEAR, AOC_MONTH and AOC_DAY"
  exit 1
fi

session_cookie="$(security find-generic-password -w -a "com.adventofcode.SessionCookie")"

# One line per solution. If there are more, there are multiple solutions - ignore all but the first two
solutions="$(./scripts/run.sh | head -n 2 | xargs)"

part=1
correct=0
for solution in $solutions; do
  output="$(curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H "Referer: https://adventofcode.com/$year/day/$day" --data "level=$part&answer=$solution" --silent --cookie "session=$session_cookie" "https://adventofcode.com/$year/day/$day/answer")"
  correct="$(echo "$output" | grep -c "That's the right answer" || true)"
  incorrect="$(echo "$output" | grep -c "That's not the right answer" || true)"
  already_solved="$(echo "$output" | grep -c "You don't seem to be solving the right level" || true)"
  if [[ "$correct" -eq 1 ]] || [[ "$already_solved" -eq 1 ]]; then
    echo "✅ solution $part"
    correct=$((correct+1))
  elif [[ "$incorrect" -eq 1 ]]; then
    echo "❌ solution $part"
  else
    echo "⚠️ solution $part"
    echo "------------"
    echo "$output"
    echo "------------"
  fi
  part=$((part+1))
done

echo ""
if [[ "$correct" -eq 1 ]]; then
  echo -e "Well done! Make sure to run \033[1mmake init\033[0m again to get the second part of the puzzle"
elif [[ "$correct" -gt 1 ]]; then
  echo -e "Well done! That's all for today"
fi
