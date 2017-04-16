# Installation

The first thing before doing RackHD development is setup a local environment.

Though the RackHD official provides multiple of release artifacts, such as debian package, ova, docker images, but these are not friendly for developer. This chapter is  trying to help you setup a develper-friendly environment.

## Prerequisite

Please make sure following prerequiste is met before go ahead:

1 - Ubuntu Linux. Either 14.04 or 16.04 is OK, Either Server or Desktop version is good.

2 - Git has been installed in Ubuntu

3 - You already have a github account

## Steps

### 1- Install Node.js

Now the core and most RackHD services are written in JavaScript and run in Node.js environment. So the first step you have to install the Node.js.

As for which Node.js version should I installed, I recommend you to check the TravisCI configuration, take the on-taskgraph for example, the link is [https://travis-ci.org/RackHD/on-taskgraph](https://travis-ci.org/RackHD/on-taskgraph), you could see two versions in build jobs![](/assets/travis-ci-nodejs-version.png)Since the Node.js: 6 is placed under "Allowed Failures", it means the RackHD official tries to run RackHD in Node.js 6.x, but any failure in Node.js 6.x can be ignored. So the Node.js 4.x is the offical promised RackHD version.

> RackHD tries to keep the pace with Node.js LTS release, so may be in near future, RackHD will switch to run with Node.js 6.x after all existing compatibility issues are resolved. Nevertheless, the TravisCI config will be updated accordingly, so you can always get the recommended Node.js version from TravisCI.
>
> You can obtain the source code of TravisCI configuration from the `.travis.yml` file in each repository.



