BIN=node_modules/.bin

help:
	@echo
	@echo "  \033[34mdev\033[0m   – runs compiler and starts app"
	@echo "  \033[34mstart\033[0m – simply runs the app"
	@echo

dev:
	@$(BIN)/node-sass web/styles/style.scss -o assets
	@$(BIN)/node-sass -w web/styles/style.scss -o assets \
		& make start

start:
	@$(BIN)/electron main/index

.PHONY: dev start help