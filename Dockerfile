FROM node:11.1
# Create app directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
# Install app dependencies

COPY . .

RUN npm install
ENV SERVER_URL=https://nobles-231311.appspot.com/api
# Build app

RUN npm run build

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=80
ENV STRIPE_KEY=pk_test_vo5gfW5q36LnApH8C6AFeYJJ
# ENV HOST 0.0.0.0
EXPOSE 80

# start command
CMD [ "npm", "start" ]
