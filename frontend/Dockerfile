FROM node:lts-alpine AS build
WORKDIR /bookstore/frontend
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend ./
COPY ./frontend/.env.docker .env
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf -- *
COPY --from=build /bookstore/frontend/build .
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
EXPOSE 443