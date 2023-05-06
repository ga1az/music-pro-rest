FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.development.local .env.development

ARG env=development

EXPOSE 3000

CMD ["npm", "start"]
