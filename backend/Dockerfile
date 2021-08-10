FROM node:alpine
WORKDIR /app
RUN npm i nodemon -g
COPY ./ ./
RUN npm i
CMD ["npm", "start"]