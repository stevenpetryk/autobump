FROM node:12-alpine

COPY autobump.js /autobump.js

RUN node autobump.js
