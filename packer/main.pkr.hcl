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

source "googlecompute" "ubuntu" {
  project_id          = var.project_id
  source_image_family = var.image_family
  ssh_username        = var.ssh_username
  zone                = var.zone
  image_name          = "${var.image_name}-${local.timestamp}"
  machine_type        = var.machine_type
}

build {
  sources = ["source.googlecompute.ubuntu"]
  provisioner "shell" {
    scripts = ["./scripts/updall.sh", "./scripts/user.sh"]
  }

  // SQL setup
  # provisioner "shell" {
  #   script = "./scripts/mysql.sh"
  #   environment_vars = [
  #     "DB_USERNAME=cloud",
  #     "DB_PASSWORD=cloud@5QL",
  #     "DB_DATABASE=webapp"
  #   ]
  # }

  provisioner "file" {
    source      = "webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "file" {
    source      = "config.yaml"
    destination = "/tmp/config.yaml"
  }

  provisioner "file" {
    source      = "../app"
    destination = "/tmp"
  }

  provisioner "shell" {
    scripts = ["./scripts/mvup.sh", "./scripts/build.sh", "./scripts/ops-agent.sh"]
  }
}
