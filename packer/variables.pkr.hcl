variable "project_id" {
  type = string
}

variable "image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "image_name" {
  type    = string
  default = "centos-8"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable "machine_type" {
  type    = string
  default = "e2-standard-2"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "env_test_db" {
  type    = string
  default = "test_db"
}

variable "env_prod_db" {
  type = string
}

variable "env_db_user" {
  type = string
}

variable "env_db_pass" {
  type    = string
  default = ""
}
