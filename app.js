const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

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

start();


