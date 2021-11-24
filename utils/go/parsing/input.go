package parsing

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
)

// Input represents a puzzle's input.
type Input string

// ReadInput reads the input for a puzzle. Must be called from a file in the same
// directory as the `input.txt` file.
func ReadInput() (Input, error) {
	// Assume that the caller is from a file in the same directory as the input
	_, filename, _, ok := runtime.Caller(1)
	if !ok {
		return "", fmt.Errorf("unknown caller")
	}

	path := filepath.Dir(filename)
	data, err := ioutil.ReadFile(filepath.Join(path, "input.txt"))
	if err != nil {
		return "", err
	}

	return Input(data), nil
}

// Lines returns the lines of the input. Trims trailing newlines.
func (input Input) Lines() []string {
	return strings.Split(strings.TrimSuffix(string(input), "\n"), "\n")
}

// Ints returns the integers found in the input - one integer per line.
func (input Input) Ints() ([]int, error) {
	lines := input.Lines()
	values := make([]int, len(lines))

	for i, line := range lines {
		value, err := strconv.ParseInt(line, 10, 32)
		if err != nil {
			return nil, fmt.Errorf("unable to parse input as ints - %w", err)
		}
		values[i] = int(value)
	}

	return values, nil
}
