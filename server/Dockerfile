FROM node:18
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
ENV PORT 8001
ENV MONGO_URL mongodb://db:27017/session-db

EXPOSE $PORT

CMD [ "node", "dist/index.js" ]