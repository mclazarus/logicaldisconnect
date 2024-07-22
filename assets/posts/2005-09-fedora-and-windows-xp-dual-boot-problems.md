---
id: "294"
slug: "2005-09-fedora-and-windows-xp-dual-boot-problems"
title: "Fedora and Windows XP dual boot problems"
date: 2005-09-01T09:46:38.000Z



tags:

  - "Hacker"
---
<div class="sqs-html-content">
  <p>This post is to give a shout of thanks to the guys who figured out why installing XP and Fedora on a single machine sometimes causes the first OS installed to be inexplicably lost somewhere on the disk with no hope of recovery.  Well there is hope.  If you set up dual boot with XP and Fedora Core 2 or later, and you are sure you lost all of your data from one of your installs, read on for more info.
<!--more--></p>
<p>If you want to skip my gripping adventure in geekdom, and just fix your problem, read [Prevention and Recovery of XP Dual Boot Problems[(http://www.redhat.com/archives/fedora-devel-list/2004-May/msg00908.html).  Thank you "Jack Aboutboul" for putting this together.</p>
<p>Well if you are still interested, or if that didn't help you much, maybe a recount of my adventure will.</p>
<p>*Background*: I installed Fedora Core 4 in early July.  I left some room for Windows XP too, figuring I would eventually have to install it.  Well the first thing I found out was that XP wants to write to the first partition on the disk, even if you install to some other partition.  (I know it's just the MBR) but the installer seems to think it can't continue unless you put a file system on the first partition that it understands.  </p>
<p>So I figure, okay no big deal, I'll use [parted](http://www.gnu.org/software/parted/parted.html) and move stuff around.  No good.  Extended partitions can't be moved, they can be resized though.  And Since redhat started including [SELinux](http://www.nsa.gov/selinux/) and maybe for other reasons as well, the ext3 file system they set up, has a bunch of options turned on that parted doesn't understand and because of that it won't even try and do the resizing and moving for you.  So the answer to that is to use [resize2fs](http://www.google.com/search?q=resize2fs) to change the filesystem size, and then use fdisk to change the corresponding partition size to match.  Now is the time to break out the calculator and take good notes (measure twice cut once).  Then create new duplicate partitions further on in the disk and use dd to copy the existing partition data over.  Leaving a nice clean 15 GB at the beginning of the disk for XP to do its worst.</p>
<p>... *8 hours pass* ...</p>
<p>Finally XP is installed and fully patched with security updates, and has firefox, thunderbird and gaim installed.  Okay, great, now just reboot with the FC4 install disk, go into rescue mode, change the active boot partition, run grub-install and update the grub.conf to point at the new partitions, right?  :-( very wrong!</p>
<p>Fedora informs me that there is no linux installation here, but thanks for coming out.  I look at fdisk and see much to my dismay all kinds of weird errors about all the non windows partitions not ending on a sector boundary.  *oh boy*  My first thought is that the xp installer did something stupid and messed with the other partitions, and boy was I angry.  But then I decided that the data is all there, the new partition doesn't extend beyond where my first linux partition **was**.  So unless xp maliciously overwrote all that stuff, it had to be recoverable.  And I don't remember waiting patiently while the installer wrote zeros all over my work for the past 2 months.</p>
<p>So I boot the machine in [knoppix](http://www.knoppix.org/) fire up one of the best programs I have ever come across [testdisk](http://www.cgsecurity.org/index.html?testdisk.html) which is used for partition recovery.  And testdisk does not give me good results at all.  Even after messing around with the options to tell it [TARFU](http://en.wikipedia.org/wiki/Tarfu).  </p>
<p>So I grabbed a coke zero, and sat down and played a game of [Madden 2006](http://www.easports.com/sports/madden06/index.jsp), of course I threw 2 picks on my first 3 passes, which led to 14 points by Oakland :-(.  I have to remember to always kick off to start the game if I am frustrated.  I recovered and won 31 - 14, with McNabb coming off his slow start to throw 3 TDs.</p>
<p>So I turned to google thinking, many other people had to have this problem.  And I was lucky to come across [this](http://www.redhat.com/archives/fedora-devel-list/2004-May/msg00908.html).    After reading through, I was very angry for not taking a dump of the partition table before installing xp.  But I figured, if I try a few different number of heads for the disk geometry, maybe it will work out, and I won't actually be changing anything, just the way I am looking at the data on the disk.  I tried 255.  And things looked better to fdisk now.  </p>
<p>Still a little loopy, because the XP install was done with the heads set to 240.  So I fired up testdisk, and now it found all the partitions, and things were looking right, so I used it to write out the partition table, rebooted, did the grub thing noted earlier.  And *BAM*!  everything back to normal.</p>
<p>So hopefully if anyone else has this problem, they can have a better chance of finding the solution.  Specifically when anyone else is me again.</p>
</div>
