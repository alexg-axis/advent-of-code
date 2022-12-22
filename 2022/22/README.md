## --- Day 22: Monkey Map ---

The monkeys take you on a surprisingly easy trail through the jungle. They're even going in roughly the right direction according to your handheld device's Grove Positioning System.

As you walk, the monkeys explain that the grove is protected by a __force field__. To pass through the force field, you have to enter a password; doing so involves tracing a specific __path__ on a strangely-shaped board.

At least, you're pretty sure that's what you have to do; the elephants aren't exactly fluent in monkey.

The monkeys give you notes that they took when they last saw the password entered (your puzzle input).

For example:

```
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
```

The first half of the monkeys' notes is a __map of the board__. It is comprised of a set of __open tiles__ (on which you can move, drawn `.`) and __solid walls__ (tiles which you cannot enter, drawn `#`).

The second half is a description of __the path you must follow__. It consists of alternating numbers and letters:

- A __number__ indicates the __number of tiles to move__ in the direction you are facing. If you run into a wall, you stop moving forward and continue with the next instruction.
- A __letter__ indicates whether to turn 90 degrees __clockwise__ (`R`) or __counterclockwise (_Or "anticlockwise", if you're anti-counterclockwise._)__ (`L`). Turning happens in-place; it does not change your current tile.

So, a path like `10R5` means "go forward 10 tiles, then turn clockwise 90 degrees, then go forward 5 tiles".

You begin the path in the leftmost open tile of the top row of tiles. Initially, you are facing __to the right__ (from the perspective of how the map is drawn).

If a movement instruction would take you off of the map, you __wrap around__ to the other side of the board. In other words, if your next tile is off of the board, you should instead look in the direction opposite of your current facing as far as you can until you find the opposite edge of the board, then reappear there.

For example, if you are at `A` and facing to the right, the tile in front of you is marked `B`; if you are at `C` and facing down, the tile in front of you is marked `D`:

```
        ...#
        .#..
        #...
        ....
...#.D.....#
........#...
B.#....#...A
.....C....#.
        ...#....
        .....#..
        .#......
        ......#.
```

It is possible for the next tile (after wrapping around) to be a __wall__; this still counts as there being a wall in front of you, and so movement stops before you actually wrap to the other side of the board.

By drawing the __last facing you had__ with an arrow on each tile you visit, the full path taken by the above example looks like this:

```
        >>v#    
        .#v.    
        #.v.    
        ..v.    
...#...v..v#    
>>>v...>#.>>    
..#v...#....    
...>>>>v..#.    
        ...#....
        .....#..
        .#......
        ......#.
```

To finish providing the password to this strange input device, you need to determine numbers for your final __row__, __column__, and __facing__ as your final position appears from the perspective of the original map. Rows start from `1` at the top and count downward; columns start from `1` at the left and count rightward. (In the above example, row 1, column 1 refers to the empty space with no tile on it in the top-left corner.) Facing is `0` for right (`>`), `1` for down (`v`), `2` for left (`<`), and `3` for up (`^`). The __final password__ is the sum of 1000 times the row, 4 times the column, and the facing.

In the above example, the final row is `6`, the final column is `8`, and the final facing is `0`. So, the final password is 1000 * 6 + 4 * 8 + 0: `6032`.

Follow the path given in the monkeys' notes. __What is the final password?__

## --- Part Two ---

As you reach the force field, you think you hear some Elves in the distance. Perhaps they've already arrived?

You approach the strange __input device__, but it isn't quite what the monkeys drew in their notes. Instead, you are met with a large __cube__; each of its six faces is a square of 50x50 tiles.

To be fair, the monkeys' map __does__ have six 50x50 regions on it. If you were to __carefully fold the map__, you should be able to shape it into a cube!

In the example above, the six (smaller, 4x4) faces of the cube are:

```
        1111
        1111
        1111
        1111
222233334444
222233334444
222233334444
222233334444
        55556666
        55556666
        55556666
        55556666
```

You still start in the same position and with the same facing as before, but the __wrapping__ rules are different. Now, if you would walk off the board, you instead __proceed around the cube__. From the perspective of the map, this can look a little strange. In the above example, if you are at A and move to the right, you would arrive at B facing down; if you are at C and move down, you would arrive at D facing up:

```
        ...#
        .#..
        #...
        ....
...#.......#
........#..A
..#....#....
.D........#.
        ...#..B.
        .....#..
        .#......
        ..C...#.
```

Walls still block your path, even if they are on a different face of the cube. If you are at E facing up, your movement is blocked by the wall marked by the arrow:

```
        ...#
        .#..
     -->#...
        ....
...#..E....#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.
```

Using the same method of drawing the __last facing you had__ with an arrow on each tile you visit, the full path taken by the above example now looks like this:

```
        >>v#    
        .#v.    
        #.v.    
        ..v.    
...#..^...v#    
.>>>>>^.#.>>    
.^#....#....    
.^........#.    
        ...#..v.
        .....#v.
        .#v<<<<.
        ..v...#.
```

The final password is still calculated from your final position and facing from the perspective of the map. In this example, the final row is `5`, the final column is `7`, and the final facing is `3`, so the final password is 1000 * 5 + 4 * 7 + 3 = `5031`.

Fold the map into a cube, __then__ follow the path given in the monkeys' notes. __What is the final password?__

