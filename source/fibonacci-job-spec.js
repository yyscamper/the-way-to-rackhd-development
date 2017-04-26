// Copyright 2016, EMC, Inc.

'use strict';

describe(require('path').basename(__filename), function () {
    var uuid = require('node-uuid'),
        graphId = uuid.v4(),
        Job;

    before(function() {
        helper.setupInjector([
            helper.require('/lib/jobs/base-job.js'),
            helper.require('/lib/jobs/fibonacci.js'),
        ]);
        Job = helper.injector.get('Job.Fibonacci');
    });

    it("should get 1 if seqIndex=1", function() {
        var job = new Job({seqIndex: 1}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(1);
        });
    });

    it("should get 1 if seqIndex=2", function() {
        var job = new Job({seqIndex: 2}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(1);
        });
    });

    it("should get 2 if seqIndex=3", function() {
        var job = new Job({seqIndex: 3}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(2);
        });
    });

    it("should get 3 if seqIndex=4", function() {
        var job = new Job({seqIndex: 4}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(3);
        });
    });

    it("should get 5 if seqIndex=5", function() {
        var job = new Job({seqIndex: 5}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(5);
        });
    });

    it("should get 75025 if seqIndex=25", function() {
        var job = new Job({seqIndex: 25}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(75025);
        });
    });

    it("should get 12586269025 if seqIndex=50", function() {
        var job = new Job({seqIndex: 50}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(12586269025);
        });
    });

    it("should get 5 if seqIndex=5.2", function() {
        var job = new Job({seqIndex: 5.2}, {}, graphId);
        job._run();
        return job._deferred.then(function() {
            expect(job.context.fibonacciResult).to.equal(5);
        });
    });

    it("should fail if seqIndex < 0", function() {
        var job = new Job({seqIndex: -1}, {}, graphId);
        job._run();
        return job._deferred.should.be.rejectedWith(RangeError);
    });

    it("should fail if seqIndex=0", function() {
        var job = new Job({seqIndex: 0}, {}, graphId);
        job._run();
        return job._deferred.should.be.rejectedWith(RangeError);
    });

    it("should fail if seqIndex > 50", function() {
        var job = new Job({seqIndex: 51}, {}, graphId);
        job._run();
        return job._deferred.should.be.rejectedWith(RangeError);
    });

    it("should fail if seqIndex is not a number", function() {
        var job = new Job({seqIndex: "2"}, {}, graphId);
        job._run();
        return job._deferred.should.be.rejectedWith(TypeError);
    });

    it("should fail if seqIndex is not specified", function() {
        var job = new Job({}, {}, graphId);
        job._run();
        return job._deferred.should.be.rejectedWith(TypeError);
    });
});
