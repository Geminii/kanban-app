# Taken from https://hub.docker.com/r/nikolaik/python-nodejs
FROM node:13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# Copy files
COPY . .

# Build the app
RUN yarn build 

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
