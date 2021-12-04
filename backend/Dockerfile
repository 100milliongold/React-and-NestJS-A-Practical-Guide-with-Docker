FROM --platform=linux/amd64 node:16.13

ENV TZ Asia/Seoul

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

CMD npm run start:dev