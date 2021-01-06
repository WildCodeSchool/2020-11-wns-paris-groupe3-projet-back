FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./.env ./.env
RUN npm i
COPY ./src ./src

CMD npm start