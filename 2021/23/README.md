## --- Day 23: Amphipod ---

A group of [amphipods](https://en.wikipedia.org/wiki/Amphipoda) notice your fancy submarine and flag you down. "With such an impressive shell," one amphipod says, "surely you can help us with a question that has stumped our best scientists."

They go on to explain that a group of timid, stubborn amphipods live in a nearby burrow. Four types of amphipods live there: __Amber__ (`A`), __Bronze__ (`B`), __Copper__ (`C`), and __Desert__ (`D`). They live in a burrow that consists of a __hallway__ and four __side rooms__. The side rooms are initially full of amphipods, and the hallway is initially empty.

They give you a __diagram of the situation__ (your puzzle input), including locations of each amphipod (`A`, `B`, `C`, or `D`, each of which is occupying an otherwise open space), walls (`#`), and open space (`.`).

For example:

```
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
```

The amphipods would like a method to organize every amphipod into side rooms so that each side room contains one type of amphipod and the types are sorted `A`-`D` going left to right, like this:

```
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
```

Amphipods can move up, down, left, or right so long as they are moving into an unoccupied open space. Each type of amphipod requires a different amount of __energy__ to move one step: Amber amphipods require `1` energy per step, Bronze amphipods require `10` energy, Copper amphipods require `100`, and Desert ones require `1000`. The amphipods would like you to find a way to organize the amphipods that requires the __least total energy__.

However, because they are timid and stubborn, the amphipods have some extra rules:

- Amphipods will never __stop on the space immediately outside any room__. They can move into that space so long as they immediately continue moving. (Specifically, this refers to the four open spaces in the hallway that are directly above an amphipod starting position.)
- Amphipods will never __move from the hallway into a room__ unless that room is their destination room __and__ that room contains no amphipods which do not also have that room as their own destination. If an amphipod's starting room is not its destination room, it can stay in that room until it leaves the room. (For example, an Amber amphipod will not move from the hallway into the right three rooms, and will only move into the leftmost room if that room is empty or if it only contains other Amber amphipods.)
- Once an amphipod stops moving in the hallway, __it will stay in that spot until it can move into a room__. (That is, once any amphipod starts moving, any other amphipods currently in the hallway are locked in place and will not move again until they can move fully into a room.)

In the above example, the amphipods can be organized using a minimum of `12521` energy. One way to do this is shown below.

Starting configuration:

```
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
```

One Bronze amphipod moves into the hallway, taking 4 steps and using `40` energy:

```
#############
#...B.......#
###B#C#.#D###
  #A#D#C#A#
  #########
```

The only Copper amphipod not in its side room moves there, taking 4 steps and using `400` energy:

```
#############
#...B.......#
###B#.#C#D###
  #A#D#C#A#
  #########
```

A Desert amphipod moves out of the way, taking 3 steps and using `3000` energy, and then the Bronze amphipod takes its place, taking 3 steps and using `30` energy:

```
#############
#.....D.....#
###B#.#C#D###
  #A#B#C#A#
  #########
```

The leftmost Bronze amphipod moves to its room using `40` energy:

```
#############
#.....D.....#
###.#B#C#D###
  #A#B#C#A#
  #########
```

Both amphipods in the rightmost room move into the hallway, using `2003` energy in total:

```
#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########
```

Both Desert amphipods move into the rightmost room using `7000` energy:

```
#############
#.........A.#
###.#B#C#D###
  #A#B#C#D#
  #########
```

Finally, the last Amber amphipod moves into its room, using `8` energy:

```
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
```

__What is the least energy required to organize the amphipods?__
