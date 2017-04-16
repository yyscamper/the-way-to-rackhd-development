# Installation

The first thing before doing RackHD development is setup a local environment.

Though the RackHD official provides multiple of release artifacts, such as debian package, ova, docker images, but these are not friendly for developer. This chapter is  trying to help you setup a develper-friendly environment.

## Prerequisite

Please make sure following prerequiste is met before go ahead:

1 - Ubuntu Linux. Either 14.04 or 16.04 is OK, Either Server or Desktop version is good.

2 - Git has been installed in Ubuntu

3 - You already have a github account

## Steps

### 1. Install Node.js

Now the core and most RackHD services are written in JavaScript and run in Node.js environment. So the first step you have to install the Node.js.

As for which Node.js version should I installed, I recommend you to check the TravisCI configuration, take the on-taskgraph for example, the link is [https://travis-ci.org/RackHD/on-taskgraph](https://travis-ci.org/RackHD/on-taskgraph), you could see two versions in build jobs![](/assets/travis-ci-nodejs-version.png)Since the Node.js: 6 is placed under "Allowed Failures", it means the RackHD official tries to run RackHD in Node.js 6.x, but any failure in Node.js 6.x can be ignored. So the Node.js 4.x is the offical promised RackHD version.

> RackHD tries to keep the pace with Node.js LTS release, so may be in near future, RackHD will switch to run with Node.js 6.x after all existing compatibility issues are resolved. Nevertheless, the TravisCI config will be updated accordingly, so you can always get the recommended Node.js version from TravisCI.
>
> You can obtain the source code of TravisCI configuration from the `.travis.yml` file in each repository

The click  the "Node.js: 4" for detail build log, you could see which exact version it installs:

![](/assets/travis-ci-exact-version.png)

Though Node.js 4.x is currently RackHD recommended one, but sometimes your task is to fix the issue on Node.js 6.x. So to help you easily switch between different Node.js version, I recommend you install a Node.js Version Manager firstly, among  them, the `n` is a very simple one, click [https://github.com/tj/n](https://github.com/tj/n) for a detail introducation of `n.`

Install `n` with following command:

```bash
curl -L https://git.io/n-install | bash
```

Then install Node.js 4.8.2:

```bash
n 4.8.2
```

Check version by:

```bash
$ node --version
v4.8.2
```

To switch another Node.js version, use following command:

```bash
n 6.1.0
```

### 2. Fork Repository

Only a few people have write permission to RackHD official repositories, usually you only have read-only permission, if you want to contribute code into RackHD official repositority, you firstly need to fork it and then submit pull request to RackHD offical repository.

> Even for those people who have write permisson to RackHD offical repositories, they should still avoid directly to write offical repositories. Fork repo and then submit pull request is always the right way.

Click the "Fork" button in RackHD official repo:![](/assets/click-fork-button.png)Then you will see your forked repo:![](/assets/my-forked-repo.png)For the forked repo, you have full premission, you can modify it whatever you want \(even delete it!\) 

