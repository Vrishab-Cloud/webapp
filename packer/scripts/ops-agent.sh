#!/bin/bash
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo mv /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml

# Create log file and assign permission
sudo mkdir /var/log/webapp 
sudo touch /var/log/webapp/app.log
sudo chown csye6225:csye6225 /var/log/webapp/app.log
