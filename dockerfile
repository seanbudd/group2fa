FROM node:8.12-stretch
RUN mkdir -p /usr/src/group2fa
WORKDIR /usr/src/group2fa
COPY ./src /usr/src/group2fa/src
COPY ./public /usr/src/group2fa/public
COPY ./package.json /usr/src/group2fa/package.json

RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add -

RUN apt-get update && apt-get install -y  \
    python2.7 make g++ gcc postgresql-client-9.6 libpq-dev bash \
    && npm install

EXPOSE 3000
CMD [ "npm", "start" ]
