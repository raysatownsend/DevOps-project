# Ansible deployment

Install the required collection:

```bash
ansible-galaxy collection install -r requirements.yml
```

Create a local inventory from the example and replace the EC2 address and SSH key:

```bash
cp inventory/hosts.ini.example inventory/hosts.ini
ansible-playbook site.yml
```

The playbook installs Docker, copies the application build contexts to `/opt/bookstore`, and starts the services with Docker Compose.
