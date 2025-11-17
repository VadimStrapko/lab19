# Этап сборки (build stage)
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Этап продакшн (production stage)
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./dist
COPY ormconfig.json ./

# Устанавливаем wait-for-it для ожидания БД
RUN apk add --no-cache bash
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 3000

# Запускаем приложение с ожиданием БД
CMD ["sh", "-c", "wait-for-it.sh postgres:5432 --timeout=30 --strict -- node dist/main.js"]
