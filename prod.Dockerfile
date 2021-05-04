## this is the stage one , also know as the build step

FROM node:14-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY .env .env
RUN npm install
COPY src src
RUN npm run build

## this is stage two , where the app actually runs

FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
COPY .env .env
RUN npm install --only=production
COPY --from=builder /app/built ./built
EXPOSE 8080

CMD npm run prod
