# stage: 1
FROM node:latest as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# stage: 2
FROM nginx:alpine
RUN mkdir /usr/share/nginx/html/
COPY — from=react-build /app/build /usr/share/nginx/html/
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]