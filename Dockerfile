FROM node:12.2.0

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY . /app

RUN ng build --prod --base-href=/

EXPOSE 80

CMD ["ng", "serve", "--prod", "--host", "0.0.0.0", "--port", "80"]
