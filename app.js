const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./auth/authRouter')
const session = require('express-session');
const varMidWare = require('./auth/middleWare/middleWareAuth')

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(authRouter);
app.use(varMidWare);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Feku:H7m-ks2-Zg3-Pza@glowlangcluster.oqf3kbr.mongodb.net/`)
        app.listen(3000)
    } catch (e) {
        console.log(e);
    }
}

app.set('view engine', 'ejs')

app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'styles')));

app.use(express.static(path.join(__dirname, 'pictures')));

app.use(express.static(path.join(__dirname, 'scripts')));


app.get('/', (req, res) => {
    res.render('StartPage')
})
app.get('/StartPage', (req, res) => {
    res.render('StartPage')
})
app.get('/registration', (req, res) => {
    res.render('registration')
})
app.get('/loginPage', (req, res) => {
    res.render('loginPage')
})
app.get('/Test1', (req, res) => {
    res.render('Test1')
})
app.get('/mainMenu', (req, res) => {
    res.render('mainMenu')
})
app.get('/profilePage', (req, res) => {
    res.render('profilePage', {
        name: 0,
    })
    console.log(res.locals.isAuth)
})

start();


