FROM node:12

WORKDIR /app
COPY . /app

RUN npm install

COPY . ./app
CMD ["npm", "start"]

