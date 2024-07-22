---
id: "283"
slug: "2005-08-zenity-gmail-gtd"
title: "Zenity, Gmail & GTD"
date: 2005-08-16T10:35:24.000Z



tags:

  - "Hacker"
---
<div class="sqs-html-content">
  <p>I am trying to [Get stuff done](http://wiki.43folders.com/index.php/GTD "Getting things Done info")  and in doing so I have decided to use my [gmail](http://gmail.com/) account to capture everything.  If you search hard enough there is a PDF somewhere that gives you some ideas on implementing a gmail based GTD system.  I found that I have been languishing in putting stuff into my system, and decided because it was too hard.  I had to open thunderbird and then click compose and type the address and then the thing I want to do.  I am sure I could speed this up a bit, but it was painful.  So I wrote a quick script using zenity:
    #!/bin/bash</p>
<p>    TO="xxx@gmail.com"
    SUBJECT=`zenity --entry --text="What do you want to get done?" \ 
        --title="GTD\ Entry"`
    if [ "$?" -eq "0" ]
    then
        echo | mail -s "${SUBJECT}" ${TO}
    fi</p>
<p>and mapped it up to F12 using a technique from my previous post.  And now any time I think of something I want to do I just hit F12, type a quick "next action" and hit enter.  Later I can process my gmail inbox.  I may also have to find a way to batch this process for when I am going through my physical inbox.  But so far so good.</p>
<p>By the way, Buy <a href="http://www.amazon.com/exec/obidos/ASIN/0142000280/logicaldiscon-20">the book</a>, (or get it in a library or whatever) it's great, it at least makes you feel like you can do lots of stuff without worrying about it all the time.</p>
</div>
