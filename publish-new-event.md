# Poller

Poller is implemented as endless job

![](/assets/normal-poll-sequence.png)



## Event Classification

* Interval Event: internal pub/sub interfaces \(accross processes or within process\)

* External Event: pub/sub async APIs for user



## External Event Sources

* Poller
* Database
* Heartbeat
* Some special business logic
* ...

## Comment Event Format

Refer to: [http://rackhd.readthedocs.io/en/latest/rackhd/event\_notification.html?highlight=event\#event-notification](http://rackhd.readthedocs.io/en/latest/rackhd/event_notification.html?highlight=event#event-notification)

## Publish Event Channels

* AMQP
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

