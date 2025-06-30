FROM denoland/deno:latest

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "start"]
