var questionEl = document.querySelector(".question");
var optionEl = document.querySelectorAll(".options"); //returns all nodes with class .options

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let timerCount = 0;
let availableQuestions = [];
// create function
var quizformHandler = function (event) {
  event.preventDefault();
};
