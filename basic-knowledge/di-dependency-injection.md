## A Real Problem

Suppose we need to use programming lanaguage to construct a computer:

* A computer is made of a lot of components
* Each component is make of a lot of sub-components
* Some sub-component may be shared by different component
* The shared sub-component may be assembed with different parameters in order to compse a component.![](/assets/computer-components-di.png)

We first create mouse:

```javascript
var leftKey = new LeftKey();
var middleKey = new MiddleKey();
var rightKey = new RightKey();
var wheel = new Wheel();
var cable = new UsbCable();
var led = new LED();

var mouse = new Mouse(leftKey, middleKey, rightKey, wheel, cable, led);
```

The create keyboard:

```javascript
var keys = new Keys();
var led = new LED();
var cable = new UsbCable();

var keyboard = new Keyboard(keys, led, cable);
```

Then we can create other components `cpu`, `mothboard`, `display`, .etc, finally we assemble them into a computer:

```javascript
var cpu = new CPU(...);
var motherboard = new Motherboard(...);
var memory = new Memory(...)
...

var computer = new Computer(cpu, motherboard, memory, mouse, keyboard, display, power, ...)
```

Actually, whenever you want to create computer, you have to manually all components, all sub compoents all sub-sub components ...

So whether we can create a smart factory, when I ask for a computer, it automatically finds all compoents, sub components and assemble them well, something like below:

```javascript
var computer = smartFactory.generate('computer');
```

The `di` is just like the smart factory! Every component will have a unique name, we only need to create component and specify its sub-component \(dependency\), then we ask for `di` a component, we tell its unique name, the `di` can recursively resolve the dependency for us.

## Create di Module in RackHD

* Standard way:

```javascript
var di = require('di');

module.exports = analyzeOsRepoJobFactory;

di.annotate(analyzeOsRepoJobFactory, new di.Provide('Job.Os.Analyze.Repo'));
di.annotate(analyzeOsRepoJobFactory,
    new di.Inject(
        'Job.Base',
        'Logger',
        'Assert',
        'Util',
        '_',
        'Promise',
        'JobUtils.OsRepoTool'
    )
);
```

* A simple way that customized by RackHD

```javascript
module.exports = encryptionFactory;

encryptionFactory.$provide = 'Encryption';
encryptionFactory.$inject = [
    'crypto',
    'Constants',
    'apache-crypt'
];
```

## Register all di Modules

You only need to declare the di information for each module, when RackHD runs, it will scan all source files, and automatically register all modules.

```javascript
var injectables = _.flattenDeep(
        [
            // NPM Packages
            helper.simpleWrapper(_, '_'),
            helper.requireWrapper('bluebird', 'Promise'),
            helper.requireWrapper('rx', 'Rx'),
            helper.requireWrapper('nconf'),
            helper.requireWrapper('waterline', 'Waterline'),
            ...

            // Glob Requirables
            helper.requireGlob(__dirname + '/lib/common/*.js'),
            helper.requireGlob(__dirname + '/lib/models/*.js'),
            helper.requireGlob(__dirname + '/lib/protocol/*.js'),
            helper.requireGlob(__dirname + '/lib/serializables/*.js'),
            helper.requireGlob(__dirname + '/lib/services/*.js')
        ]
    );

    var injector = new di.Injector(injectables);
```

Then you could get a module simplify by:

```javascript
var encryption = injector.get('Encryption');

var analyzeJob = injector.get('Job.Os.Analyze.Repo');
```

Two Types of Module

* Singleton

```javascript
module.exports = configurationServiceFactory;

configurationServiceFactory.$provide = 'Services.Configuration';
configurationServiceFactory.$inject = [...]

function configurationServiceFactory(...)
{
    function ConfigurationService() {
        ...
    }

    ...

    ConfigurationService.prototype.start = function start() {
        ...
    };

    return new ConfigurationService();
}
```

You could directly use it:

```javascript
injector.get('Services.Configuration').start();
```

* Class

```javascript
module.exports = encryptionFactory;

encryptionFactory.$provide = 'Encryption';
encryptionFactory.$inject = [...];

function encryptionFactory(...) {
    function Encryption () {
    }

    Encryption.prototype.createHash = function (data, algorithm, salt) {
        ...
    };


    return Encryption;
}
```

Usually, you need to create an instance before using it:

```javascript
var Encryption = injector.get('Encryption');
var encrypt = new Encryption();
encrypt.createHash();
```

## Other di Characteristic

* Cache
* Some di helper functions



