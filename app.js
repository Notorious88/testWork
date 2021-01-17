require("./config/config.js")

const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");

const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");

const connectDB = require("./database/connectDB");

if (process.env.NODE_ENV === "dev") {
    const morgan = require("morgan");
    app.use(morgan('dev'));
}



const PORT = process.env.PORT || 3000;

const {
    RouterUser,
    RouterItem,
} = require("./api/router/index");

app.use(session({
    secret: "NewSecretKey@&passportJS",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
require("./api/middleware/passport")(passport);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", RouterUser);
app.use("/", RouterItem);

app.use('/static', express.static(__dirname + '/public/static'));



app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/public/views`);
app.set('views', path.join(__dirname, '/public/views'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('404.hbs', {
        message: err.message,
        error: {}
    });
});

app.get('/signIn', (req, res) => res.render('login'));
app.get('/signUp', (req, res) => res.render('signup'));
app.get('/createItem', (req, res) => res.render('createItem', {author: req.isAuthenticated()}));

app.use((req, res, next) => {
    const err = new Error("page not found!");
    err.status = 404;
    next(err)
});


connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server start ${PORT}`))
}).catch(err => {
    console.log(err);
    process.exit(1);
})
    


