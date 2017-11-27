FROM arm64v8/node:latest

WORKDIR /app

RUN npm install -g nodemon

#ADD package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
#RUN mv /app/node_modules /node_modules

#ADD . /app

ENV PORT 80
EXPOSE 80

ENV NODE_ENV=production

CMD ["node", "index.js"]

USER node
