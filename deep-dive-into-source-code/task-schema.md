## What's Options Schema

Refer to: [http://rackhd.readthedocs.io/en/latest/rackhd/tasks.html\#options-schema](http://rackhd.readthedocs.io/en/latest/rackhd/tasks.html#options-schema)

## What's JSON Schema

Refer to: [https://spacetelescope.github.io/understanding-json-schema/   ](https://spacetelescope.github.io/understanding-json-schema/)[http://json-schema.org/](http://json-schema.org/)

## Common/Job/Task Specific Schemas

* Common Schema: The schema that shared by all tasks
* Job Schema: The schema that describes the job's options
* Task Specific Schema: The schema that describes the extended options in task definitions

## Direct Schema & File Referernce Schema

## Upfront Validation

## Task Annotation

Refere to: [http://rackhd.readthedocs.io/en/latest/rackhd/tasks.html\#task-annotation](http://rackhd.readthedocs.io/en/latest/rackhd/tasks.html#task-annotation)

## JSON Schema Validator

* Ajv: [https://github.com/epoberezkin/ajv](https://github.com/epoberezkin/ajv)

Performance comparision: [https://github.com/ebdrup/json-schema-benchmark](https://github.com/ebdrup/json-schema-benchmark)

![](/assets/json-schema-validatior-performance-comparision.png)

* RackHD JSON Schema Validator: [https://github.com/RackHD/on-core/blob/master/lib/common/json-schema-validator.js](https://github.com/RackHD/on-core/blob/master/lib/common/json-schema-validator.js)
* Task Options Validator: [https://github.com/RackHD/on-tasks/blob/master/lib/utils/task-option-validator.js](https://github.com/RackHD/on-tasks/blob/master/lib/utils/task-option-validator.js)

## Source Code for Options Schema Validation

* Call entry in TaskGraph.create:

  * [https://github.com/RackHD/on-tasks/blob/master/lib/task-graph.js\#L603](https://github.com/RackHD/on-tasks/blob/master/lib/task-graph.js#L603)
  * [https://github.com/RackHD/on-tasks/blob/master/lib/task-graph.js\#L333](https://github.com/RackHD/on-tasks/blob/master/lib/task-graph.js#L333)

* Major validation logic is implemented in Task [https://github.com/RackHD/on-tasks/blob/master/lib/task.js\#L621](https://github.com/RackHD/on-tasks/blob/master/lib/task.js#L621)

## Unit Testing for Options Schema

* The structure of typical options schema unit-testing: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/generate-tag-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/generate-tag-spec.js)
* Complex schema unit-testing: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/install-centos-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/schemas/install-centos-spec.js)
* Validate default options: [https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/tasks/base-tasks-spec.js\#L99](https://github.com/RackHD/on-tasks/blob/master/spec/lib/task-data/tasks/base-tasks-spec.js#L99)



