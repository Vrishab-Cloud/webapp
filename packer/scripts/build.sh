#!/bin/bash

sudo ls -al /opt/webapp
cd /opt/webapp/app

sudo npm i

sudo chown -R csye6225:csye6225 /opt/webapp/app
