FROM node:latest
COPY wait-for-it.sh wait-for-it.sh
WORKDIR /usr/app
COPY package.json .
RUN chmod +x wait-for-it.sh
RUN npm install --quiet
COPY . .
ENTRYPOINT [ "/bin/bash", "-c" ]