FROM node:18
WORKDIR /usr/node-chat-app
COPY package.json .
RUN npm install
COPY . .
RUN ls -la 
EXPOSE 3001
CMD ["npm", "start"]