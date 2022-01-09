#!/bin/bash
if [  -d /home/ubuntu/build-fe ]; then
    sudo rm -rf /home/ubuntu/build-fe
fi
sudo mkdir -vp /home/ubuntu/build-fe