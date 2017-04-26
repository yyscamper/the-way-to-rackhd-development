## What's Task/Workflow

* Task is the declarative representation of job
* Workflow is the minimum executable unit in user level, it is the declarative composition of tasks.
* Definition vs. Instance
* RackHD supports customize Task and Workflow.
* Only one active workflow is allowed for a node.

![](/assets/workflow-task-basetask-job-number-relations.png)

## Linkage

![](/assets/graph-task-basetask-job-linkage.png)

## Graph Definition

```js
{
    "friendlyName": "Install CentOS",
    "injectableName": "Graph.InstallCentOS",
    "options": {
        "defaults": {
            "repo": "{{api.server}}/centos/{{options.version}}/os/x86_64",
            "version": null
        }
    },
    "tasks": [
        {
            "ignoreFailure": true,
            "label": "set-boot-pxe",
            "taskName": "Task.Obm.Node.PxeBoot"
        },
        {
            "label": "reboot",
            "taskName": "Task.Obm.Node.Reboot",
            "waitOn": {
                "set-boot-pxe": "finished"
            }
        },
        {
            "label": "install-os",
            "taskName": "Task.Os.Install.CentOS",
            "waitOn": {
                "reboot": "succeeded"
            }
        }
    ]
}
```

## Task Definition

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

Or:

```js
{
    "friendlyName": "Catalog lsall",
    "implementsTask": "Task.Base.Linux.Catalog",
    "injectableName": "Task.Catalog.lsall",
    "options": {
        "commands": [
            "sudo lspci -nn -vmm",
            "sudo lshw -json",
            "sudo lsblk -o KNAME,TYPE,ROTA; echo BREAK; sudo lsscsi --size"
        ]
    },
    "properties": {
        "catalog": {
            "type": "lsall"
        }
    }
}
```

* friendlyName
* injectableName
* implementsTask
* options
* properties

## Task Template Options

RackHD designs some template options, so you don't need to hardcode it:

```js
{
    "options": {
        "defaults": {
            "version": "6.5",
            "repo": "http://{{api.server}}/centos/{{options.version}}",
        },
        "install-os": {
            "rootPassword": "123456789",
            "hostname": "rackhd-machine",
            "dnsServers": [ "192.168.1.3", "10.0.2.1"]
        },
        "pxe-reboot": {
            "obmServiceName": "ipmi-obm-service"
        }
    }
}
```

Refer [http://rackhd.readthedocs.io/en/latest/rackhd/index.html\#task-templates](http://rackhd.readthedocs.io/en/latest/rackhd/index.html#task-templates) for details.

## BaseTask Definition

```javascript
'use strict';

module.exports = {
    friendlyName: 'Evaluate Condition',
    injectableName: 'Task.Base.Evaluate.Condition',
    runJob: 'Job.Evaluate.Condition',
    optionsSchema: {
        properties: {
            when: {
                description: 'The condition value that to be evaluated. Only string "true" means condition meets',
                type: 'string'
            }
        },
        required: ['when']
    },
    requiredProperties: {},
    properties: {}
};
```

or:

```js
{
  "friendlyName": "Evaluate Condition",
  "injectableName": "Task.Base.Evaluate.Condition",
  "runJob": "Job.Evaluate.Condition",
  "optionsSchema": {
    "properties": {
      "when": {
        "description": "The condition value that to be evaluated. Only string \"true\" means condition meets",
        "type": "string"
      }
    },
    "required": [
      "when"
    ]
  },
  "requiredProperties": {},
  "properties": {}
}
```

## Job

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

## Task Schema

## Task Documentation



# Exercise

\(1\) In mathematics, the Fibonacci numbers are the numbers in the following integer sequence, called the Fibonacci sequence, and characterized by the fact that every number after the first two is the sum of the two preceding ones:

**1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...**

Please write a RackHD job to calculate the Fibonacci number for given `seqIndex` and store the result into `context.fibonacciResult`:

* If `seqIndex=1`, `context.fibonacciResult=1;`If `seqIndex=2`, `context.fibonacciResult=1;`If `seqIndex=3`, `context.fibonacciResult=2; ...`
* If `seqIndex<=0` or `seqIndex > 50`, The job should fail with `RangeError.`
* If `seqIndex` is not a number or not specified, The job should fail with `TypeError`.
* If `seqIndex` is folat number, then use its integer parts. For example, `seqIndex=5.2` will get same result with `seqIndex=5`
* The unit-test file has been provided, you should ensure your job pass the unit-test.
* You should create the BaseTask and Task defintion for the fibonacci job.
* Please construct a graph definition using the new fibonacci job, and make sure you job is executed after trigger the new workflow.



