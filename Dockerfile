FROM node:10.13.0

# Create app directory
WORKDIR /code/NinthAutumn/projects/startup/app

# Install app dependencies

COPY . .
RUN npm install

# Build app
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start" ]