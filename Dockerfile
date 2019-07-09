FROM node:10.13.0

# Create app directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
# Install app dependencies

COPY . .
RUN apk update && apk upgrade
RUN apk add git

RUN npm install
ENV SERVER_URL=http://api:5000/api
# Build app

RUN npm run build

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000
# ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start" ]