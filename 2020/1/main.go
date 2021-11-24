package main

import (
	"fmt"

	"github.com/alexg-axis/advent-of-code/utils/go/parsing"
)

func main() {
	input, err := parsing.ReadInput()
	if err != nil {
		panic(err)
	}

	numbers, err := input.Ints()
	if err != nil {
		panic(err)
	}

	fmt.Println(solve(numbers))
}

func solve(numbers []int) int {
	for i, a := range numbers {
		for j, b := range numbers {
			if i != j && a+b == 2020 {
				return a * b
			}
		}
	}
	return -1
}
