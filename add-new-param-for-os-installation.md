## Install OS Sequence

1. Node starts PXE boot
2. Node fetch profile, RackHD sends install-os profile
3. Node download installer kernel/initrd \(from OS repository\) by the definition of profile.
4. Node boots installer
5. Installer download files from OS repository, and install OS into disk
6. Node sends notification to RackHD to signify installation finishes.

## Profile

![](/assets/road-direction.png) ![](/assets/people-on-steer.png)

## Kickstart

* A kind of file containing the answers to all the questions that would normally be asked during a typical intsallation.
* A mechnism of automated/unattended installation

## Callback

Notify the OS installation completion during the first boot

## Tricky points

* Some OS installation needs multiple reboot, this is a challenge for current RackHD architecture.
* 
Introduce the OS installation code flow and practice how to do OS installation in RackHD.

**Goals:**

\(1\)Understand the OS installation code flow.

\(2\)Understand how to setup OS repository \(setup\_iso.py and Http proxy\)

\(3\)Successfully run an OS installation using workflow.

\(4\)EJS template

**Practice:**

\(1\)Successfully install ESXi/CentOS/SUSE/Ubuntu/Windows using example payload.

\(2\)Add the new option “timezone” for OS installation

