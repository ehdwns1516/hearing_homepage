#!/bin/bash
CURRENT_PID=$(pgrep -f node)
if [ -d $CURRENT_PID];then
  sudo kill -9 $CURRENT_PID
  sudo sleep 2
fi
sudo nohup node /home/ubuntu/build-be/dist/main.js &
echo -ne '\n'
echo -ne '\n'