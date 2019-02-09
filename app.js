const express = require('express')
	, bodyParser = require('body-parser')
	, path = require('path')
	, mongoose = require('mongoose')
	, session = require('express-session')
	, flash = require('connect-flash');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//path to the static assets like javascript or css
app.use(express.static(path.join(__dirname,'./public')));

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'));

//setup session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//for flash messages
app.use(flash());

//web routes
app.use('/', require('./routes/index'));

//DB Connection
const db = require('./config/db').mongoURL;
mongoose
	.connect(db,{useNewUrlParser: true})
	.then(res => console.log('Database Connected!'))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});