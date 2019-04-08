FROM node:10.13.0

# Create app directory
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client
# Install app dependencies

COPY . .
RUN npm install

# Build app
RUN npm run build

# ENV HOST 0.0.0.0
# EXPOSE 3000

# start command
CMD [ "npm", "start" ]