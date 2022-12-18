Solving part 2 using Blender. Because why not.

1. Convert the input to a format readable by a voxel application.

I chose Goxel because it supports a plaintext file format. Below is the file for
the example input.

```
# Goxel 0.10.5
# One line per voxel
# X Y Z RRGGBB
-3 0 0 ffffff
-2 0 0 ffffff
-1 0 0 ffffff
-3 1 0 ffffff
-2 1 0 ffffff
-1 1 0 ffffff
-3 0 1 ffffff
-2 0 1 ffffff
-1 0 1 ffffff
-2 1 1 ffffff
-2 0 2 ffffff
-2 -2 0 ffffff
-3 -1 0 ffffff
-2 -1 0 ffffff
-1 -1 0 ffffff
-2 -1 1 ffffff
```

2. Convert the file to a `.ply` (Stanford) file.

This exporter will only keep faces that are visible from outside of the shape.

3. Open the file in Blender.

Import the `.ply` file to Blender and count the number of faces. As all faces
are visible from the outside, the full count is the correct answer.
