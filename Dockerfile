FROM node:12-alpine

COPY autobump.sh /autobump.sh

RUN node autobump.js
