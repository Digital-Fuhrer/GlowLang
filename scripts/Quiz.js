
let questions = [
    {
        numb: 1,
        question: " Как сказать ' я хочу есть ' по-английски? ",
        answer: 0,
        options: [
            "I want to eat",
            "I like to eat",
            "I need to eat",
            "I can eat"
        ]
    },

    {
        numb: 2,
        question: " Как перевести фразу ' It's a piece of cake'? ",
        answer: 1,
        options: [
            "Это кусок торта",
            "Это легко",
            "Это сложно",
            "Это интересно"
        ]
    },

    {
        numb: 3,
        question: " Какая из фраз правильно использует герундий? ",
        answer: 1,
        options: [
            " I enjoy to swim. ",
            " I enjoy swimming. ",
            " I enjoy swim. ",
            " I am enjoying to swim. "
        ]
    },

    {
        numb: 4,
        question: " Какой предлог используется с глаголом 'listen'? ",
        answer: 2,
        options: [
            " On ",
            " In ",
            " To ",
            " For "
        ]
    },
    {
        numb: 5,
        question: " Какой из следующих глаголов не может использоваться в Continuous (непрерывном) времени? ",
        answer: 2,
        options: [
            " Think ",
            " Believe ",
            " Have ",
            " Smell "
        ]
    },
    {
        numb: 6,
        question: " Как правильно использовать артикль в следующей фразе: 'I saw ___ interesting movie yesterday'? ",
        answer: 1,
        options: [
            " An ",
            " A ",
            " The ",
            " No article "
        ]
    },
    {
        numb: 7,
        question: " Как перевести выражение 'to hit the hay'? ",
        answer: 1,
        options: [
            " Бить сено ",
            " Лечь спать ",
            " Ударить сено ",
            " Поиграть в сено "
        ]
    },
    {
        numb: 8,
        question: " Какая фраза содержит правильное прямое дополнение? ",
        answer: 1,
        options: [
            " She gave a present to my brother and I. ",
            " She gave a present to my brother and me. ",
            " She gave a present to my brother and myself. ",
            " She gave a present to my brother and mineself. "
        ]
    },
    {
        numb: 9,
        question: " Какой временной период охватывает Past Perfect Continuous? ",
        answer: 0,
        options: [
            " Длительное действие в прошлом, завершившееся перед другим действием ",
            " Действие в прошлом, происходившее регулярно ",
            " Начало действия в прошлом ",
            " Прошедшее событие без определенного времени "
        ]
    },
    {
        numb: 10,
        question: " Как перевести фразу 'It's high time you left'? ",
        answer: 1,
        options: [
            " Уже высокое время уходить ",
            " Поздно уходить ",
            " Время уходить ",
            " Вам пора уходить "
        ]
    },
    {
        numb: 11,
        question: " Какой видовременной формой является предложение 'By the time I arrive, they will have finished the meeting'? ",
        answer: 0,
        options: [
            " Future Perfect Continuous ",
            " Present Perfect Continuous ",
            " Past Perfect ",
            " Future Continuous "
        ]
    },
    {
        numb: 12,
        question: " Как называется явление, когда один звук в слове влияет на соседний звук, вызывая его изменение? ",
        answer: 0,
        options: [
            "  Assimilation ",
            " Euphony ",
            " Elision ",
            " Dissimilation "
        ]
    },
    {
        numb: 13,
        question: " Какой частью речи является слово 'alacrity'? ",
        answer: 2,
        options: [
            " Глагол ",
            " Прилагательное ",
            " Существительное ",
            " Наречие "
        ]
    },
    {
        numb: 14,
        question: " Как правильно построить вопрос в условном предложении первого типа? ",
        answer: 1,
        options: [
            " If it will rain, what will you do? ",
            " If it rains, what will you do? ",
            " If it rains, what would you do? ",
            " If it rain, what you will do? "
        ]
    },
    {
        numb: 15,
        question: " Как перевести выражение 'to throw in the towel'? ",
        answer: 0,
        options: [
            " Бросить полотенце ",
            " Подбросить полотенце ",
            " Бросить в полотенце ",
            " Бросить в поле "
        ]
    }
]
window.onload = function(){ 
    var selectedLevel = "";   
    let questionCounter = 0; // Счетчик вопросов
    let correctAnswers = 0; // Счетчик правильных ответов
    const startBtn = document.querySelector(".str_btn");
    const quizBox = document.querySelector(".quiz_box");
    const questionText = document.querySelector(".que_text");
    const optionList = document.querySelectorAll(".option");
    const totalQuestions = document.querySelector(".total_que span");
    const nextBtn = document.querySelector(".next_btn"); 
    questionCounter = 0;
    correctAnswers = 0;
    loadQuestion();
    quizBox.classList.add("activeQuiz");
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    // Функция загрузки вопроса
    function loadQuestion() {
        index = 0;
        optionList.forEach((element, index)  => {
            
            element.innerHTML= `<span>${questions[questionCounter].options[index]}</span>`
            index++
            
        });
        questionText.innerHTML = `<div>${questions[questionCounter].question}</div>`
          
          
    }
    let answerSelected = false;
    optionList.forEach((option, index) => {
        option.addEventListener("click", function () {
            if (!answerSelected) {
            const selectedOption = index;
            checkAnswer(questions[questionCounter], selectedOption);
            optionList.forEach((opt) => opt.classList.remove("correct", "incorrect"));
            if (selectedOption === questions[questionCounter].answer) {
                option.classList.add("correct");
              } else {
                option.classList.add("incorrect");
                option.classList.add("correct");
              }
            answerSelected = true;
            console.log(index);
            }
        });
        });
    
    // Функция проверки ответа
    function checkAnswer(question, selectedOption) {
      const userAnswer = selectedOption;
      const correctAnswer = question.answer;
      console.log(userAnswer);
      console.log(correctAnswer);
      if (userAnswer === correctAnswer) {
        correctAnswers++;
        console.log(correctAnswers);
      }
    }
    
    // Функция перехода к следующему вопросу
    function nextQuestion() {
      optionList.forEach((opt) => opt.classList.remove("correct", "incorrect"));
      questionCounter++;
    
      if (questionCounter < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
      answerSelected = false;
    }
    
    // Устанавливаем обработчик клика на кнопку "Следующий Вопрос"
    nextBtn.addEventListener("click", nextQuestion);
    
    // Функция отображения результатов
    function showResult() {
      quizBox.classList.remove("activeQuiz");
      const resultBox = document.querySelector(".result_box");
      resultBox.classList.add("activeResult");

      const scoreText = resultBox.querySelector(".score_text span");

      scoreText.textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
}

document.getElementById('quit').addEventListener('click', function() {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/testResult');
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
    xhr.send('result=' + encodeURIComponent(correctAnswers));
});

}