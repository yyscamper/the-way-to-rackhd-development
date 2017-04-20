* Graph & Task & BaseTask are all in "Definition" level
* Job is in "Code" level
* Source code of job: on-tasks/tree/master/lib/jobs



Job example:

```javascript
// Copyright 2016, EMC, Inc.

'use strict';

module.exports = conditionJobFactory;
var di = require('di');

di.annotate(conditionJobFactory, new di.Provide('Job.Evaluate.Condition'));
di.annotate(conditionJobFactory, new di.Inject(
    'Job.Base',
    'Util',
    'Logger',
    'Assert'
    )
);

function conditionJobFactory(
        BaseJob,
        util,
        Logger,
        assert
) {
    var logger = Logger.initialize(conditionJobFactory);

     function ConditionJob(options, context, taskId) {
        ConditionJob.super_.call(this, logger, options, context, taskId);
        assert.string(options.when);
    }
    util.inherits(ConditionJob, BaseJob);

    /**
     * @memberOf ConditionJob
     */
    ConditionJob.prototype._run = function run() {
        var when = this.options.when.toLowerCase();
        if( when === 'true' ) {
            return this._done();
        }
        this._done(new Error('condition evaluated to false'));
    };

    return ConditionJob;
}
```



BaseTask example:

```javascript
// Copyright 2016, EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Evaluate Condition',
    injectableName: 'Task.Base.Evaluate.Condition',
    runJob: 'Job.Evaluate.Condition',
    optionsSchema: {
        properties: {
            when: {
                description: 'The condition value that to be evaluated. Only string "true" means condition meets', //jshint ignore: line
                type: 'string'
            }
        },
        required: ['when']
    },
    requiredProperties: {},
    properties: {}
};
```



Task example:

```javascript
// Copyright 2016, EMC, Inc.

'use strict';

module.exports = {
    friendlyName: 'Evaluate Condition',
    injectableName: 'Task.Evaluate.Condition',
    implementsTask: 'Task.Base.Evaluate.Condition',
    options: {},
    properties: {}
};
```









Introduce how to write a simple job.

**Goals:**

\(1\)Understand the general job code structure

**Practice:**

\(1\)Write a job to calculate the Fibonacci number

-The job should support an option “iterations”:

ØIf 0&lt; iterations &lt;= 100, the job should success and then print the result into console.

ØOtherwise, the job should fail.

-You need to compose the baseTask, Task, and graph.

-We will provide the unit-test for this job, you need to make sure your code pass the unit-test.

-\(Nice-to-Have\) Create a schema and make sure the “iterations” is a number and should be &lt;=100.



To help test, you could simply store the result into `context.fibonacciResult`

