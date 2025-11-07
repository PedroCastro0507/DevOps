FROM node:20-alpine

WORKDIR /home/node

COPY package*.json ./

RUN npm ci --only=production

COPY src ./

EXPOSE 8000

CMD ["node", "app.js"]