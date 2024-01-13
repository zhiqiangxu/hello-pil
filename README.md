# Introduction

A run of the [`mfibonacci_sm`](https://docs.polygon.technology/zkEVM/concepts/mfibonacci/pil-stark-demo/#pil-stark-implementation-guide) example.

# Run

```bash
npm install
node mfib_gen_and_prove.js
```

# Steps to reproduce

```bash
mkdir mfibonacci_sm
cd mfibonacci_sm
npm init -y
npm install pil-stark yargs chai

# create these 5 files:
#  1. mfibonacci.pil
#  2. mfib.starkstruct.json
#  3. mfib.input.json
#  4. executor_mfibonacci.js
#  5. mfib_gen_and_prove.js

# In package.json, change the version of chai to be the same of that of pil-stark.
# otherwise you may encounter errors like `ERR_REQUIRE_ESM`.