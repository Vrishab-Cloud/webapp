#!/bin/bash

echo "-------Updating the system-------"
sudo apt-get update -y
sudo apt-get upgrade -y

echo "-------Installing Libraries-------"

# Import repository GPG key
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Add Node.JS 20 LTS APT repository
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update

sudo apt-get install -y nodejs

# Verify Node installation
if ! command -v node &> /dev/null; then
  echo "Node installation failed!"
  exit 1
else 
  echo "Node installed!"
fi
