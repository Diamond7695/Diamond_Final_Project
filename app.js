const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require("mongodb-connection-string-url");
const router = express.Router();
const path = require('path');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const cors = require('cors')












//passport config:
require('./config/passport')(passport)
//mongoose//mongodb
mongoose.connect('mongodb+srv://DiamondToliver2:DiamondTolivers@cluster0.n0skj.mongodb.net/DiamondToliver2?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://DiamondToliver2:Shadow040@cluster0.n0skj.mongodb.net/DiamondToliver2?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


//EJS
app.set('views', './views');
app.set('view engine','ejs');
app.use(expressEjsLayout);
//Json+ Cors
app.use(cors())
app.use(express.json())
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
    
//Routes
//connect controller with this file

const ctrl = require('./controller.js')
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.get('/api/music', ctrl.getMusic)
app.delete('/api/music/:id', ctrl.deleteSongs)







app.listen(3000); 