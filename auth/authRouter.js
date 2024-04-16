const express = require('express');
const path = require('path');
const app = express();
const Router = require('express');
const router = new Router();
const User = require('./models/user')
const {check} = require('express-validator')
const {validationResult} = require('express-validator')

app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'styles')));

app.use(express.static(path.join(__dirname, 'pictures')));

router.post('/register', [

    check( 'name', 'Имя не может быть пустым.').notEmpty(),
    check( 'name', 'Имя должно быть больше 4 и меньше 12 символов.').isLength({min:4, max: 12}),
    check( 'email', 'Поле email не может быть пустым.').notEmpty(),
    check( 'email', 'Введите корректный Email.').isEmail(),
    check( 'password', 'Пароль не может быть пустым.').notEmpty(),
    check( 'password', 'Пароль должен быть больше 4 и меньше 12 символов.').isLength({min:4, max: 12}),
    check( 'passwordConfirm', 'Подтвердите пароль.').notEmpty(),
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return console.log(errors)
        }

        const { email ,name, password, passwordConfirm} = req.body;

        const candidate = await User.findOne({email})

        if (candidate) {
            return console.log('User уже есть')
        } 
        if (password !== passwordConfirm) {
            return console.log('Пароли не совпадают')
        }

    const user = new User({
        email: email,
        name: name,
        password: password
    })

    await user.save()
    console.log('Пользователь зарегистрирован')
    res.render('loginPage')
        
   } catch (e) {
    console.log(e)
   }
})

router.post('/login', [
    
    check( 'email', 'Поле email не может быть пустым.').notEmpty(),
    check( 'email', 'Введите корректный Email.').isEmail(),
    check( 'password', 'Пароль не может быть пустым.').notEmpty(),
    check( 'password', 'Пароль должен быть больше 4 и меньше 12 символов.').isLength({min:4, max: 12}),

], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return console.log(errors)
        }

        const { email, password, name} = req.body;

        const registeredUser = await User.findOne({email})

        if (!registeredUser) {
            return console.log('Пользователя с таким Email нет')
        } 
        if (registeredUser.password !== password) {
            return console.log('Пароль неверный.')
        }
    console.log('Вы успешно вошли.')

        req.session.user = registeredUser
        req.session.isAuthenticated = true;
        req.session.save(err => {
            if (err) {
                throw err
            }
            res.render('Test')
        })
        
   } catch (e) {
    console.log(e)
   }
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('StartPage')
    })
})

module.exports = router;