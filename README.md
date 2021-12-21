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