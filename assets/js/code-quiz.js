// Quiz page elements
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var optionEl = document.querySelectorAll("[data-number]"); //returns all nodes with data attribute [data-number]

//Input Score Page Elements
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");

//View High Scores Page Elements =============================
const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");

/// View High Scores and Timer count
var viewHighScoresEl = document.querySelector("#ViewScore");
var timerEl = document.querySelector("#timer");

let currentQuestion = 0;
let acceptingAnswers = true;
let score = 0;
let timerCount = 0;
var highScores = [];
var interval;
let availableQuestions = [];
// create function
var quizformHandler = function (event) {
  //event.preventDefault();
  // start timer on page load
  hide(inputScoreEl);
  hide(highScoresEl);
  startTimer();
  renderQuestion();
};

// starts Timer function
var startTimer = function () {
  interval = setInterval(function () {
    timerCount++;

    var minutes = parseInt(timerCount / 60, 10);
    var seconds = parseInt(timerCount % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // display timer in minutes and seconds
    timerEl.textContent = minutes + ":" + seconds;
  }, 1000);
};

// render question from question.js (array of questions)
var renderQuestion = function () {
  hide(inputScoreEl);
  hide(highScoresEl);
  // get question from questions array question.js
  questionEl.textContent = questions[currentQuestion].question;

  for (i = 0; i < optionEl.length; i++) {
    var optionText = questions[currentQuestion].options[i];

    optionEl[i].innerHTML =
      optionText +
      `<input type="radio" name="radio" id="${i}"/><span class="checkmark"></span>`;
  }
};

//function for calling next question

var nextQuestion = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    stopTimer();
    console.log(score);
    userScoreEl.textContent = score;
    hide(quizEl);
    show(inputScoreEl);
    timerEl.textContent = 0;
  }
};
// check answers from questions.js with selected option
//checks answer based on current question and updates the user score
function checkAnswer(selectedAnswer) {
  if (
    questions[currentQuestion].answer ===
    questions[currentQuestion].options[selectedAnswer.dataset.number]
  ) {
    score += 3;
    console.log("correct");
    displayMsg("Correct!");
  } else {
    console.log("wrong");
    displayMsg("Wrong!");
  }
}
// stops timer
function stopTimer() {
  clearInterval(interval);
}

//Display message for correct and wrong answers
var displayMsg = function (msg) {
  var checkEl = document.querySelector("#Check");
  checkEl.textContent = msg;

  setTimeout(() => {
    checkEl.textContent = "";
  }, 2000);
};

// hide element
var hide = (element) => {
  element.style.display = "none";
};
// show element
var show = (element) => {
  element.style.display = "block";
};

// render scores .html page
var renderScorePage = () => {
  localStorage.setItem("scores", score);
  //go to the end page
  //return window.location.assign("./scores.html");
  renderHighScores();
};
//reset local variables
function reset() {
  score = 0;
  currentQuestion = 0;
  timerEl.textContent = 0;
}

//Renders high scores stored in local storage
function renderHighScores() {
  // Clear content
  scoresEl.innerHTML = "";
  show(highScoresEl);
  //console.log(highScores);
  highScores = JSON.parse(localStorage.getItem("scores"));
  for (let i = 0; i < highScores.length; i++) {
    let scoreItem = document.createElement("div");
    // scoreItem.className += "";
    console.log(scoreItem);
    scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
    scoreItem.textContent = `${i + 1}. ${highScores[i].username} - ${
      highScores[i].userScore
    }`;
    scoresEl.appendChild(scoreItem);
  }
}

// event listeners
//Calls to check answer selected and calls to next question if option is clicked
optionEl.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (e.target.matches("label")) {
      checkAnswer(e.target);
      nextQuestion();
    }
  });
});

//displays high scores
viewHighScoresEl.addEventListener("click", function () {
  hide(quizEl);
  hide(inputScoreEl);
  renderHighScores();
  stopTimer();
  reset();
});

//Creates a user score object to push to the local storage scores array calls to display high scores
//calls to render high scores
submitInitialsBtnEl.addEventListener("click", function () {
  let initValue = initialsEl.value.trim();
  if (initValue) {
    let userScore = { username: initValue, userScore: score };
    initialsEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    console.log(highScores);
    highScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    hide(inputScoreEl);
    renderHighScores();
    reset();
  }
});

//store user initials and score when submit button is clicked
//submitButton.addEventListener("click", storeScore);

//Goes back to Welcome page from High scores
goBackBtnEl.addEventListener("click", function () {
  return window.location.assign("./index.html");
});

//Clears saved scores from local storage
// clearScoresBtnEl.addEventListener("click", function () {
//   highScores = [];
//   localStorage.setItem("scores", JSON.stringify(highScores));
//   renderHighScores();
// });
quizformHandler();
