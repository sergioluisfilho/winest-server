# winest-server

Requisitos: Node.js, Docker, Docker Compose, vscode extensão Prisma

# Criar imagens:

Windows: docker-compose up -d
linux: sudo docker-compose up -d
MacOs: sudo docker compose up -d

# Executar schemas: (use sempre que alterar o arquivo schema.prisma)

npx prisma migrate dev --name init

# Executar api localmente: (fora do docker)

npm install
npm run start

# Visualizar banco de dados:
