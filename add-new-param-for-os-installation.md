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

## Callback

Notify the OS installation completion during the first boot

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

