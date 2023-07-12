# winest-server

Requisitos: Node.js, Docker, Docker Compose, vscode extensão Prisma

# Criar imagens:

Windows: docker-compose up -d
linux: sudo docker-compose up -d
MacOs: sudo docker compose up -d

# Crie um arquivo .env seguindo os padrões abaixo:

DATABASE_URL="postgresql://pguser:pgpassword@localhost:5432/winest?schema=public"

# Executar schemas: (use sempre que alterar o arquivo schema.prisma) (se estiver executando pela primeira vez pode ser necessário executar a api antes)

npx prisma migrate dev --name init

# Caso dê erro de permissão ao final do migrate, execute o comando: (note que vc deve terminar o processo node para que seja executado corretamente)

npx prisma generate

# Instalar ou atualizar dependencias:

npm install

# Executar api localmente: (fora do docker)

npm run start

# Visualizar banco de dados:

conecte-se em um banco postgresql através dos seguintes valores:
host: localhost
port: 5432
user: pguser
pasaword: pgpassword

# Documentação das rotas

Há um arquivo (collection) de rotas para ser importado no postman, além de conter algumas automações para facilitar o teste de todas as rotas.
