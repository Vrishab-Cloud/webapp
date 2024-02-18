#!/bin/bash

GROUP_NAME="csye6225"
USER_NAME="csye6225"

sudo groupadd $GROUP_NAME
sudo useradd -g $GROUP_NAME -s /usr/sbin/nologin -d /opt/webapp $USER_NAME
