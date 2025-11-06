FROM node:20-alpine

WORKDIR /home/node

COPY package*.json ./

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]