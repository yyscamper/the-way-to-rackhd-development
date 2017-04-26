## What's Catalog?

The multiplicity of data that describes the characteristic of a node and its belongings, these data are gathered  through various tools and protocols.

## Catalog Classification

* By catalog source
  * dmi
  * ohai
  * driveid
  * bmc
  * megaraid
  * ...
* By trigger mode

  * Auto Catalog: The catalog that auto-gathered immediately when a node is newly discovered \(Computer Node\)
  * Passive Catalog: The catalog that gathered after the node has been discovered by triggering a catalog workflow. \(Mgmt Server/Switch/Pdu…\)

* By execution environment:

  * Microkernel based catalog \(ohai/dmi/bmc/smart/driveId…\)

  * Local catalog \(some ipmi, snmp related\)

* By sku scope:

  * command catalog
  * sku specified \(racadm, redfish, ...\)

## Catalog Document

* Raw Command Output

```
FRU Device Description : Builtin FRU Device (ID 0)
 Chassis Type          : Rack Mount Chassis
 Chassis Serial        : QTFCEV4120280
 Board Mfg Date        : Tue Apr  8 01:48:00 2014
 Board Mfg             : Quanta
 Board Product         : S210-X12RS V2
 Board Serial          : QTF3EV41400432
 Board Part Number     : 31S2RMB00H0
 Product Manufacturer  : Quanta
 Product Name          : S210-X12RS V2
 Product Serial        : QTFCEV4120280

FRU Device Description : AST2300
 Chassis Type          : Rack Mount Chassis
 Chassis Serial        : QTFCEV4120280
 Board Mfg Date        : Tue Apr  8 01:48:00 2014
 Board Mfg             : Quanta
 Board Product         : S210-X12RS V2
 Board Serial          : QTF3EV41400432
 Board Part Number     : 31S2RMB00H0
 Product Manufacturer  : Quanta
 Product Name          : S210-X12RS V2
 Product Serial        : QTFCEV4120280
```

* Parsed Catalog:

```json
{
    "createdAt": "2016-04-25T07:47:15.317Z",
    "data": {
        "Builtin FRU Device (ID 0)": {
            "Board Mfg": "Quanta",
            "Board Mfg Date": "Tue Apr  8 01:48:00 2014",
            "Board Part Number": "31S2RMB00H0",
            "Board Product": "S210-X12RS V2",
            "Board Serial": "QTF3EV41400432",
            "Chassis Type": "Rack Mount Chassis",
            "Product Manufacturer": "Quanta",
            "Product Name": "S210-X12RS V2",
            "Product Serial": "QTFCEV4120280"
        },
        "AST2300": {
            "Board Mfg": "Quanta",
            "Board Mfg Date": "Tue Apr  8 01:48:00 2014",
            "Board Part Number": "31S2RMB00H0",
            "Board Product": "S210-X12RS V2",
            "Board Serial": "QTF3EV41400432",
            "Chassis Type": "Rack Mount Chassis",
            "Product Manufacturer": "Quanta",
            "Product Name": "S210-X12RS V2",
            "Product Serial": "QTFCEV4120280"
        }
    },
    "id": "571dcb832e99e68d3cfe6824",
    "node": "571dcb631facd49c3c5659ff",
    "source": "ipmi-fru",
    "updatedAt": "2016-04-25T07:47:15.317Z"
}
```

## Catalog Graphs

```javascript
module.exports = {
    friendlyName: 'Discovery',
    injectableName: 'Graph.Discovery',
    options: {...},
    tasks: [
        {
            label: 'bootstrap-ubuntu',
            taskName: 'Task.Linux.Bootstrap.Ubuntu'
        },
        {
            label: 'catalog-dmi',
            taskName: 'Task.Catalog.dmi'
        },
        {
            label: 'catalog-ohai',
            taskName: 'Task.Catalog.ohai',
            waitOn: {
                'catalog-dmi': 'finished'
            }
        },
        {
            label: 'catalog-bmc',
            taskName: 'Task.Catalog.bmc',
            waitOn: {
                'catalog-ohai': 'finished'
            },
            ignoreFailure: true
        },
        {
            label: 'catalog-lsall',
            taskName: 'Task.Catalog.lsall',
            waitOn: {
                'catalog-bmc': 'finished'
            },
            ignoreFailure: true
        },
        ...
    ]
};
```

