FROM node:18

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "admin-service.js"]
