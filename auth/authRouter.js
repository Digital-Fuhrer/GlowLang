const express = require('express');
const path = require('path');
const app = express();
const Router = require('express');
const router = new Router();
const user = require('./models/user')

app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'styles')));

app.use(express.static(path.join(__dirname, 'pictures')));

router.post('/register', async (req, res) => {

    try {
    const User = new user({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })

    //User.save()
    res.render('Test')

   } catch (e) {
    console.log(e)
   }
})

module.exports = router;