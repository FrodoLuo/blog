FROM node:12

RUN yarn install
RUN yarn build:ssr

RUN npm i -g pm2

EXPOSE 4000

ENTRYPOINT ["pm2", "start"]
CMD ["dist/server/main.js", "name=web-render"]