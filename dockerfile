FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile && \
  yarn build && \
  rm -rf node_modules

FROM node:16-alpine AS deps
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn cache clean
RUN yarn install --production --frozen-lockfile

FROM node:16-alpine AS runner
ENV NODE_ENV production
ENV NODE_OPTIONS "--max-old-space-size=8192"
ENV APP_PORT 8080
EXPOSE $APP_PORT
WORKDIR /app
COPY --from=build /app ./
COPY --from=deps /app/node_modules ./node_modules
CMD ["yarn", "start:prod"]