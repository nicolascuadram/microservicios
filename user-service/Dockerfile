FROM denoland/deno:2.3.7

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "start"]
