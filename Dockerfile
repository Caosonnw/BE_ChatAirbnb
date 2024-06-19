FROM node:20

WORKDIR /home/node41

# node_modules
COPY package*.json . 

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

EXPOSE 8080

# yarn prod
CMD ["yarn","prod"]

# docker build . -t img-airbnb-be

# docker run -d -p 8080:8080 --name cons-airbnb-be img-airbnb-be
