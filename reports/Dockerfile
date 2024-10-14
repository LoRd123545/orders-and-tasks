FROM node:22-alpine as base

WORKDIR /app

# development

FROM base as dev

RUN apk add curl

ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm install

COPY . .

USER node

CMD ["npm", "run", "dev"]

# production

FROM base as prod

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

USER node

CMD ["npm", "run", "prod"]