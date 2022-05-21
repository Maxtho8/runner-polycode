FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g yarn
RUN yarn install
RUN yarn add @types/dockerode

COPY . .

EXPOSE 3001

CMD [ "./node_modules/ts-node/dist/bin.js", "index.ts" ]
