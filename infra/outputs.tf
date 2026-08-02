output "cluster_name" {
  description = "Nome do cluster EKS criado"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint da API do cluster EKS, usado pelo kubectl para se conectar"
  value       = module.eks.cluster_endpoint
}

output "vpc_id" {
  description = "ID da VPC criada"
  value       = module.vpc.vpc_id
}
