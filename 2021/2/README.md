## --- Day 2: Dive! ---

Now, you need to figure out how to pilot this thing.

It seems like the submarine can take a series of commands like `forward 1`, `down 2`, or `up 3`:

`forward X``X``down X`__increases__`X``up X`__decreases__`X`Note that since you're on a submarine, `down` and `up` affect your __depth__, and so they have the opposite result of what you might expect.

The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:

```
forward 5
down 5
forward 8
up 3
down 8
forward 2
```

Your horizontal position and depth both start at `0`. The steps above would then modify them as follows:

`forward 5``5``5``down 5``5``5``forward 8``8``13``up 3``3``2``down 8``8``10``forward 2``2``15`After following these instructions, you would have a horizontal position of `15` and a depth of `10`. (Multiplying these together produces `150`.)

Calculate the horizontal position and depth you would have after following the planned course. __What do you get if you multiply your final horizontal position by your final depth?__
