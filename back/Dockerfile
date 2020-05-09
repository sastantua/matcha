FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY wait-for-it.sh .
RUN npm install --quiet
COPY . .