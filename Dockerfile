FROM node:12

RUN mkdir -p /home/blog
WORKDIR /home/blog

COPY . /home/blog

RUN yarn install
RUN yarn build:ssr

RUN npm i -g pm2

EXPOSE 4000

ENTRYPOINT ["pm2", "start", "./dist/server/main.js", "--no-daemon"]