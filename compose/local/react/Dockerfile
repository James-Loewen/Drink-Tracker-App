FROM node:slim

WORKDIR /app

COPY ./frontend/package.json .

RUN npm install && npm cache clean --force

ENV PATH ./node_modules/.bin/:$PATH