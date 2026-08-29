variable "aws_region" {
  description = "Região da AWS onde a infraestrutura será criada"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nome do projeto, usado como prefixo dos recursos"
  type        = string
  default     = "bookstore-website"
}

variable "instance_type" {
  description = "Tipo da instância EC2 que executará os containers"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Nome do key pair existente na AWS para acesso SSH"
  type        = string
}

variable "ssh_cidr" {
  description = "CIDR autorizado a acessar SSH; use seu IP/32"
  type        = string
}
