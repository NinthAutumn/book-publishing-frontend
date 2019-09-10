FROM node:11.1
# Create app directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
# Install app dependencies

COPY . .

RUN npm install
ENV SERVER_URL=https://nobles-231311.appspot.com/api/v1
# Build app

RUN npm run build

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=8080
ENV STRIPE_KEY=pk_live_2WoTAiPewhp9sgG6DsTE09uF
ENV NEST_SERVER_URL=https://api.nobles.jp/api
# ENV HOST 0.0.0.0
EXPOSE 8080

# start command
CMD [ "npm", "start" ]
