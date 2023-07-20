FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g prisma
RUN npm install

COPY . .

RUN prisma generate
RUN prisma migrate deploy --preview-feature

EXPOSE 3000

CMD npm run start
