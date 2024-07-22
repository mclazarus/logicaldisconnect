---
id: "56"
slug: "2003-06-redhat-9-mysql-4-and-dbdmysql"
title: "Redhat 9, MySQL 4 and DBD::mysql"
date: 2003-06-20T08:23:11.000Z



tags:

  - "Hacker"
---
<div class="sqs-html-content">
  <p>In attempting to install <a href="http://www.bugzilla.org/">Bugzilla on a <a href="http://www.redhat.com/">Redhat 9</a> system, with <a href="http://www.mysql.com/">MySQL 4.0.13</a> RPMs installed I ran into some trouble.  I wanted to take the easy way out and use 'perl -MCPAN -e "install Bundle::Bugzilla" to make sure I had all the right perl modules to get bugzilla up and running, but for some reason DBD::mysql wouldn't compile, the problem appears to have been related to the default LANG setting on RH9 which wasn't handled well by the DBD::mysql build process.  The solution is simply"unset LANG; perl Makefile.PL; make"</p>
<p>I was able to track this down in the perl.dbi.users newsgroup, <a href="http://nntp.x.perl.org/group/perl.dbi.users/17822">here</a>  I have also put the complete text of the posting in the extended part of this entry entry.
<!--more-->
<a href="http://nntp.x.perl.org/group/perl.dbi.users/17822">http://nntp.x.perl.org/group/perl.dbi.users/17822</a>:
Newsgroups: perl.dbi.users
Date: Tue, 15 Apr 2003 09:29:24 +0200 (CEST)
To: Rudy Lippan <rlippan[at]remotelinux.com>
cc: dbi-users[at]perl.org
Subject: Re: DBD::mysql and RedHat 9
Message-ID: <Pine.LNX.4.21.0304150921550.13531-100000@highgate.kerbero.com>
From: sguazt[at]kerbero.com (Marco Guazzone)
References: <Pine.LNX.4.44.0304141319300.29828-100000@elfride.ineffable.net> </p>
<p>Yesssss!!!!!!
It works!!!
Thank you very much!!
But, finally, what is it the wrong side?
Is it the perl-RH9 version? However some packages did compile well even if
the LANG var was setted.
[on my machine I have LANG=en_US.UTF-8]
With the perl-RH8 version I hadn't this problems!</p>
<p>Regards,
Marco Guazzone</p>
<p>On Mon, 14 Apr 2003, Rudy Lippan wrote:</p>
<p>> On Mon, 14 Apr 2003, Marco Guazzone wrote:
> 
> 
> > Hi,
> > I've just installed RH 9 on my laptop; then I've downloaded the mysql
> > 4.0.12 binary distribution from www.mysql.com and the DBI package and
> > installed them. OK!
> > Then I've tried to install DBD::mysql 2.1026 but I've got these errors:
> > > perl Makefile.PL
> > ...
> > > make
> > Makefile:89: *** missing separator.  Stop.
> 
> Try this:
> 
> unset LANG; perl Makefile.PL; make.
> 
> 
> Later,
> 
> Rudy
> 
></p>
</div>
