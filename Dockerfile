FROM node:11.1
# Create app directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
# Install app dependencies

COPY . .

RUN npm install
ENV SERVER_URL=http://noble-sql.n2d3jjhs9z.ap-northeast-1.elasticbeanstalk.com/
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