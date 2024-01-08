const express = require("express");
const app = express();
const {sequelize} = require("./models")
const port = 8000;

app.listen(port, async function (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return console.log(`Server berjalan di port ${port}`);
      } catch (error) {
        console.log('Unable to connect to the database:');
      }
});