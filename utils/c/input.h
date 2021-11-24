#ifndef __INPUT_H__
#define __INPUT_H__

#include <stdlib.h>

typedef char* input_t;

#define read_input() read_input_impl(__FILE__)

input_t read_input_impl(char *main_file);

#endif
