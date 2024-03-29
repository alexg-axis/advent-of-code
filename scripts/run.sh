#!/usr/bin/env bash

set -e

export PATH="/usr/local/opt/python@3.10/bin:$PATH"

year="${AOC_YEAR:-$(date +%Y)}"
month="${AOC_MONTH:-$(date +%m)}"
day="${AOC_DAY:-$(date +%-02d)}"

if [[ ! "$month" -eq 12 ]]; then
  echo "It's not december quite yet. If you wish to run a previous puzzle"
  echo "specify AOC_YEAR, AOC_MONTH and AOC_DAY"
  exit 1
fi

if [[ ! -d "$year/$day" ]]; then
  echo "Cannot find a puzzle in $year/$day. Have you forgot to initialize it?"
  exit 1
fi

main_files="$(find "$year/$day" -maxdepth 1 -iname "main*")"
for file in $main_files; do
  name="$(basename "$file")"
  directory="$(dirname "$file")"
  case "${name##*.}" in
  "go")
    go run "$file"
    ;;
  "ts")
    NO_COLOR=1 deno run --quiet --allow-read --allow-write --allow-hrtime "$file"
    ;;
  "py")
    export PYTHONPATH="$PWD/utils/python/:$PYTHONPATH"
    python3 "$file"
    ;;
  "c")
    out="$(mktemp --suffix=.main)"
    gcc -o "$out" "$directory/"*.c utils/c/*.c && "$out"
    ;;
  *)
    echo "unsupported $file"
    ;;
  esac
done
