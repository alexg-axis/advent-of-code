# Advent of Code

My solutions for [Advent of Code](https://adventofcode.com).

## Structure

```sh
.
├── Makefile        # support scripts
├── README.md
└── scripts         # support scripts
│   ├── html2md.py  # convert a subsert of HTML to markdown
│   ├── init.sh     # initialize a puzzle
│   └── login.sh    # login to advent of code
└── 20xx            # a year of puzzles
    ├── 1
    ├── ...
    └── 25          # description, input and solution for each puzzle
```

## Using the structure for yourself

The structure is generic enough, but built for macOS (although that specific logic can easily be exchanged).

1. Copy the `scripts` directory and `Makefile` to a separate directory.
2. To login using a session cookie from the Advent of Code website, run `make login`
3. To initialize today's puzzle run `make init`
   * To initialize a specific puzzle, run `AOC_YEAR=2020 AOC_MONTH=12 AOC_DAY=24 make init`
4. To run today's puzzle run `make run`
    * To run a specific puzzle, run `AOC_YEAR=2020 AOC_MONTH=12 AOC_DAY=24 make run`

An example using multiple languages can be found in `2020/1`.
