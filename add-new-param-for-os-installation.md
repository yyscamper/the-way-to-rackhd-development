## Install OS Sequence

![](/assets/install-os-sequence.png)

1. Node starts PXE boot
2. Node fetch profile, RackHD sends install-os profile
3. Node download installer kernel/initrd \(from OS repository\) by the definition of profile.
4. Node boots installer
5. Installer download files from OS repository, and install OS into disk
6. Node sends notification to RackHD to signify installation finishes.

## Profile

* Determines which OS to install

* Specify kernel, initrd and boot arguments, usally each OS will provide the pxeboot images

```bash
echo Starting CentOS/RHEL <%=version%> installer for ${hostidentifier}

set base-url <%=repo%>/images/pxeboot
set params initrd=initrd.img ks=<%=installScriptUri%> hostname=<%=hostname%> ksdevice=bootif BOOTIF=01-${netX/mac} console=<%=comport%>,115200n8 console=tty0
kernel ${base-url}/vmlinuz repo=<%=repo%> ${params}
initrd ${base-url}/initrd.img

boot || prompt --key 0x197e --timeout 2000 Press F12 to investigate || exit shell
```

![](/assets/road-direction.png) ![](/assets/people-on-steer.png)

## Kickstart

* A kind of file containing the answers to all the questions that would normally be asked during a typical intsallation.
* A mechnism of automated/unattended installation
* Some OS don't call it `kickstart`
* Kickstart reference
  * CentOS: [https://www.centos.org/docs/5/html/Installation\_Guide-en-US/ch-kickstart2.html](https://www.centos.org/docs/5/html/Installation_Guide-en-US/ch-kickstart2.html)
  * Redhat: [https://access.redhat.com/documentation/en-US/Red\_Hat\_Enterprise\_Linux/5/html/Installation\_Guide/ch-kickstart2.html](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Installation_Guide/ch-kickstart2.html)
  * ESXi: [https://kb.vmware.com/selfservice/microsites/search.do?language=en\_US&cmd=displayKC&externalId=2004582](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2004582)
  * SUSE: [http://users.suse.com/~ug/autoyast\_doc/index.html](http://users.suse.com/~ug/autoyast_doc/index.html)
  * Ubuntu: [https://help.ubuntu.com/lts/installation-guide/i386/ch04s06.html](https://help.ubuntu.com/lts/installation-guide/i386/ch04s06.html)

## OS Callback

* Notify the OS installation completion during the first boot
* Find the right point where OS installation is really completed.
* The callback only call a simple RackHD notification API
* The callback script will be deleted after notification

The callback script for centos:

```bash
set -e
echo "Attempting to call back to RackHD CentOS installer"
wget --retry-connrefused --waitretry=1 -t 300 --post-data '{"nodeId":"<%=nodeId%>"}' --header='Content-Type:application/json' http://<%=server%>:<%=port%>/api/current/notification
# Only run this once to verify the OS was installed, then disable it forever
chkconfig centos.rackhdcallback off
```

## PubSub Style

A simple version of install os job:

```javascript
InstallOsJob.prototype._run = function() {
    var self = this;

    self._subscribeRequestProfile(function() {
        return self.profile;
    });

    self._subscribeRequestProperties(function() {
        return self.options;
    });

    self._subscribeNodeNotification(self.nodeId, function(data) {
        return self._done();
    });
};
```

## Challenge

* Some OS installation needs multiple reboot, this is a challenge for current RackHD architecture.

---

* Introduce the OS installation code flow and practice how to do OS installation in RackHD.

**Goals:**

\(1\)Understand the OS installation code flow.

\(2\)Understand how to setup OS repository \(setup\_iso.py and Http proxy\)

\(3\)Successfully run an OS installation using workflow.

\(4\)EJS template

**Practice:**

\(1\)Successfully install ESXi/CentOS/SUSE/Ubuntu/Windows using example payload.

\(2\)Add the new option “timezone” for OS installation

