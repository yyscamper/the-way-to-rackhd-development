# What's Poller?

Poller is designed to periodically fetching data

* Catalog is to fetch fixed hardware information, such as serial number, FRU list. usually if there is no hardware configuration changes, these information keeps no changed.
* Poller is to fetch dynamically changed information, these data may change suddenly, such as hardware failure, power status.

# Poller Types

* IPMI poller
* SNMP poller
* Poller alert
* ARP cache poller
* Service heartbeat poller
* # Poller Document

  ```javascript
  {
    "node": "54daadd764f1a8f1088fdc42",
    "config": {
      "command": "power"
    },
    "pollInterval": 10000,
    "lastStarted": null,
    "lastFinished": null,
    "failureCount": 0,
    "createdAt": "2015-02-11T20:50:41.663Z",
    "updatedAt": "2015-02-11T20:50:41.663Z",
    "id": "54dbc0a11eaecfc22a30d59b",
    "type": "ipmi"
  }
  ```

# Poller Special Design

* depends on obm setting
  * A lot pollers run in out-of-band, they need the node's obm settings.
  * Heartbeat poller doesn't need obm

* poller cache
  * Data is stored in memory rather than database
  * Default cache size=10, but can be configured in config.json via `pollerCacheSize`
* poller failure
  * If poll fails, the next poll interval will be automatically extended.

# Poller Implementation

Poller is implemented as endless job

![](/assets/normal-poll-sequence.png)

* Run WorkItem: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/run-work-items.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/run-work-items.js)

Check whether the timer is out to poll, if so, publish the command to AMQP

* Command Job \(ipmi-job, snmp-job, redfish-job, poller-alert.job ...\):

[https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-job.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-job.js)

[https://github.com/RackHD/on-tasks/blob/master/lib/jobs/redfish-job.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/redfish-job.js)

[https://github.com/RackHD/on-tasks/blob/master/lib/jobs/snmp-job.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/snmp-job.js)

Listen to the run command request, run specified poller command, parse command output, and output to AMQP

* Message Cache Job: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/message-cache-job.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/message-cache-job.js)

Store the command result into poller cache

* Clean WorkItem: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/clean-work-items.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/clean-work-items.js)

Periodically check whether a poller fails to poll during the schedulered time windows, if not, mark the poller as failed.

* Create Default Pollers: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/message-cache-job.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/message-cache-job.js)

Create a list of poller workItems bases on the input poller configuration.

* Pollers Service Graph: [https://github.com/RackHD/on-taskgraph/blob/7fa4275fd2c704ced42413ead2479eee0f301af3/lib/graphs/poller-service-graph.js](https://github.com/RackHD/on-taskgraph/blob/7fa4275fd2c704ced42413ead2479eee0f301af3/lib/graphs/poller-service-graph.js)

## Event Classification

* Interval Event: internal pub/sub interfaces \(accross processes or within process\)

* External Event: pub/sub async APIs for user

## External Event Sources

* Poller
* Database
* Heartbeat
* Some special business logic
* ...

## Common Event Format

Refer to: [http://rackhd.readthedocs.io/en/latest/rackhd/event\_notification.html?highlight=event\#event-notification](http://rackhd.readthedocs.io/en/latest/rackhd/event_notification.html?highlight=event#event-notification)

| **Attribute** | **Type** | **Description** |
| :--- | :--- | :--- |
| version | String | Eventpayload format version. |
| type | String | It could be one of the values:heartbeat,node,polleralert,graph. |
| action | String | a verb or a composition of component and verb which indicates what happened, it’s associated with thetypeattribute. |
| severity | String | Eventseverity, it could be one of the values:**critical**,**warning**,**information**. |
| typeId | String | It’s associated with thetypeattribute. It could be graph ‘Id’ for**graph**type, poller ‘Id’ for**polleralert**type, &lt;fqdn&gt;.&lt;service name&gt; for**heartbeat**event, node ‘Id’ for**node**type. Please see[table](http://rackhd.readthedocs.io/en/latest/rackhd/event_notification.html?highlight=event#table)for more details . |
| createdAt | String | The timeeventhappened. |
| nodeId | String | The nodeId, it’snullfor ‘heartbeat’event. |
| data | Object | Detail information are included in this attribute. |

## Event Data Example

```js
{
    "version": "1.0",
    "type": "heartbeat",
    "action": "updated",
    "typeId": "kickseed.example.com.on-taskgraph",
    "severity": "information",
    "createdAt": "2016-07-13T14:23:45.627Z",
    "nodeId": "null",
    "data": {
        "name": "on-taskgraph",
        "title": "node",
        "pid": 6086,
        "uid": 0,
        "platform": "linux",
        "release": {
            "name": "node",
            "lts": "Argon",
            "sourceUrl": "https://nodejs.org/download/release/v4.7.2/node-v4.7.2.tar.gz",
            "headersUrl": "https://nodejs.org/download/release/v4.7.2/node-v4.7.2-headers.tar.gz"
        },
        "versions": {
            "http_parser": "2.7.0",
            "node": "4.7.2",
            "v8": "4.5.103.43",
            "uv": "1.9.1",
            "zlib": "1.2.8",
            "ares": "1.10.1-DEV",
            "icu": "56.1",
            "modules": "46",
            "openssl": "1.0.2j"
        },
        "memoryUsage": {
            "rss": 116531200,
            "heapTotal": 84715104,
            "heapUsed": 81638904
        },
        "currentTime": "2017-01-24T07:18:49.236Z",
        "nextUpdate": "2017-01-24T07:18:59.236Z",
        "lastUpdate": "2017-01-24T07:18:39.236Z",
        "cpuUsage": "NA"
    }
}
```

## Publish Event Channels

* AMQP: Use sniff.js to listen AMQP events
* Hook

# Exercise

---

Introduce the event design.

**Goals:**

\(1\)Understand the common event format.

\(2\)Understand the event is sent via AMQP or Hook.

\(3\)Understand how to listen to the AMQP event via sniff.js.

\(4\)Understand how to operate the webhook.

**Practice:**

\(1\)Periodically generate 5 events in your customized job.

-All events should conform to the common event format.

-Make sure all events can be received by sniff.js.

-We will provide a webhook server, so you need to make sure your event can be received by webhook server.

**Extends:**

-Read the section about Event in readthedoc, understand how many events RackHD will send.

