FROM node:20-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install && npm install -g typescript

COPY . .

RUN tsc

CMD ["node", "dist/index.js"]
