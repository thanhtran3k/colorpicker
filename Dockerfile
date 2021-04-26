# Docker with Nginx
# Stage 1
FROM node:15-alpine3.10 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2
FROM nginx:1.19.10-alpine

COPY --from=build-step /app/dist/colorpicker /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf