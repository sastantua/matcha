FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
RUN npm install --quiet
COPY . .
ENTRYPOINT [ "/bin/bash", "-c" ]