## Local Debugging

### Node.js Native Debugger

refer link: [https://nodejs.org/api/debugger.html](https://nodejs.org/api/debugger.html)

### node-inspector

refer link: [https://github.com/node-inspector/node-inspector](https://github.com/node-inspector/node-inspector)

## Remote Debugging

NOTE：

（1）准备的说，我想介绍的是如何在Windows的VSCode上Debug你跑在自己Linux VM的Node.js程序。

（2）看起来文章很长，当你完整的做完一次后，你会发现其实很简单！



1.下载安装VSCode，请自行到官网：[https://code.visualstudio.com/](https://code.visualstudio.com/)

2.确保你的Linux VM配置好了Samba，同时Mount到Windows的一个磁盘，下面例子中我把自己10.62.59.200的机器的/home/yuanf目录Mount到了Windows为O盘。

![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image002.jpg)



3.假设你要调试on-http, 你需要在on-http目录下生成一个启动配置文件，我已经在邮件中附上了我的配置文件，你需要做的是把address/remoteRoot更改为自己VM IP和Code所在的目录。然后记住一定要把这个配置文件放到调试程序主目录的.vscode目录下。比如对于on-http, 一定要放到on-http/.vscode/launch.json, 如果你想调试其他的Service，比如on-taskgraph, on-dhcp-proxy, 你把on-http目录下的.vscode整个目录原原本本的拷贝过去就可以。



![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image004.jpg)



![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image006.jpg)



4.用Debug模式运行程序，记住一定要加上--debug or --debug-brk的参数，这里可能有几种模式来运行程序

sudo node --debug index.js \#用默认的端口5858,程序会直接运行，这种模式下建议提前在代码中设置好断点

sudo node –-debug-brk index.js \#用默认的端口5858,程序会停留在第一行，需要你在VSCode手动点击“运行”才会接着跑

sudo node --debug-brk=5959 index.js \#可以更改自己喜欢的端口号

如果你想调试mocha,也是类似的：

mocha --debug-brk spec/lib/services/nodes-api-service-spec.js -R spec --require spec/helper.js \#Unit-test跑得太快，建议用--debug-brk,不要用--debug



5.用VSCode打你要调试的程序的文件夹，比如我要调试on-http, 我就把O盘上的on-http文件夹打开。



6.设置断点

比如我现在要调试/api/2.0/nodes这个API的代码，我把断点加在nodesGetAll这个函数的入口处

Node.js程序最大的特点是异步！！写代码的前后顺序并不是执行的顺序！！异步程序用单步执行很难调试，所以你必须要不停的设置断点！



![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image008.jpg)





调试unit-test也一样的添加断点：

![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image010.jpg)



7.Attach远程的Node.js程序，并开始调试。

先切换到Debug面板，再选择之前launch.json中配置的Remote Debug，然后点击开始Debug

![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image012.jpg)



8.调试后，会停留在断点处，你可以选择单步执行

这是用--debug-brk执行mocha调试后，程序停留在第一行，点击继续执行

![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image014.jpg)



继续执行后会停留在断点行

![](file:///C:\Users\yuanf\AppData\Local\Temp\msohtmlclip1\01\clip_image016.jpg)



## Debug on Another Machine



## Reference

* [https://code.visualstudio.com/docs/nodejs/nodejs-debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
* [http://stackoverflow.com/questions/1911015/how-do-i-debug-node-js-applications/16512303\#16512303](http://stackoverflow.com/questions/1911015/how-do-i-debug-node-js-applications/16512303#16512303)



Introduce local & remote debugging, log analysis

**Goals:**

\(1\)Understand where to find the RackHD log files.

\(2\)Understand the format of log entry.

\(3\)Understand how to do local debugging.

\(4\)Understand how to do remote debugging.

\(5\)Understand how to debug on physical stack \(Mount my source into physical stack\)

**Practice:**

\(1\)Set up the remote debugging environment, and try to debug your code.

\(2\)Find a failure Jenkins job, try to analyze the log and get some clue from it.

w.ϯ�pK��

