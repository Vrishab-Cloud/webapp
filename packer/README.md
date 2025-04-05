# Packer Configuration for Golden Image Creation

This directory contains Packer configuration to create golden images for deploying the cloud application to Google Compute Engine.

## Image Features

- Pre-configured with application dependencies
- Systemd service for automatic startup
- Google Cloud Ops Agent for monitoring
- Secure configuration following best practices

## Prerequisites

1. Install Packer: https://developer.hashicorp.com/packer/tutorials/docker-get-started/install-cli
2. Google Cloud SDK installed and authenticated

## Setup Instructions

### 1. GCP Project Setup

```bash
# Authenticate
gcloud auth login

# Create project
PROJECT_ID=dev-{RANDOM}
gcloud projects create $PROJECT_ID --set-as-default
gcloud auth application-default login

# Enable required APIs
gcloud services enable compute.googleapis.com

# Create service account
gcloud iam service-accounts create packer \
  --project $PROJECT_ID \
  --description="Packer Service Account" \
  --display-name="Packer Service Account"

# Assign roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:packer@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/compute.instanceAdmin.v1

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:packer@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/iam.serviceAccountUser
```

### 2. Build Image

```bash
# Validate configuration
packer validate -var "project_id=$PROJECT_ID" .

# Build image
packer build -var "project_id=$PROJECT_ID" .
```

## Configuration Files

- `main.pkr.hcl` - Main Packer configuration
- `config.yaml` - Ops Agent configuration
- `webapp.service` - Systemd service file
- `scripts/` - Provisioning scripts

## Provisioning Process

1. System updates and user setup
2. Application deployment
3. Service configuration
4. Monitoring agent installation

## References

- [Packer Documentation](https://developer.hashicorp.com/packer/docs)
- [Google Compute Builder](https://developer.hashicorp.com/packer/plugins/builders/googlecompute)
