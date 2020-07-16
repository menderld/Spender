FROM node:12.2.0-alpine

WORKDIR /app

COPY . ./

# install bash for easier debug into running container
RUN apk add bash

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_OKTA_CLIENT_ID 0oaakbxj7XN0PIdcl4x6
ENV REACT_APP_BACKEND_URL http://localhost:5000/api
ENV REACT_APP_OKTA_DOMAIN https://dev-207179.okta.com/oauth2/default
ENV REACT_APP_GOOGLE_CLIENT_ID 431376266040-9jp14450b7s5lmd5admhgm45nnr0vf6t.apps.googleusercontent.com
ENV NODE_OPTIONS=""

RUN npm install

#CMD ["sleep", "1d"]
CMD ["npm", "start"]
