## Why Promise

* Async Task Wrapper
* Fluent error handling
* Callback trap
* Ensure callback is called only once \(critical for bank service\)
* Ensure callback is scheduled by designed sequence

## ES6 Promise vs. Bluebird vs. Q vs. Other Async Libraries

## Promise State Machine

## Promise Terms

Resolve, Reject, Fulfilled, Rejected, Deffered Promise, Settled

## Promise Chain

1.Typical example:

* [https://github.com/RackHD/on-http/blob/c4f42e5c350d482bdd6e4820b5fc4fbc2848620a/app.js\#L43](https://github.com/RackHD/on-http/blob/c4f42e5c350d482bdd6e4820b5fc4fbc2848620a/app.js#L43)

2.Promise.all

* [https://github.com/RackHD/on-core/blob/master/lib/common/db-renderable-content.js\#L57](https://github.com/RackHD/on-core/blob/master/lib/common/db-renderable-content.js#L57)
* [https://github.com/RackHD/on-core/blob/master/spec%2Flib%2Fmodels%2Fwork-item-spec.js\#L170](https://github.com/RackHD/on-core/blob/master/spec%2Flib%2Fmodels%2Fwork-item-spec.js#L170)

3.spread

* [https://github.com/RackHD/on-core/blob/master/lib%2Fmodels%2Flookup.js\#L77](https://github.com/RackHD/on-core/blob/master/lib%2Fmodels%2Flookup.js#L77)
* [https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Futils%2Fjob-utils%2Fcommand-parser-spec.js\#L682](https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Futils%2Fjob-utils%2Fcommand-parser-spec.js#L682)
* [https://github.com/RackHD/on-http/blob/master/lib/services/common-api-presenter.js\#L275](https://github.com/RackHD/on-http/blob/master/lib/services/common-api-presenter.js#L275)

4.Promise.each

* [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-catalog.js\#L84](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-catalog.js#L84)

## How to Convert Callback to Promise

1. Typical example:

   * [https://github.com/RackHD/on-http/blob/master/lib/services/files/file-plugin.js](https://github.com/RackHD/on-http/blob/master/lib/services/files/file-plugin.js)
   * [https://github.com/RackHD/on-tasks/blob/master/lib/utils/job-utils/os-repo-tool.js\#L30-L49](https://github.com/RackHD/on-tasks/blob/master/lib/utils/job-utils/os-repo-tool.js#L30-L49)
     usage: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/analyze-os-repo-job.js\#L135-L157](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/analyze-os-repo-job.js#L135-L157)

2. More Complex Example  
   A more complex example:  
   **Definition**: [https://github.com/RackHD/on-tasks/blob/master/lib/utils/job-utils/ipmitool.js\#L26-L71](https://github.com/RackHD/on-tasks/blob/master/lib/utils/job-utils/ipmitool.js#L26-L71)

3. Deferred  
   [https://github.com/RackHD/on-dhcp-proxy/blob/master/lib/message-handler.js\#L79-L119](https://github.com/RackHD/on-dhcp-proxy/blob/master/lib/message-handler.js#L79-L119)

4. More complex exmple about deferred  
   The childProcess.prototype.run:  
   [https://github.com/RackHD/on-core/blob/master/lib/common/child-process.js](https://github.com/RackHD/on-core/blob/master/lib/common/child-process.js)

5. Promisify / Promise.fromNode

   * [https://github.com/RackHD/on-http/blob/master/lib/api/1.1/northbound/skus.js\#L40](https://github.com/RackHD/on-http/blob/master/lib/api/1.1/northbound/skus.js#L40)
   * [https://github.com/RackHD/on-http/blob/master/lib/services/redfish-validator-service.js\#L33](https://github.com/RackHD/on-http/blob/master/lib/services/redfish-validator-service.js#L33)

## How Promise is scheduled:

* [https://github.com/RackHD/on-http/blob/master/index.js\#L64](https://github.com/RackHD/on-http/blob/master/index.js#L64)

## How to unit-test Promise

* [https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Futils%2Fjob-utils%2Fos-repo-tool-spec.js\#L41](https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Futils%2Fjob-utils%2Fos-repo-tool-spec.js#L41)
* **Chai as Promise**: [http://chaijs.com/plugins/chai-as-promised](http://chaijs.com/plugins/chai-as-promised)

## How to Mock a Promise

* [https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Fjobs%2Fanalyze-os-repo-job-spec.js](https://github.com/RackHD/on-tasks/blob/master/spec%2Flib%2Fjobs%2Fanalyze-os-repo-job-spec.js)
* **Sinon-as-Promised**: [https://github.com/bendrucker/sinon-as-promised](https://github.com/bendrucker/sinon-as-promised)

## Promise anti-pattern

* [http://taoofcode.net/promise-anti-patterns/](http://taoofcode.net/promise-anti-patterns/)

---

Introduce the basic knowledge of Promise

**Goals:**

\(1\)Understand what’s callback hell and why there is Promise.

\(2\)Understand the basic terms of Promise.

\(3\)Understand the difference between Bluebird promise, JavaScript native promise and other promise.

\(4\)Understand where to lookup the Promise APIs doc.

\(5\)Familiar with the Promise APIs

\(6\)Be able to read the Promise related code.

\(7\)Be able to convert a Node.js callback into Promise.

\(8\)Be able to write a Promise chain.

\(9\)Understand how to handle Promise error.

\(10\)Understand the best practice of Promise.

**Practice:**

\(1\)Convert the problem in “JavaScript & Node.js” into Promise style, and compare their difference.

**Extend:**

\(1\)Understand how to emit a signal in Node.js and use it to write async code.

\(2\)Study the latest async handling in ES6 \(async/await\)

\(3\)Read the source code of Bluebird Promise

