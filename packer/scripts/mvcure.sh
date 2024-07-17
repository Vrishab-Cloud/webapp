#!/bin/bash

#Move
sudo mv /tmp/app /opt/webapp
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

sudo chown -R csye6225:csye6225 /opt/webapp/app
sudo restorecon /etc/systemd/system/webapp.service

# Setup webapp service
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
# sudo systemctl start webapp.service
