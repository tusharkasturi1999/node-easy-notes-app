const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
require('./app/routes/note.routes.js')(app);
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var server = app.listen(3000, () => {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})