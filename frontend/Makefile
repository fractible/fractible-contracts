#This Makefile is only generated once, you can edit it at will.
include Makefile.generated
PREFIX_PATH=`pwd`
db?=tmp
OCAML_SOURCES=${PREFIX_PATH}/src/ocaml_sdk
OCAML_SCENARIOS=${PREFIX_PATH}/src/ocaml_scenarios

TS_SOURCES=${PREFIX_PATH}/src/ts-sdk/src
SCRIPTS=./scripts

all: ocaml ts

run_scenario_ocaml: ocaml
	dune exec ./src/ocaml_scenarios/scenario.exe

ocaml:
	dune build

_opam:
	opam switch create . 4.13.1 --no-install

deps:
	@opam install . --deps-only -y

format-ocaml:
	@for f in $(shell ls ${OCAML_SOURCES}/*.ml); do ocamlformat -i $${f}; done
	@for f in $(shell ls ${OCAML_SCENARIOS}/*.ml); do ocamlformat -i $${f}; done
	

format-ts:
	@for f in $(shell ls ${TS_SOURCES}/*.ts); do tsfmt $${f} -r; done


ts-deps:
	@npm i --location=global typescript
	@npm i --location=global typescript-formatter
	@npm --prefix src/ts-sdk --no-audit --no-fund i @taquito/signer hacl-wasm

ts:
	@tsc -p src/ts-sdk/tsconfig.json

node-deps:
	@cd src/ts-sdk/ && npm install .

web:
	@npm --prefix src/ts-sdk run dev
 