FROM node:14.17.0-alpine
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

COPY package*.json /srv/app/client/
RUN npm i
COPY . /srv/app/client

CMD ["npm", "start"]
