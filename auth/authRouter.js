const express = require('express');
const path = require('path');
const app = express();
const Router = require('express');
const router = new Router();
const User = require('./models/user')
const {check, validationResult} = require('express-validator')
const bodyParser = require('body-parser');

app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'styles')));

app.use(express.static(path.join(__dirname, 'pictures')));

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/register', [

    check( 'name', 'Имя не может быть пустым.').notEmpty(),
    check( 'name', 'Имя должно быть больше 4 и меньше 12 символов.').isLength({min:4, max: 12}),
    check( 'email', 'Поле email не может быть пустым.').notEmpty(),
    check( 'email', 'Введите корректный Email.').isEmail(),
    check( 'password', 'Пароль не может быть пустым.').notEmpty(),
    check( 'password', 'Пароль должен быть больше 4 символов.').isLength({min:4, max: 50}),
    check( 'passwordConfirm', 'Подтвердите пароль.').notEmpty(),
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('registration' , {
                registText: errors.array()[0].msg,
                errorColor: 'loginTitleError'
            })

        } else {

                const { email ,name, password, passwordConfirm} = req.body;

                const candidate = await User.findOne({email})

                if (candidate) {
                    return res.render('registration' , {
                        registText: "Такой пользователь уже зарегистрирован.",
                        errorColor: 'loginTitleError'
                    })
                } 
                if (password !== passwordConfirm) {
                    return res.render('registration' , {
                        registText: "Пароли не совпадают.",
                        errorColor: 'loginTitleError'
                    })
                }

            const user = new User({
                email: email,
                name: name,
                password: password
            })

            await user.save()
            console.log('Пользователь зарегистрирован')
            res.redirect('/loginPage')
    }   
   } catch (e) {
    console.log(e)
   }
})

router.post('/login', [
    
    check( 'email', 'Поле email не может быть пустым.').notEmpty(),
    check( 'email', 'Введите корректный Email.').isEmail(),
    check( 'password', 'Пароль не может быть пустым.').notEmpty(),

], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('loginPage' , {
                loginText: errors.array()[0].msg,
                errorColor: 'loginTitleError'
            })
        }

        const { email, password, name} = req.body;

        const registeredUser = await User.findOne({email})

        if (!registeredUser) {
            return res.render('loginPage' , {
                loginText: 'Пользователя с таким Email нет.',
                errorColor: 'loginTitleError'
            })
        } 
        if (registeredUser.password !== password) {
            return res.render('loginPage' , {
                loginText: 'Неверный пароль.',
                errorColor: 'loginTitleError'
            })
        }
    console.log('Вы успешно вошли.')

        req.session.user = registeredUser
        req.session.isAuthenticated = true;
        req.session.difficult = registeredUser.difficult;
        
        req.session.save(err => {
            if (err) {
                throw err
            } else 
            if (req.session.difficult === 'false') {
            res.render('Test')
            } else {
                res.render('mainMenu');
            }
        })
        
   } catch (e) {
    console.log(e)
   }
})

router.post('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.render('StartPage')
    })
})

router.post('/testResult', urlencodedParser , async (req, res) => {
    const resultTest = req.body.result;
    let diff;
    if (resultTest <= 5 ) 
      {
        diff = "Низкий";
      } else if (resultTest <= 9 )
      {
        diff = "Средний";
      } else if (resultTest <= 15)
      {
        diff = "Высокий";
      }
    const regUser = req.session.user;
    await User.findOneAndUpdate({ email: regUser.email }, { $set: {difficult: diff}}).then(() => {
        console.log(`Ваш уровень знания: ${diff}`)
        res.redirect('mainMenu')
        }
    )
})

router.post('/choice', urlencodedParser , async (req, res) => {
    const resultChoice = req.body.choice
    const regUser = req.session.user;
    await User.findOneAndUpdate({ email: regUser.email }, { $set: {difficult: resultChoice}}).then(() => {
        console.log(`Ваш уровень знания: ${resultChoice}`)
        }
    )
})

module.exports = router;