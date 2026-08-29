FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=8081

EXPOSE 8081

CMD ["node", "./bin/www"]
