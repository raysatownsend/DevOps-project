# Conteúdo revisado para o PDF

## Item 2: página 6

Remova completamente o código do workflow **CD - Continuous Delivery and Deploy to AWS** desta página. Esse workflow pertence à Seção 1, página 3.

Na página 6, mantenha somente uma introdução para os scripts de containerização:

> Os scripts apresentados a seguir demonstram a containerização da aplicação Bookstore e sua execução na AWS EC2. A solução utiliza Dockerfiles independentes para frontend e backend, Docker Compose para orquestrar os serviços, Nginx como ponto de entrada HTTP e Ansible para configurar o servidor.

## Item 3: texto corrigido da página 5

Substitua o texto atual por:

> A aplicação foi containerizada utilizando Docker, com Dockerfiles independentes para o frontend e o backend. O Docker Compose define e executa os dois serviços na mesma rede. O frontend utiliza Nginx para servir os arquivos compilados do React e atuar como proxy reverso. As requisições externas chegam pela porta 80; as requisições iniciadas em `/api` são encaminhadas internamente para o container backend, que executa a API Node.js na porta 8081. Dessa forma, a porta interna do backend não precisa ser exposta diretamente ao usuário.

Use também estas correções de nomenclatura:

```text
Docker Compose
Nginx no container frontend
Dockerfile do frontend
Dockerfile do backend
```

Não escreva “Nginx no Backend”.

## Item 6: Terraform

Inclua uma nova página na Seção 2 ou no relatório da Fase 2 com o título:

> Provisionamento da infraestrutura com Terraform

Texto sugerido:

> O Terraform foi utilizado como ferramenta de Infrastructure as Code para provisionar a infraestrutura necessária na AWS. A configuração cria uma VPC com duas subnets públicas, um security group e uma instância EC2 Amazon Linux. A porta 80 é liberada para acesso ao frontend e a porta 22 é liberada somente para o endereço CIDR definido na variável `ssh_cidr`. A instância EC2 não executa o Terraform nem o Ansible; ela hospeda os containers Docker. Após o provisionamento, o Ansible conecta-se à instância por SSH, instala e configura o Docker e inicia a aplicação com Docker Compose.

Arquivos apresentados:

```text
infra/main.tf
infra/variables.tf
infra/outputs.tf
infra/terraform.tfvars.example
```

Workflow utilizado:

```text
.github/workflows/terraform.yml
```

Comandos demonstrados:

```bash
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan
terraform apply
```

Resumo da responsabilidade de cada ferramenta:

```text
Terraform  -> cria a infraestrutura AWS
Ansible    -> configura a EC2
Docker     -> empacota e executa as aplicações
Compose    -> conecta e inicia os containers
Nginx      -> serve o frontend e encaminha /api
```

## Ordem final das páginas

```text
Página 3  -> workflow CD com Ansible
Página 5  -> explicação correta da containerização
Página 6  -> introdução dos scripts; remover workflow CD duplicado
Páginas 7-11 -> Dockerfiles, Compose, env.docker e Nginx
Páginas 12-14 -> Ansible
Nova página -> Terraform
Página 18 -> diagrama do fluxo
```