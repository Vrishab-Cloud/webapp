#!/bin/bash

# Create .env file
touch /tmp/.env

echo "TEST_DB_NAME=$TEST_DB_NAME" >> /tmp/.env
echo "TEST_DB_USER=$DB_USER" >> /tmp/.env
echo "TEST_DB_PASS=$DB_PASS" >> /tmp/.env

echo "PROD_DB_NAME=$PROD_DB_NAME" >> /tmp/.env
echo "PROD_DB_USER=$DB_USER" >> /tmp/.env
echo "PROD_DB_PASS=$DB_PASS" >> /tmp/.env
echo "NODE_ENV=production" >> /tmp/.env
