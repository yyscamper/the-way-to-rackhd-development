// Copyright 2016, EMC, Inc.

'use strict';

module.exports = conditionJobFactory;
var di = require('di');

di.annotate(conditionJobFactory, new di.Provide('Job.Fibonacci'));
di.annotate(conditionJobFactory, new di.Inject(
    'Job.Base',
    'Util',
    'Logger'
    )
);

function conditionJobFactory(
        BaseJob,
        util,
        Logger
) {
    var logger = Logger.initialize(conditionJobFactory);

     function ConditionJob(options, context, taskId) {
        ConditionJob.super_.call(this, logger, options, context, taskId);
        this.cache = {};
        this.cache[1] = 1;
        this.cache[2] = 1;
    }
    util.inherits(ConditionJob, BaseJob);

    ConditionJob.prototype._calcFibonacci = function(n) {
        if (this.cache.hasOwnProperty(n)) {
            return this.cache[n];
        }

        let result = this._calcFibonacci(n-1) + this._calcFibonacci(n-2);
        this.cache[n] = result;
        return result;
    };

    /**
     * @memberOf ConditionJob
     */
    ConditionJob.prototype._run = function run() {
        let seqIndex = this.options.seqIndex;
        if (typeof seqIndex !== 'number') {
            return this._done(new TypeError('Invalid type of seqIndex'));
        }

        seqIndex = parseInt(seqIndex);

        if (seqIndex <= 0 || seqIndex > 50) {
            return this._done(new RangeError('Invalid iteractions ' + seqIndex));
        } else {
            this.context.fibonacciResult = this._calcFibonacci(seqIndex);
            this._done();
        }
    };

    return ConditionJob;
}
