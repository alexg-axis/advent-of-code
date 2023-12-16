## --- Day 16: The Floor Will Be Lava ---

With the beam of light completely focused __somewhere__, the reindeer leads you deeper still into the Lava Production Facility. At some point, you realize that the steel facility walls have been replaced with cave, and the doorways are just cave, and the floor is cave, and you're pretty sure this is actually just a giant cave.

Finally, as you approach what must be the heart of the mountain, you see a bright light in a cavern up ahead. There, you discover that the beam (_Not anymore, there's a blanket!_) of light you so carefully focused is emerging from the cavern wall closest to the facility and pouring all of its energy into a contraption on the opposite side.

Upon closer inspection, the contraption appears to be a flat, two-dimensional square grid containing __empty space__ (`.`), __mirrors__ (`/` and `\`), and __splitters__ (`|` and `-`).

The contraption is aligned so that most of the beam bounces around the grid, but each tile on the grid converts some of the beam's light into __heat__ to melt the rock in the cavern.

You note the layout of the contraption (your puzzle input). For example:

```
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
```

The beam enters in the top-left corner from the left and heading to the __right__. Then, its behavior depends on what it encounters as it moves:

- If the beam encounters __empty space__ (`.`), it continues in the same direction.
- If the beam encounters a __mirror__ (`/` or `\`), the beam is __reflected__ 90 degrees depending on the angle of the mirror. For instance, a rightward-moving beam that encounters a `/` mirror would continue __upward__ in the mirror's column, while a rightward-moving beam that encounters a `\` mirror would continue __downward__ from the mirror's column.
- If the beam encounters the __pointy end of a splitter__ (`|` or `-`), the beam passes through the splitter as if the splitter were __empty space__. For instance, a rightward-moving beam that encounters a `-` splitter would continue in the same direction.
- If the beam encounters the __flat side of a splitter__ (`|` or `-`), the beam is __split into two beams__ going in each of the two directions the splitter's pointy ends are pointing. For instance, a rightward-moving beam that encounters a `|` splitter would split into two beams: one that continues __upward__ from the splitter's column and one that continues __downward__ from the splitter's column.

Beams do not interact with other beams; a tile can have many beams passing through it at the same time. A tile is __energized__ if that tile has at least one beam pass through it, reflect in it, or split in it.

In the above example, here is how the beam of light bounces around the contraption:

```
>|<<<\....
|v-.\^....
.v...|->>>
.v...v^.|.
.v...v^...
.v...v^..\
.v../2\\..
<->-/vv|..
.|<<<2-|.\
.v//.|.v..
```

Beams are only shown on empty tiles; arrows indicate the direction of the beams. If a tile contains beams moving in multiple directions, the number of distinct directions is shown instead. Here is the same diagram but instead only showing whether a tile is __energized__ (`#`) or not (`.`):

```
######....
.#...#....
.#...#####
.#...##...
.#...##...
.#...##...
.#..####..
########..
.#######..
.#...#.#..
```

Ultimately, in this example, `46` tiles become __energized__.

The light isn't energizing enough tiles to produce lava; to debug the contraption, you need to start by analyzing the current situation. With the beam starting in the top-left heading right, __how many tiles end up being energized?__

