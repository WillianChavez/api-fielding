

# STAGE 1:  INSTALL DEPENDENCIES AND RUN TESTS
FROM node:lts-alpine3.20 AS dependencies-dev

WORKDIR /app

COPY . .

RUN npm install

RUN npm run test


# STAGE 2:  INSTALL DEPENDENCIES PROD AND BUILD
FROM node:lts-alpine3.20 AS dependencies-prod

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm run test && npm run build


## STAGE 3:  DEVELOPMENT AND PRODUCTION

FROM node:lts-alpine3.20 AS development

WORKDIR /app

COPY --from=dependencies-dev /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start:dev"]


## STAGE 4:  PRODUCTION

FROM node:lts-alpine3.20 AS production

WORKDIR /app

COPY --from=dependencies-prod /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]






