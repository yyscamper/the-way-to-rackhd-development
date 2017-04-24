# Poller

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

