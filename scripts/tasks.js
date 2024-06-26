
const xhr = new XMLHttpRequest();

window.onload = function()
{

  function getUrlVars()
  {
    var vars = [], lvl
    let levelNumber = location.search.substring(1).split("&")
    for(var i = 0; i < levelNumber.length; i++)
    {
        lvl = levelNumber[i].split('=');
        vars.push(lvl[0]);
        vars[lvl[0]] = lvl[1];
    }
    return vars
  }

  var levelNumber =  parseInt(getUrlVars()["level"], 10)
  var oldStars =  parseInt(getUrlVars()["stars"], 10)


function getRandomInRange(max) {
    return Math.floor(Math.random() * max);
  }

const taskText = document.querySelector(".taskText");
const errText = document.querySelector(".errorText");
const rightText = document.querySelector(".rightText");
const answers = document.querySelectorAll(".answer");
const answersText = document.querySelectorAll(".text");

const monsterImage = document.querySelector('.monsterImage')
const allyBars = document.querySelectorAll('.bar-ally')

const monster = document.querySelector('.health-monster')
const boss = document.querySelector('.health-boss')

const sessionLvl = parseInt(document.getElementById('session1').value, 10)

if (levelNumber % 5 == 0) 
{
  monster.remove()
} else if (levelNumber % 5 !== 0) 
{
  boss.remove()
}

const monsterBars = document.querySelectorAll('.bar-monster')
let replay = false;

if (levelNumber < sessionLvl) {replay = true} else {replay = false}


let randomMonster = getRandomInRange(6)
monsterImage.style.background = `url(/monster${randomMonster}.png)`

let correctAnswers = 0;
let incorrectAnswers = 0;
let isActive;
let rand = getRandomInRange(questions.length);
let randomQuestion = questions[rand];
let helpActive = false;
const help = document.querySelectorAll('.help')
const helpBtn = document.querySelector('.questions')


  helpBtn.addEventListener("click", () => {
    if (!helpActive) {
    help.forEach((help) => {
    help.style.opacity = '1'
      })
    helpActive = true;
    } else if (helpActive) {
      help.forEach((help) => {
    help.style.opacity = '0'
          })
    helpActive = false;
    }
  
})

loadQuestion()

function loadQuestion() 
{
  answers.forEach((answer) => {
  answer.classList.remove('wrongAnswer')
  answer.classList.remove('rightAnswer')
  })
  isActive = false;
  //Загрузка текста вопроса и ответов
  errText.style.display = 'none'
  rightText.style.display = 'none'
  taskText.style.display = 'flex'
  taskText.innerText = randomQuestion.question
  answersText.forEach((answer, index) => {
    answer.innerText = randomQuestion.options[index];
      index++;
  });
}
  answers.forEach((answer, index) => {

    answer.addEventListener("click", function () {
      if (isActive === false) {
      const selectedAnswer = index;
      isActive = true;
      if (monsterBars.length == 5) {
      checkAnswer(selectedAnswer)
      } else if (monsterBars.length == 10) {
        checkAnswerBoss(selectedAnswer)
      }
      }
  });

})

  function checkAnswer(selectedAnswer) {

    const correctAnswer = randomQuestion.answer;


    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        console.log('Правильных ответов:' + correctAnswers)
        if (correctAnswers !== 5) {
          randomQuestion = questions[getRandomInRange(questions.length)];

          taskText.style.display = 'none'
          rightText.style.display = 'flex'

          answers[selectedAnswer].classList.add('rightAnswer')

          monsterBars[5 - correctAnswers].classList.add('bar-empty')

          setTimeout( loadQuestion , 2000)
      } else if (correctAnswers === 5) return victory()
      function victory() {

        answers[selectedAnswer].classList.add('rightAnswer')
        monsterBars[0].classList.add('bar-empty')

        taskText.style.display = 'none'
        rightText.innerText = 'Вы успешно ответили на все задания!'
        rightText.style.display = 'flex'
        function redirect() 
        {
          xhr.open('POST', '/levelResult');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  console.log('Text sent successfully');
              } else {
                  console.error('Failed to send text');
              }
          }
          };
          if (!replay) {
          xhr.send('result=' + encodeURIComponent(incorrectAnswers));
          } else if (replay) {
            xhr.send(`result=${incorrectAnswers}` + `&oldStars=${oldStars}` + `&levelNumber=${levelNumber}`);
          }
          setTimeout(() => {
            window.location.href = '/levelComplete'
          }, 500);
        }
        setTimeout(redirect, 1500)
      }
      
    } else if (selectedAnswer !== correctAnswer) {
        incorrectAnswers++;
        console.log('Неправильных ответов:' + incorrectAnswers)
        if (incorrectAnswers !== 5) {
          randomQuestion = questions[getRandomInRange(questions.length)];

          taskText.style.display = 'none'
          errText.style.display = 'flex'

          answers[selectedAnswer].classList.add('wrongAnswer')

          allyBars[5 - incorrectAnswers].classList.add('bar-empty')

          setTimeout( loadQuestion, 2000)

      } else if (incorrectAnswers === 5) return lose()
      function lose() {

        answers[selectedAnswer].classList.add('wrongAnswer')
        allyBars[0].classList.add('bar-empty')

        taskText.style.display = 'none'
        errText.innerText = 'К сожалению вы проиграли!'
        errText.style.display = 'flex'

      } 
    } 

    
  }


  function checkAnswerBoss(selectedAnswer) {
    
    const correctAnswer = randomQuestion.answer;


    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        console.log('Правильных ответов:' + correctAnswers)
        if (correctAnswers !== 10) {
          randomQuestion = questions[getRandomInRange(questions.length)];

          taskText.style.display = 'none'
          rightText.style.display = 'flex'

          answers[selectedAnswer].classList.add('rightAnswer')

          monsterBars[10 - correctAnswers].classList.add('bar-empty')

          setTimeout( loadQuestion , 2000)
      } else if (correctAnswers === 10) return victory()
      function victory() {

        answers[selectedAnswer].classList.add('rightAnswer')
        monsterBars[0].classList.add('bar-empty')

        taskText.style.display = 'none'
        rightText.innerText = 'Вы успешно ответили на все задания!'
        rightText.style.display = 'flex'
        function redirect() 
        {
          xhr.open('POST', '/levelResult');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  console.log('Text sent successfully');
              } else {
                  console.error('Failed to send text');
              }
          }
          };
          if (!replay) {
            xhr.send('result=' + encodeURIComponent(incorrectAnswers));
            } else if (replay) {
              xhr.send('result=' + encodeURIComponent(incorrectAnswers) + '&oldStars=' + encodeURIComponent(oldStars));
            }
          setTimeout(() => {
            if (levelNumber == 30) {
              window.location.href = '/finalPage'
            } else {
              window.location.href = '/levelComplete'
            }
          }, 500);
        }
        setTimeout(redirect, 1500)
      }
      
    } else if (selectedAnswer !== correctAnswer) {
        incorrectAnswers++;
        console.log('Неправильных ответов:' + incorrectAnswers)
        if (incorrectAnswers !== 10) {
          randomQuestion = questions[getRandomInRange(questions.length)];

          taskText.style.display = 'none'
          errText.style.display = 'flex'

          answers[selectedAnswer].classList.add('wrongAnswer')

          allyBars[5 - incorrectAnswers].classList.add('bar-empty')

          setTimeout( loadQuestion, 2000)

      } else if (incorrectAnswers === 10) return lose()
      function lose() {

        answers[selectedAnswer].classList.add('wrongAnswer')
        allyBars[0].classList.add('bar-empty')

        taskText.style.display = 'none'
        errText.innerText = 'К сожалению вы проиграли!'
        errText.style.display = 'flex'

      } 
    } 

    
  }




}

