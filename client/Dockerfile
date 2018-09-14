# FROM node:latest

# RUN mkdir /usr/src/app
# WORKDIR /user/src/app
# # RUN ls

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY package.json /usr/src/app/
# RUN npm install
# # RUN npm install react-scripts@1.1.1 -g

# CMD ["npm", "start"]

FROM node:8

WORKDIR /user/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]