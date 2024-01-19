const express = require("express");
const app = express();
const {sequelize} = require("./models")
const port = 8000;
const router = require('./routes')

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