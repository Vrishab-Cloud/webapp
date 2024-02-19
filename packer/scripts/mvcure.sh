#!/bin/bash

#Move
sudo tar xzf /tmp/app.tar.gz -C /opt/webapp
sudo mv /tmp/.env /opt/webapp/app
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

sudo chown -R csye6225:csye6225 /opt/webapp/app

# Setup webapp service
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service
