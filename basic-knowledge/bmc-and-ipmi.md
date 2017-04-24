## IPMI & BMC

* Reference: 

[https://www.cern.ch/it-dep-fio-ds/Presentations/2004/ipmi\_server\_management.ppt](https://www.cern.ch/it-dep-fio-ds/Presentations/2004/ipmi_server_management.ppt)

[https://www.thomas-krenn.com/en/wiki/IPMI\_Basics](https://www.thomas-krenn.com/en/wiki/IPMI_Basics)

* Intelligent Platform Management Interface, Baseboard Management Controller
* IPMI is a specifications that provides standardized hardware interfaces and abstraction

* 1998 v1.0, 2001 v1.5, 2004 v2.0

* The primary IPMI features include:

  * Monitoring \(supervision of the hardware\)
  * Recovery Control \(Recover/Restart the server\)
  * Logging \(protocol "out-of-range" states for the hardware\)
  * Inventory \(list of hardware inventory\)

* Avaiable even if system is powered down and no OS loaded

* IPMI Components
  * BMC \(Baseboard Management Controller\): The heart of IPMI
  * IPMB \(Intelligent Platform Management Bus\)
  * ICMB \(Intelligent Chassis Management Bus\)
* Some Data Types
  * SEL \(System Event Logging\)
  * SDR \(Sensor Data Record\)
  * Sensor
  * FRU \(Field Replaceable Unit\)
* System Interfaces

  * KCS

  * Lan

  * Others \(Serial, ...

* SOL \(Serial Over LAN\): Redirect data traffic to BMC serial port through an IPMI session



![](/assets/ipmi-architecture.png)

## Redfish

[https://www.dmtf.org/sites/default/files/Introduction\_to\_Redfish\_2015.pdf](https://www.dmtf.org/sites/default/files/Introduction_to_Redfish_2015.pdf)

ipmi/redfish/snmp/pxeboot/mongodb/rabbitmq/grpc

Introduce the basic knowledge of RackHD frequently used HW protocol and 3rd party services.

**Goals:**

\(1\)Understand what’s BMC/IPMI/SNMP protocol

\(2\)Familiar with the basic operation of ipmi & snmp commands, such as power control, read fru info, sensor, sel.

\(3\)Understand the flow of pxe boot

\(4\)Understand the basic knowledge of mongodb, rabbitmq & grpc.

**Practice:**

\(1\)Practice the ipmi & snmp commands.

\(2\)Practice using raw mongodb command to read RackHD database.

\(3\)Practice how to listen rabbitmq events.

