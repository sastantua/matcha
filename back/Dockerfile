FROM node:latest
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
ENTRYPOINT [ "/bin/bash", "-c" ]