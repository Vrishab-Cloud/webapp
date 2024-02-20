#!/bin/bash

USER_NAME="csye6225"

sudo -u $USER_NAME bash -c "cd /opt/webapp/app && npm i && npm i -D jest supertest && npm test"
