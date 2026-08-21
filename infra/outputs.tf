output "instance_id" {
  description = "ID da instância EC2"
  value       = aws_instance.bookstore.id
}

output "public_ip" {
  description = "IP público da instância EC2"
  value       = aws_instance.bookstore.public_ip
}

output "public_dns" {
  description = "DNS público da instância EC2"
  value       = aws_instance.bookstore.public_dns
}

output "vpc_id" {
  description = "ID da VPC criada"
  value       = module.vpc.vpc_id
}
