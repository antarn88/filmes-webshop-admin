FROM node:14.17.4-alpine3.14
WORKDIR /app
COPY package.json .
RUN npm i nodemon -g
RUN npm i
COPY . .
CMD ["nodemon", "./src/index.js"]