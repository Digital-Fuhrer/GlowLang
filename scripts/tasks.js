const xhr = new XMLHttpRequest();

window.onload = function()
{

function getRandomInRange(max) {
    return Math.floor(Math.random() * max);
  }

const taskText = document.querySelector(".taskText");
const errText = document.querySelector(".errorText");
const rightText = document.querySelector(".rightText");
const answers = document.querySelectorAll(".answer");
const answersText = document.querySelectorAll(".text");

const monsterImage = document.querySelector('.monsterImage')
const monsterBars = document.querySelectorAll('.bar-monster')
const allyBars = document.querySelectorAll('.bar-ally')

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
  console.log('Новый вопрос')
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
      checkAnswer(selectedAnswer);
      console.log(isActive)
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
          xhr.send('result=' + encodeURIComponent(incorrectAnswers));
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




}

