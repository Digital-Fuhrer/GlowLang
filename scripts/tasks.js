
window.onload = function()
{

function getRandomInRange(max) {
    return Math.floor(Math.random() * max);
  }

const taskText = document.querySelector(".taskText");
const answers = document.querySelectorAll(".answer");
const answersText = document.querySelectorAll(".text");
let correctAnswers = 0;
let randomQuestion = questions[getRandomInRange(questions.length + 1)];

loadQuestion()


function loadQuestion() 
{
  //Загрузка текста вопроса и ответов
  taskText.innerText = randomQuestion.question
  answersText.forEach((answer, index) => {
    answer.innerText = randomQuestion.options[index];
      index++;
  });
}
  answers.forEach((answer, index) => {
    answer.addEventListener("click", function () {
      const selectedAnswer = index;
      checkAnswer(selectedAnswer);
  });
})

  function checkAnswer(selectedAnswer) {

    const correctAnswer = randomQuestion.answer;
  
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      if (correctAnswers !== 5) {
      randomQuestion = questions[getRandomInRange(questions.length + 1)];
      loadQuestion()
      } else if (correctAnswers === 5) window.location.href = '/mainMenu'
    } else if (selectedAnswer !== correctAnswer) {
      console.log('Неверно')
    }

    
  }




}

