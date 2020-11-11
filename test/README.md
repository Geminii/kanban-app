# Unit testing
* [VUE TEST UTILS](https://vue-test-utils.vuejs.org/) is the official unit testing utility library for Vue.js.
* [JEST](https://jestjs.io/en/) is a delightful JavaScript Testing Framework with a focus on simplicity.

## Run all unit tests
``` bash
$ yarn test:unit
```

## Run a specific unit test
``` bash
# Using global jest command to execute test for header component
$ jest --verbose --no-cache --runTestsByPath #ABSOLUTE_PATH#/tests/components/molecules/Input.spec.js

# Using jest command through node_modules to execute test for header component
./node_modules/jest/bin/jest.js --verbose --no-cache --runTestsByPath #ABSOLUTE_PATH#/test/components/common/header.spec.js
```


