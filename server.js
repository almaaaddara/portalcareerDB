const express = require("express");
const app = express();
const {sequelize} = require("./models")
const port = 8000;
const router = require('./routes')
const bodyParser = require ('body-parser')
const CorsMiddleware = require("./middleware/cors")

app.use(bodyParser.json());
app.use(CorsMiddleware)
app.use(router)

app.listen(port, async function (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return console.log(`Server berjalan di port ${port}`);
      } catch (error) {
        console.log('Unable to connect to the database:');
      }
});