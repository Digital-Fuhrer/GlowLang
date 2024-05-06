const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./auth/authRouter')
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session );

MONGODB_URI = 'mongodb+srv://Feku:H7m-ks2-Zg3-Pza@glowlangcluster.oqf3kbr.mongodb.net/';

app.use(express.urlencoded({ extended: true }))

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(authRouter);
app.use( async function (req, res, next) {

    res.locals.isAuth = req.session.isAuthenticated
    res.locals.user = req.session.user

    loginText = res.locals.loginText;
    authUser = res.locals.user;
    userStatus = res.locals.isAuth;

    next()
});

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
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
    if (userStatus == false || userStatus == undefined) 
    {
    res.render('StartPage')
    } else if (userStatus == true)
    {
        res.render('mainMenu', {
            userLevels: req.session.user
        });
    }
})
app.get('/StartPage', (req, res) => {
    res.render('StartPage')
})
app.get('/registration', (req, res) => {
    if (userStatus == false || userStatus == undefined) 
    {
    res.render('registration', {
        registText: 'Зарегистрируйтесь, чтобы начать изучать языки.',
        errorColor: null
    })
    } else if (userStatus == true) 
    {
        res.render('mainMenu', {
            userLevels: req.session.user
        });
    }
})
app.get('/loginPage', (req, res) => {
    if (userStatus == false || userStatus == undefined) 
    {
    res.render('loginPage', {
        loginText: 'Войдите, чтобы начать изучать языки.',
        errorColor: null
    })
    } else if (userStatus == true) 
    {
        res.render('mainMenu', {
            userLevels: req.session.user
        });
    }
})
app.get('/Test', (req, res) => {
    res.render('Test')
})
app.get('/choice', (req, res) => {
    res.render('choice')
})
app.get('/Test1', (req, res) => {
    res.render('Test1')
})
app.get('/mainMenu', (req, res) => {
    res.render('mainMenu', {
        userLevels: req.session.user
    });
})
app.get('/profilePage', (req, res) => {
    if (authUser.difficult == 'Низкий') icon = 'low'
    if (authUser.difficult == 'Средний') icon = 'mid' 
    if (authUser.difficult == 'Высокий') icon = 'hard' 
    res.render('profilePage', {
        name: authUser.name,
        diff: authUser.difficult,
        icon: icon,
        stars: authUser.stars,
        level: authUser.level,
        blockTitle: ['Заработано звезд:', 'Уровень:', 'Уровень знаний:']
    })
})
app.get('/level', (req, res) => {
    res.render('level', {
        userLevels: req.session.user
    })
})
app.get('/levelComplete', async (req, res) => {
    res.render('levelComplete', {
        userLevels: req.session.user
    })
})
app.get('/finalPage', (req, res) => {
    res.render('finalPage')
})

start();


