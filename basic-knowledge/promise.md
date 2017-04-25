## What's Promise

* A guarantee for future

> 你走进你最喜爱的快餐店，走到前台要了一些美味的食物。收银员告诉你一共7.53美元然后你把钱给她。她会给回你什么东西呢？
>
> 如果你足够幸运，你要的食物已经准备好了。但是大多数情况下，你会拿到一个写着序列号的小票，是吧？所以你站到一边等待你的食物。
>
> 很快，你听到广播响起：“请317号取餐”。正好是你的号码。你走到前台用小票换来你的食物！谢天谢地，你不用忍受太长的等待。
>
> 刚才发生的是一个对于Promises很好的比喻。你走到前台开始一个业务，但是这个业务不能马上完成。所以，你得到一个在迟些时候完成业务\(你的食物\)的promise\(小票\)。一旦你的食物准备就绪，你会得到通知然后你第一时间用你的promise\(小票\)换来了你想要的东西：食物。
>
> 换句话说，带有序列号的小票就是对于一个未来结果的承诺。

## Why Promise

Not only for callback trap!!!

* Callback trap
* Standarlized Async Task Wrapper
* Fluent async error handling
* Inverse control \(How to trust 3rd party callback?!\)

* Ensure callback is called only once \(critical for bank service\)

* Ensure callback is scheduled by designed sequence

## From Callback to Promise

![](/assets/twitter-status.png)

```javascript
db.users.find({name: 'yyscamper'}, function(err, user) {
    if (err) { //handle error here }
    else {
        db.images.find(user.portrait, function(err, img) {
            if (err) { //handle error }
            else {
                db.tweets.count({name: 'yyscamper'}, function(err, tweets) {
                    if (err) { //handle error }
                    else {
                        ...    
                    }
                }
            }
        });
    }
});
```

Promise style:

```javascript
return db.users.find('name: yyscamper')
.then(function(user) {
    if (!user) { throw new Error(...) };
    user.img = db.images.find(user.portrait);
    return user;
})
.then(function(user) {
    user.tweets = db.tweets.count({name: user.name});
    return user;
})
.then(function(...) {
    ...
})
.catch(function(err) {
    //handle all error here
});

```

## Promise State Machine

![](/assets/promise-state-machine)

## Create Promise

```javascript
var readFileAsync = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        };
    });
});


readFileAsync(path)
.then(function(data) {
    console.log(data);
});


var readFilePromise = Promise.promisify(fs.readFile);
```

Some short hands:

```javascript
Promise.resolve(123);
Promise.reject(new Error('this is error'));
```

## Promise Chain

```javascript
then(fulfilledHandler, errorHandler, progressHandler)
```

Some shortcuts:

```javascript
.catch(errorHandler)
    === .then(null, errorHandler, null)
```

## Promise Helper Functions

```javascript
Promise.map
Promise.all
Promise.reduce
Promise.every
Promise.some
Promise.each
```

## ES6 Promise vs. Bluebird vs. Q vs. Thenable

## New in ES6/ES7

* Generator
* async/await

```javascript
var user = await db.users.find(...);
var user.img = await db.img.find(...);
var user.tweets = await db.tweets.count(...);
...
```

## Reference

* 深入理解promise五部曲：[http://www.ghostchina.com/promises-the-sync-problem-part-1/](http://www.ghostchina.com/promises-the-sync-problem-part-1/)
* JavaScript Promise迷你书: [http://liubin.org/promises-book/](http://liubin.org/promises-book/)

## 

---

## 

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

