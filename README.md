A simple replacement of the huessen frame server that is hosted remotely in china.  

This project allows for huessen-frames to not phone home.

It requires a raspberry pi or similar device to capture network traffic and prevent egress.  The simple express app will index and host images in the images directory.  This is not feature complete any will still require the huessen app and bluetooth to initially configure.

Images are created with my fork of [epdoptimize](https://github.com/bartelme/epdoptimize)

[Notes](NOTES.md) has more information about setting up the raspberry pi device
