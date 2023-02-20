FROM node:18-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./.env.production ./.env

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]