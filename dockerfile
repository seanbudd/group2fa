FROM node:8.12-stretch

WORKDIR /app
ADD . /app

RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add -

RUN apt-get update && apt-get install -y  \
    python2.7 make g++ gcc postgresql-client-9.6 libpq-dev bash \
    && npm install --silent

EXPOSE 3000
EXPOSE 35729
