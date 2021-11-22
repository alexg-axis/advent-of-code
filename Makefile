.PHONY: login init

# login to advent of code using a session cookie
login:
	./scripts/login.sh

# initialize today's puzzle
init:
	./scripts/init.sh
