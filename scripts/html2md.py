#!/usr/bin/env python3

# Converts a subset of HTML to markdown.
# Reads from stdin, writes to stdout.
# Requires Python 3.10.

from sys import stdin
from html.parser import HTMLParser
from typing import TypeAlias

HTMLAttributes: TypeAlias = list[tuple[str, str | None]]

def attr(attrs: HTMLAttributes, needle: str) -> str | None:
  for key, value in attrs:
    if key == needle:
      return value
  return None

class CustomParser(HTMLParser):
  def __init__(self, *, convert_charrefs: bool = ...) -> None:
      super().__init__(convert_charrefs=convert_charrefs)

      # Tag stack
      self.tags: list[tuple[str, HTMLAttributes]] = []
      # Whether or not we're inside the main article
      self.is_in_article = False

  def handle_starttag(self, tag: str, attrs: HTMLAttributes) -> None:
      self.tags.append((tag, attrs))
      if attr(attrs, "class") == "day-desc":
        self.is_in_article = True

      if not self.is_in_article:
        return

      if tag == "em" and not self.is_in_tag("code"):
        print("__", end="")
      elif tag == "code":
        if self.is_in_tag("pre"):
          print("```")
        else:
          print("`", end="")

  def handle_endtag(self, tag: str) -> None:
      self.tags.pop()

      # Naively believe only one article exists
      if tag == "article":
        self.is_in_article = False

      if not self.is_in_article:
        return

      if tag == "p":
        print("\n")
      elif tag == "em" and not self.is_in_tag("code"):
        print("__", end="")
      elif tag == "code":
        if self.is_in_tag("pre"):
          print("```\n")
        else:
          print("`", end="")

  @property
  def current_tag(self) -> tuple[str, HTMLAttributes] | None:
    if len(self.tags) == 0:
      return None
    return self.tags[len(self.tags) - 1]

  def is_in_tag(self, tag: str) -> bool:
    for parent_tag, _ in self.tags:
      if parent_tag == tag:
        return True
    return False

  def handle_data(self, data: str) -> None:
    if self.is_in_article == False or self.current_tag is None:
      return

    tag, attrs = self.current_tag
    if tag == "h2":
      print(f"## {data}\n")
    elif tag == "a":
      href = attr(attrs, "href")
      if href is not None:
        print(f"[{data}]({href})", end="")
    elif tag == "p":
      print(data, end="")
    elif tag == "em":
        print(data, end="")
    elif tag == "code":
      print(data, end="")
    elif tag == "span":
      print(data, end="")

def main():
  parser = CustomParser()
  for line in stdin.readlines():
    parser.feed(line)

if __name__ == "__main__":
  main()
