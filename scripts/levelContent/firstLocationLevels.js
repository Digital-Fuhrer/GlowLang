let questions = [
    {
        number: 1,
        question: 'Как перевести слово "дом" на английский язык?',
        answers: [
            "house",
            "car",
            "tree",
            "book"
        ],
        answer:0
    },
    {
        number: 2,
        question: 'Выбери правильный перевод фразы "Как тебя зовут?" на английский язык.',
        answers: [
            "What's your name?",
            "How old are you?",
            "Where are you from?",
            "How are you?"
        ],
        answer:0
    },
    {
        number: 3,
        question: 'Как правильно перевести слово "стул" на английский язык?',
        answers: [
            "table",
            "bed",
            "chair",
            "desk"
        ],
        answer:2
    },
    {
        number: 4,
        question: 'Выбери правильный перевод слова "Пожалуйста" на английский язык.',
        answers: [
            "Please",
            "Thank you",
            "Goodbye",
            "Hello"
        ],
        answer:0
    }
]

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const taskText = document.querySelector(".taskText");

