const question= document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [
    {
        question :"Quem foi a primeira pessoa a viajar no Espaço?",
        choice1: "Yuri Gagarin",
        choice2: "A cadela Laika",
        choice3: "Neil Armstrong",
        choice4: "Marcos Pontes",
        answer: 1
    },
    {
        question :"Qual a montanha mais alta do mundo?",
        choice1: "Mauna Kea",
        choice2: "Dhaulagiri",
        choice3: "Monte Chimborazo",
        choice4: "Monte Everest",
        answer: 4
    },
    {
        question :"Onde se localiza Machu Picchu?",
        choice1: "Colômbia",
        choice2: "Peru",
        choice3: "China",
        choice4: "Bolívia",
        answer: 2
    }
];

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [... questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(avaliableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        ///go to end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    document.getElementById("question").innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    avaliableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{      
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

       /// const classToApply = "incorrect";
       /// if (selectedAnswer == currentQuestion.answer){
       ///     classToApply = "correct";
       /// }

        const classToApply = selectedAnswer ==currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);


    });
});

startGame();