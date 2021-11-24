#include <stdio.h>
#include <stdlib.h>

#include "../../utils/c/input.h"

int main(int argc, char **argv) {
  input_t input = read_input();
  if (input == NULL) {
    return EXIT_FAILURE;
  }

  printf("%s\n", input);
  free(input);
  return EXIT_SUCCESS;
}
