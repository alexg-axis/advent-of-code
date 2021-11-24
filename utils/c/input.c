#include <libgen.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

input_t read_input_impl(char *main_file) {
  char *directory = dirname(main_file);

  size_t directory_length = strlen(directory);

  // Room for the directory, a slash, input.txt and a null byte
  size_t path_length = path_length + 1 + 9 + 1;
  char *input_path = (char *)malloc(path_length);
  if (input_path == NULL) {
    return NULL;
  }
  strncpy(input_path, directory, path_length);
  strncpy(input_path + directory_length, "/input.txt", path_length);
  input_path[path_length - 1] = 0;

  FILE *file = fopen(input_path, "r");
  fseek(file, 0, SEEK_END);
  size_t file_size = ftell(file);
  fseek(file, 0, SEEK_SET);

  char *input = malloc(file_size + 1);
  fread(input, sizeof(char), file_size, file);
  fclose(file);
  input[file_size] = 0;

  return (input_t)input;
}
