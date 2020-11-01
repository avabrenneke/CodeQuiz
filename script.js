const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const timerButton = document.getElementById("startTime");
const display = document.querySelector('#timer');

let Allscores = [];
let timer = null;
let timerInterval = null;

const questions = [
    {
        question: "What is the process of finding and removing errors in a program?", answers: [
            { id: 1, answer: "debugging", correct: true },
            { id: 2, answer: "downloading", correct: false },
            { id: 3, answer: "uploading", correct: false },
            { id: 4, answer: "storing", correct: false }
        ]
    },
    {
        question: "CSS stands for which of the following?", answers: [
            { id: 1, answer: "crazy shadow sheets", correct: false },
            { id: 2, answer: "corrupt styling sets", correct: false },
            { id: 3, answer: "cascading style sheets", correct: true },
            { id: 4, answer: "code storing styles", correct: false }
        ]
    },
    {
        question: "HTML is used to add colors, layout, and fonts.", answers: [
            { id: 1, answer: "True", correct: false },
            { id: 2, answer: "False", correct: true },
        ]
    },
    {
        question: "What was the first programming language?", answers: [
            { id: 1, answer: "Objective-C", correct: true },
            { id: 2, answer: "HTML", correct: false },
            { id: 3, answer: "Javascript", correct: false },
            { id: 4, answer: "Python", correct: false }
        ]
    },
    {
        question: "Who invented Javascript?", answers: [
            { id: 1, answer: "Guido van Rossum", correct: false },
            { id: 2, answer: "Brendan Eich", correct: true },
            { id: 3, answer: "Obama", correct: false },
            { id: 4, answer: "Bjarne Stroustrup", correct: false }
        ]
    },
    {
        question: "Who is considered the first programmer", answers: [
            { id: 1, answer: "Jeff Bezos", correct: false },
            { id: 2, answer: "Bill Gates", correct: false },
            { id: 3, answer: "Larry Page", correct: false },
            { id: 4, answer: "Ada Lovelace", correct: true }
        ]
    },
    {
        question: "What does DOM stand for?", answers: [
            { id: 1, answer: "Document Object Model", correct: true },
            { id: 2, answer: "Document Override Model", correct: false },
            { id: 3, answer: "Document Obtuse Model", correct: false },
            { id: 4, answer: "Document Ordered Model", correct: false }
        ]
    },
    {
        question: "JS is an abbreviation for JQuery.", answers: [
            { id: 1, answer: "True", correct: false },
            { id: 2, answer: "False", correct: true },
        ]
    },
    {
        question: "PHP is an acronym for Hypertext Preprocessor.", answers: [
            { id: 1, answer: "True", correct: true },
            { id: 2, answer: "False", correct: false },
        ]
    },
    {
        question: "The first programmer in the world was a?", answers: [
            { id: 1, answer: "Woman", correct: true },
            { id: 2, answer: "Man", correct: false },
            { id: 3, answer: "Monkey", correct: false },
        ]
    }

];

let currentQuestionPosition = 0;
let currentQuestion = '';
const timeReduction = 10; //seconds
const initialTime = 1; //minutes
let started = false;
let score = 0;
let totalScores = [];

function start() {
    started = true;
    score = 0
    //reset timer
    var timerTime = 60 * initialTime;
    startTimer(timerTime, display)
    //startTime();
    updateScores();

    //reset the question position
    currentQuestionPosition = 0;
    nextQuestion();
}
//Timer
function startTimer(duration, display) {
    timer = duration;
    let minutes, seconds;

    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

//renders a question for display 
function renderQuestion() {
    test = get("test");
}

//Next Question 
function nextQuestion() {
    if (!started) {
        return;
    }
    currentQuestion = questions[currentQuestionPosition];
    if (!currentQuestion) {
        endQuiz();
        return;
    }
   
    //display question
    $('#question').html(currentQuestion.question);


    //display the answers + attach id
    $('#answers').html('');
    currentQuestion.answers.forEach(singleAnswer => {
        $('#answers').append(`<li id='${singleAnswer.id}' class='clickedAnswer'>${singleAnswer.answer}</li>`)
    });
}
function answerQuestion(e) {
    addToScore = false;
    const answerId = e.target.id;
    //find the correct answer from the list of answers
    const correctAnswer = currentQuestion.answers.find(x => x.correct);
    if (correctAnswer.id == answerId) {
        //add to score
        addToScore = true;
        console.log('correct');

    } else {

        reduceTimer();
    }
    showScore(addToScore);
    currentQuestionPosition++;
    nextQuestion();
}

function showScore(addToScore) {
    score = addToScore ? score + 1 : score;
    $('#results').html(score);
    console.log(score);
}

//Time Reduction
function reduceTimer() {
    timer -= timeReduction;
}

//Ending the quiz
function endQuiz() {
    clearInterval(timerInterval);
    timer = null;
    started = false;
    saveInitials();
    showScores();
    updateScores();
    restart();
}
