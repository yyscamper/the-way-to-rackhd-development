## What's Catalog?

## Remote Catalog vs. Local Catalog

## Remote Catalog Procedure

## Catalog Job

## 

## Catalog Tasks

## Catalog Parser

* How to link a task with a parser?

## 

## Touch Microkernel

## What's Overlayfs?

## Misc

Why a lot catalog task is set to ignoreFailure?





# Exercise

\(1\) Design a Linux catalog task which parse the `ls -l` for the given folder or file and store the result into source `ls`.

For example, if the given folder is /var/opt, the `ls -l /var/opt` outputs:

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

The you need to parse the output into JSON data:

```javascript
[
    {
        "file_type": "file",
        "permission": {
            "user": "rw-"
            "group": "rw-"
            "others": "r--",
        },
        "link_count": "1",
        "owner": "yuanf",
        "group": "root",
        "size": "0",
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
        "link_count": "1",
        "owner": "yuanf",
        "group": "yuanf",
        "size": "18242",
        "modified_time": "Feb 24 15:29",
        "name": ".babel.json"
    },   
    {
        "file_type": "file",
        "permission": {
            "user": "rw-"
            "group": "rw-"
            "others": "r--",
        },
        "link_count": "1",
        "owner": "yuanf",
        "group": "yuanf",
        "size": "18242",
        "modified_time": "Feb 24 15:29",
        "name": ".babel.json"
    }, 
    
]
```



Introduce the catalog job design and know how to create a new parser and compose a new catalog task.

**Goals:**

\(1\)Understand the current catalog job design

\(2\)Understand how the parser is linked with the catalog job

\(3\)Understand how to login into Microkernel

\(4\)Microkernel operation

**Practice:**

\(1\)Create a new Linux catalog task for command “ls -al /”

-You need create a parser to parse the output and convert it into JSON.

-Store the catalog into source “lsroot”

-Create a new task for the new catalog job.

-Incorporate the new catalog into discovery graph, make sure the catalog is done when a new node is discovered.

-We will provide the parser’s unit-test, you need to make sure your code pass the unit-test.