* Examples
  * Compute node discovery: [https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/discovery-graph.js](https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/discovery-graph.js)
  * Management server discovery: [https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/discovery-mgmt-graph.js](https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/discovery-mgmt-graph.js)
  * Pdu discovery: [https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/pdu-discovery-graph.js](https://github.com/RackHD/on-taskgraph/blob/master/lib/graphs/pdu-discovery-graph.js)
* Different hardware has different catalogs
* Different environement generate different catalogs
* Catalog may be ignored failure

## Catalog Tasks

* Catalog via command:

```javascript
module.exports = {
    friendlyName: 'Catalog lsall',
    injectableName: 'Task.Catalog.lsall',
    implementsTask: 'Task.Base.Linux.Catalog',
    options: {
        commands: [
            'sudo lspci -nn -vmm',
            'sudo lshw -json',
            'sudo lsblk -o KNAME,TYPE,ROTA; echo BREAK; sudo lsscsi --size'
        ]
    },
    properties: {
        catalog: {
            type: 'lsall'
        }
    }
};
```

* Catalog via script

```javascript
module.exports = {
    friendlyName: 'Catalog Drive IDs',
    injectableName: 'Task.Catalog.Drive.Id',
    implementsTask: 'Task.Base.Linux.Catalog',
    options: {
        commands: [
            {
                command: 'sudo node get_driveid.js',
                downloadUrl: '{{ api.templates }}/get_driveid.js?nodeId={{ task.nodeId }}'
            }
        ]
    },
    properties: {
        catalog: {
            type: 'driveId'
        }
    }
};
```

## Catalog Job

* Remote Catalog: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/linux-catalog.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/linux-catalog.js)
* Local ipmi catalog: [https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-catalog.js](https://github.com/RackHD/on-tasks/blob/master/lib/jobs/ipmi-catalog.js)

## Catalog Parser

* How to link a task with a parser?
* Fixed Parser:

```javascript
var dmi = "sudo dmidecode";


/**
 * Input data format:
 *     data.stdout: The command stdout
 *     data.error: Indicate whether there is any error while executing the command
 */
CommandParser.prototoype[dmi] = function(data) {
    try {
        ... //do something parse
        return Promise.resolve({ source: 'dmi', data: parsedResult, store: true});
    } catch(err) {
        return Promise.reject( {source: 'dmi', error: err });
    }
```

* Match Parser:

```javascript
matchParsers.ipmiUserList = {
    regex: /^sudo ipmitool -c user list \d+$/,
    parsefunction: function(data) {
        try {
            ... //do something parse
            return Promise.resolve({ source: 'ipmi-user-list', data: parsedResult, store: true});
        } catch(err) {
            return Promise.reject( {source: 'ipmi-user-list', error: err });
        }
    }
};
```

## Remote Catalog Procedure

![](/assets/remote-catalog-flow.png)

* Job

subscribeRequestCommands

sbuscribeRespondCommands

* Southbound APi Service

RequestCommands

RespondCommands

* Nodes

GET /tasks

POST /tasks

## 

## Touch Microkernel

## What's Overlayfs?

## Misc

Why a lot catalog task is set to ignoreFailure?

# Exercise

\(1\) Design a Linux catalog task which parse the `ls -l` for the given folder or file and store the result into source `ls`.

For example, if the given folder is /var/opt, the `ls -l /var/opt` output is:

```bash
$ ls -l /var/opt
total 645504
drwxr-xr-x    24 yuanf yuanf      4096 Apr 19 16:21 ./
drwxr-xr-x     4 root  root       4096 Mar  8 17:39 ../
-rw-rw-r--     1 yuanf root          0 Feb 20 21:31 a.js
-rw-rw-r--     1 yuanf yuanf     18242 Feb 24 15:29 .babel.json
drwxrwxr-x     5 yuanf yuanf      4096 Feb 13 10:22 backup/
lrwxrwxrwx     1 yuanf yuanf        46 Aug  2  2016 alias -> /home/rackhd/personal/dotfiles/files/bash-alias
```

Then you need to parse the output into JSON data \(the folder `.` and `..` should be discarded\):

```javascript
[
    {
        "file_type": "file",
        "permission": {
            "user": "rw-"
            "group": "rw-"
            "others": "r--",
        },
        "link_count": 1,
        "owner": "yuanf",
        "group": "root",
        "size": 0,
        "modified_time": "Feb 20 21:31",
        "name": "a.js"
    },
    {
        "file_type": "file",
        "permission": {
            "user": "rw-"
            "group": "rw-"
            "others": "r--",
        },
        "link_count": 1,
        "owner": "yuanf",
        "group": "yuanf",
        "size": 18242,
        "modified_time": "Feb 24 15:29",
        "name": ".babel.json"
    },   
    {
        "file_type": "dir",
        "permission": {
            "user": "rwx"
            "group": "rwx"
            "others": "r-x",
        },
        "link_count": 5,
        "owner": "yuanf",
        "group": "yuanf",
        "size": 4096,
        "modified_time": "Feb 13 10:22",
        "name": "backup"
    }, 
    {
        "file_type": "link",
        "permission": {
            "user": "rwx"
            "group": "rwx"
            "others": "rwx",
        },
        "link_count": 1,
        "owner": "yuanf",
        "group": "yuanf",
        "size": 46,
        "modified_time": "Aug  2  2016",
        "name": "alias",
        "link_origin": "/home/rackhd/personal/dotfiles/files/bash-alias"
    }
]
```

Firstly, you need create a parser to get above JSON data, and pass the provided unit-test.

Then you need to inject the task into discovery workflow, so that when a node is newly discovered, the `ls` catalog can be auto created.

