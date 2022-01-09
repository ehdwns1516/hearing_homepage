#!/bin/bash
CURRENT_PID=$(pgrep -f node)
if [ -z $CURRENT_PID];then
  echo "node 실행중이 아님" >> /home/ubuntu/nodelog.log
else
  kill -9 $CURRENT_PID
  sleep 3
fi
node /home/ubuntu/build-be/dist/main.js &