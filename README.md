## Module-1: Setup Express

1. Initialize npm
    `npm init -y`
2. Install express
    `npm i express@4.17.2`
3. Create `/src/index.js` file
4. Create `/public/index.html` static html file. Create your own content to serve
5. Modify `/src/index.js`

```javascript
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3001
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
app.listen(port, ()=> {
  console.log('server running')
})
```
6. Modify package.json, add start script under `scripts`
  ```
    "start": "node src/index.js"
  ```
7. Run `npm run start`
8. Open browser http://localhost:3001 and it should serve the static html file

## Module-2: Add Socket.io

Reference: https://socket.io

1. Install socket.io
   `npm i socket.io`
2. Modify `/src/index.js`
   1. Add http and socket.io modules

    ```js
    const http = require('http')
    const socketio = require('socket.io')
    ```

   2. Create http and socketio instances. `http` will wrap express instance and `socketio` will wrap http instance.

    ```js
    const server = http.createServer(app)
    const io = socketio(server)
    ```

   3. Instead of app (express) listening on the port, change it to use server (http instance) instead

    ```js
    server.listen(port, ()=> {
      console.log('server running')
    })
    ```
   4. Add io connection event 
 
    ```js
    io.on('connection', () => {
      console.log('new websocket connection')
    })
    ```

3. Create file `/public/js/chat.js`

4. Modify `/public/index/html`

    ``` html
    <script src='/socket.io/socket.io.js'></script>
    <script src='/js/chat.js'></script>
    ```
5. Modify `/public/js/chat.js`:
  
    ```js
    io()
    ```

6. Start the app `npm start` and open the browser http://localhost:3001

    In console.log you will see:

    ```txt
    server running
    new websocket connection
    ```

## Module-3: Add socket events

`src/index.js` - emits events from server
`/public/js/chat.js` - emits events from client

## Module-4: Chat example, broadcast events

`socket.broadcast.emit` - broadcast events to everyone except the current connection
`socket.on('disconnect')` - event handler when a socket connection has disconnected 


## Module-5: Dockerize

1. Create `Dockerfile` file with this content

```dockerfile
FROM node:18
WORKDIR /usr/node-chat-app
COPY package.json .
RUN npm install
COPY . .
RUN ls -la 
EXPOSE 3001
CMD ["npm", "start"]
```

  Description of this file:
    - Sets the base image as node version 18
    - Creates a working directory /usr/node-chat-app
    - Copies the package.json to the working directory
    - Runs npm install
    - Copies all files to the working directory
    - Gets a list of files copied in the working directory
    - Expose informs Docker that container should listen to the specified network port
    - Runs the executable command with the following parameter; npm is the executable while start is the parameter

2. Commands to run in the terminal:

`docker build .` - build docker image
`docker build --progress=plain .` - build docker image and show output from commands

`docker run -p 3001:3001 <imageid>` - run image and publish to port 3001

3. Run the app using http://localhost:3001

4. Open another terminal and run this command:

`docker ps` - list docker images that are running
`docker stop <container id>` - stop the docker container instance
