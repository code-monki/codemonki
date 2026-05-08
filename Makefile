.PHONY: help install build serve clean deploy

help:
	@echo "Usage:"
	@echo "  make install   Install dependencies"
	@echo "  make build     Build the site to _site/"
	@echo "  make serve     Start local dev server with live reload"
	@echo "  make clean     Remove generated _site/ directory"
	@echo "  make deploy    Push to main branch to trigger GitHub Pages deployment"

install:
	npm ci

build:
	npm run build

serve:
	npm run start

clean:
	rm -rf _site

deploy:
	git push origin main
