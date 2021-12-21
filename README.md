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