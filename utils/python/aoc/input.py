import sys
from os import path

class Input:
  """Puzzle input."""

  def __init__(self, raw: str) -> None:
    self.__raw = raw

  @property
  def raw(self) -> str:
    """Raw input."""
    return self.__raw

  @property
  def lines(self) -> list[str]:
    """Lines of the input. Strips whitespace."""
    return self.__raw.strip().splitlines()

  @property
  def ints(self) -> list[int]:
    """Ints found in the input, one int per line."""
    return [int(x) for x in self.lines]

input = Input("")

directory = path.dirname(path.abspath(sys.modules["__main__"].__file__ or ""))
with open(path.join(directory, "input.txt"), "r") as file:
  input = Input(file.read())
