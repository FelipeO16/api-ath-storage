FROM node:latest

WORKDIR /app

RUN npm install -g pm2

COPY package.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

COPY . .

RUN yarn

RUN yarn build

EXPOSE 2096

CMD ["pm2-runtime", "build/server.js"]