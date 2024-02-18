#!/bin/bash

# Update system
sudo dnf update rpm -y
sudo dnf update -y

# Install libraries
sudo dnf install mysql-server -y
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y

# Start MySQL
sudo systemctl enable mysqld
sudo systemctl start mysqld
