FROM node:14.17.0-alpine
RUN mkdir -p /srv/app/api
WORKDIR /srv/app/api

COPY package*.json /srv/app/api/
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm i
COPY . /srv/app/api

CMD npm run dev
