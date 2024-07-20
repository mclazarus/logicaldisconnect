---
id: "805"
slug: "2009-06-upgrading-software"
title: "Upgrading software"
date: 2009-06-02T07:30:46.000Z



tags:

  - "General"
---
<div class="sqs-html-content">
  <p>Apparently keeping your old software up to date is important, if you still use it and it is publicly accessible.
I noticed my brother's <a href="http://tom.mcallister.ws/away/">away site</a> had a huge spam problem, which I thought odd, since I had installed a spam filter a long time ago.  </p>
<p>I logged in and noticed the spam filter was missing in action.  It wasn't just disabled or working wrong, it was gone.  This combined with the fact that a few weeks back everyone who commented on the site was listed as "Anonymous" regardless of what information they entered finally clicked in that some script-kiddie nonsense was going on.</p>
<p>I saw that someone had managed to upload a handful of files into the /tmp directory I would guess compromising some well known flaw in WordPress version 1.5, and make an entry in the DB to activate their files as plugins.  It turns out the filter wasn't actually gone just hidden from me and disabled.</p>
<p>No matter I just kept his data, installed the newest version of WordPress and I've fixed both of those annoying problems.  Now I'll just have to remind myself to keep those sites up to date.  I also took the opportunity to disable a couple of sites that I know aren't really functioning anymore but may have had code accessible to the outside world.  So if you were counting on my test install of <a href="http://trac.edgewall.org/">Trac</a> for anything, tough luck.</p>
</div>
