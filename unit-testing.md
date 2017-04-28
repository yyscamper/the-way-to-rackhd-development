## What's Unit Testing

An unit test is a piece of code written by a developer that exercises a very  
 small, specific area of functionality of the code being tested.

* An unit could be a module or more commonly a function or procedure, a class or an
* interface.
* White-box testing.
* Each test case is independent from others.
* Written by developer, not by QA engineer.
* Released into code repository.
* Ideally all unit tests should pass before merging to repository.

## Benefits

* Dramatically decrease the number of defects in the code
* Find problem early
* Reduce the cost of change
* Allow refactoring
* A living documentation
* Assist in develop code debugging

## Limites

* It will not catch following errors:
  * Integration errors
  * Broader system-level errors
  * Across multiple unites errors
  * Non-functional test, like performance
* Not run in real deployment environment
* Usually more test code than real code
* Sometimes difficult to test, like multi-thread

## RackHD Unit Testing Code Architecture

* All unit testing code in “spec” folder
* “spec” folder has same structure with source
* Unit testing file must be end with “-spec”
* Unit testing file and the target file has same file name except “-spec” suffix.
* spec/helper.js wraps all common functions/objects that shared by all unit-testing.

![](/assets/rackhd-ut-code-arch.png)

## Run Unit Testing

* npm test
* ./HWMIO-TEST
* TravisCI: [https://travis-ci.org/RackHD/on-tasks/jobs/226356050](https://travis-ci.org/RackHD/on-tasks/jobs/226356050)

## Unit Testing Technical Stack

* Test framework: Mocha
* Test style: BDD
* Assertion library: Chai
* Spy/Mock library: Sinon
* HTTP test library: supertest/nock
* Private function test: rewire
* Test coverage: istanbul/coveralls
* Unit test CI: TravisCI/Jenkins

## spec/helper.js

* Shared by all tests
* Load first before running test cases
* Set up testing environemnt
* A lot helper functions for unit testing
* Example
  * on-core: [https://github.com/RackHD/on-core/blob/master/spec/helper.js](https://github.com/RackHD/on-core/blob/master/spec/helper.js)
  * on-tasks: [https://github.com/RackHD/on-tasks/blob/master/spec/helper.js](https://github.com/RackHD/on-tasks/blob/master/spec/helper.js)
  * on-http: [https://github.com/RackHD/on-http/blob/master/spec/helper.js](https://github.com/RackHD/on-http/blob/master/spec/helper.js)



## Dependency Injection in Unit Testing

* stub all di module
* stub a function of di module.

## Unit Testing Coverage

* Coverall: [https://coveralls.io/builds/11266957/source?filename=lib%2Futils%2Fjob-utils%2Fipmi-parser.js](https://coveralls.io/builds/11266957/source?filename=lib%2Futils%2Fjob-utils%2Fipmi-parser.js)

---

Introduce the framework and tool sets of RackHD unit-testing.

**Goals:**

\(1\)Understand the mocha framework.

\(2\)Understand the usual libraries: chai, sinon, supertest

\(3\)Understand how to run the unit-test.

\(4\)Understand how to measure the test coverage.

\(5\)Understand how to unit-test a Promise

\(6\)Understand how to handle di in unit-test.

\(7\)Understand the best practice of unit-test.

\(8\)Understand the common mistakes and avoid it.

**Practice:**

\(1\)Find a source file that doesn’t have the unit-test, then replenish it.

**Extends:**

\(1\)Read the source code chai, sinon.

