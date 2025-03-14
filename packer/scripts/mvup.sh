#!/bin/bash

#Move
sudo mkdir -p /opt/webapp
sudo mv /tmp/app /opt/webapp/
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# Setup webapp service
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
# sudo systemctl start webapp.service
