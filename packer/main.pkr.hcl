packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0, < 2.0.0"
    }
  }
}


locals {
  timestamp = formatdate("YYYY-MM-DD", timestamp())
}

source "googlecompute" "centos" {
  project_id          = var.project_id
  source_image_family = var.image_family
  ssh_username        = var.ssh_username
  zone                = var.zone
  image_name          = "${var.image_name}-${local.timestamp}"
  machine_type        = var.machine_type
}
