FROM node

WORKDIR ./

COPY . /

RUN npm install --legacy-peer-deps

EXPOSE 3000

ENV NODE_ENV=production

RUN npm run build

CMD [ "npm", "start" ]
