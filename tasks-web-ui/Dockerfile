FROM node:22-alpine as base

WORKDIR /app

# development

FROM base as dev

ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm ci --include=dev

COPY . .

CMD ["npm", "run", "dev"]

# production

FROM base as prod

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

USER node

COPY . .

CMD ["npm", "run", "build"]