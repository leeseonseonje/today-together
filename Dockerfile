FROM node

WORKDIR ./

COPY . /

RUN npm install --legacy-peer-deps

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
