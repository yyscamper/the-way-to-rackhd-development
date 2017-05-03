
---

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

## Typical Unit Testing Example

* A standalone module: [https://github.com/RackHD/on-core/blob/master/spec/lib/common/encryption-spec.js](https://github.com/RackHD/on-core/blob/master/spec/lib/common/encryption-spec.js)
* parser: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/utils/job-utils/command-parser-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/utils/job-utils/command-parser-spec.js)
* job: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/jobs/install-os-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/jobs/install-os-spec.js)
* task definition: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/tasks/analyze-esx-repo-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/tasks/analyze-esx-repo-spec.js)
* graph definition: [https://github.com/RackHD/on-taskgraph/blob/master/spec/lib/graphs/install-centos-graph-spec.js](https://github.com/RackHD/on-taskgraph/blob/master/spec/lib/graphs/install-centos-graph-spec.js)
* task schema: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/get-catalog-values-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/get-catalog-values-spec.js)
* http API: [https://github.com/RackHD/on-http/blob/master/spec/lib/api/2.0/hooks-spec.js](https://github.com/RackHD/on-http/blob/master/spec/lib/api/2.0/hooks-spec.js)
* database model: [https://github.com/RackHD/on-core/blob/master/spec/lib/models/node-spec.js](https://github.com/RackHD/on-core/blob/master/spec/lib/models/node-spec.js)
* builtin script: [https://github.com/RackHD/on-http/blob/master/spec/data/templates/get\_driveid-spec.js](https://github.com/RackHD/on-http/blob/master/spec/data/templates/get_driveid-spec.js)
* grpc style code: 

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

* Modules injection

  * `helper.js` has helped to inject all on-core modules
  * the `helper.js` in on-http has helped to injecto all api related modules 
  * other modules need you inject it manually

* Replace the whole of a di module

```javascript
var waterline = {};
helper.setupInjector([
    helper.di.simpleWrapper(waterline, 'Services.Waterline');
]);

//Then feel free to add function for any function for the mocked objects
waterline.nodes = {
    updateByIdentifier: sinon.stub().resolves(),
    needByIdentifier: sinon.stub().resolves()
};
```

* spy a function of di module.

```javascript
var progressService = helper.injector.get('Services.GraphProgress');
sinon.spy(progressService, 'publishTaskProgress');
```

## Unit Testing Coverage

* Coverall: [https://coveralls.io/builds/11266957/source?filename=lib%2Futils%2Fjob-utils%2Fipmi-parser.js](https://coveralls.io/builds/11266957/source?filename=lib%2Futils%2Fjob-utils%2Fipmi-parser.js)
* Coverage types

  * file coverage

  * function coverage

  * line coverage

```js
function max(x, y) {
    return x > y ? x : y;
}

max(1, 2);
```

* branch coverage

```js
function max(x, y) {
    return x > y ? x : y;
}

max(1, 2)
max(2, 1)
```

* path coverage

```javascript
function max(a, b, c, d) {
    let x = a > b ? a : b;
    let y = c > d ? c : d;
    return x > y ? x : y
}

max(1, 2, 3, 4);
max(4, 3, 2, 1);
```

## Misc

* Random testing order
* timeout control
* Which level to inject stub

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

