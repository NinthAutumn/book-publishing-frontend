FROM node:10.13.0

# Create app directory
# RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
# Install app dependencies

COPY . .
RUN npm install
ENV SERVER_URL=http://api:5000/api
# Build app
RUN npm run build

# ENV HOST 0.0.0.0
# EXPOSE 3000

# start command
CMD [ "npm", "start" ]