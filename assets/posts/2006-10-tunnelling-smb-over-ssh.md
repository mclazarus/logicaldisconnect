---
id: "535"
slug: "2006-10-tunnelling-smb-over-ssh"
title: "Tunnelling SMB over SSH"
date: 2006-10-25T09:03:54.000Z



tags:

  - "General"
---
<div class="sqs-html-content">
  <p>Turns out to be super easy, there are long how to docs out there that deal with all the trivialities and different scenarios, but basically if you have ssh access to a server that is the SMB server you simply need to do this:</p>
<p>ssh -f -N -g -L 9000:localhost:139 <serverip></serverip></p>
<p>
and then you can simply mount it to a directory by doing:</p>
<p>
sudo mount -t smbfs -o username=USERNAME,password=PASSWORD,ip=localhost,port=9000 //SERVERNAME/SHARE /mnt/remoteshare</p></p>
</div>
