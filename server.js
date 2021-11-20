const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')



const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())


app.listen(process.env.PORT || 3000, function(){
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
  });