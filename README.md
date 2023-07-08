# winest-server

Requisitos: Node.js, Docker, Docker Compose, vscode extensão Prisma

# Criar imagens:

Windows: docker-compose up -d
linux: sudo docker-compose up -d
MacOs: sudo docker compose up -d

# Executar schemas:

npx prisma migrate dev --name init
