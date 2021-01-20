// Declare Variables
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var questionContainer = document.querySelector("#question-container");
var container = document.querySelector(".container");
var questionEl = document.querySelector("#questions");
var answerEl = document.getElementById("answer-buttons");
var welcomeEl = document.getElementsByClassName("welcome");
var timerEl = document.getElementById("timer");
var scoreList = document.querySelector(".score-list");
var scoreContainer = document.querySelector(".scores");
// console.log(scoreList);
// console.log(scoreContainer);
var currentQuestion = 0;
var correctAnswers = 0;
var secondsLeft = 0;
// Can I populate an array to store the scores and initials, then output after the five questions have been displayed/answered by users?
var highScores = [];
var timerInterval = 0;

//let, variable you can change, can't change const
var shuffleQuestions;

//Start Quiz
startButton.addEventListener("click", startGame);

//Fat arrow functions are concise ways of writing functions
nextButton.addEventListener("click", () => {
  // increment through classes and display
  currentQuestion++;
  setNextQuestion();
});

function startGame() {
  setTime();
  // hide the start button at the beginnning of the quiz
  startButton.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  // currentQuestion = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function displayQuestion() {
  answerEl.innerHTML = "";
  questionEl.innerText = questions[currentQuestion].question;
  // there are always 4 possible choices for each question
  for (var i = 0; i < 4; i++) {
    // display buttons and text
    var button = document.createElement("button");
    console.log(button);
    button.innerText = questions[currentQuestion].answer[i];
    button.classList.add("btn");
    answerEl.appendChild(button);
  }
}

//could link to HTML instead
//could index or try to use something to target the value of objects in an array
var questions = [
  {
    question: "Commonly used datatypes include all of the following, except: ",
    answer: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
  },
  {
    question: "What function do you use to run the same code block?",
    answer: ["For Loop", "Switch Statement", "If-Else", "Break Statement"],
    correctAnswer: "For Loop",
  },
  {
    question: "What is a loop that never ends referred to as?",
    answer: ["For Loop", "Infinite Loop", "While Loop", "Recursive Loop"],
    correctAnswer: "Infinite Loop",
  },
  {
    question: "Arrays in JavaScript can be used store: ",
    answer: [
      "Booleans",
      "Other arrays",
      "Numbers and Strings",
      "All listed possibilities",
    ],
    correctAnswer: "All listed possibilities",
  },
  {
    question: "You've got this one. Free question: ",
    answer: ["Wrong", "Pick this one", "Nope", "Do not click"],
    correctAnswer: "Pick this one",
  },
];

//Shuffle questions
function setNextQuestion() {
  resetState();
  displayQuestion(shuffleQuestions[currentQuestion]);
}

//Display 60 second timer once the quiz starts
var secondsLeft = 60;
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    // display timer
    timerEl.textContent = secondsLeft + " seconds remaining";
    console.log(secondsLeft);
    // if the score reaches 0, the interval should clear
    if (secondsLeft <= 0) {
      secondsLeft = 0;
      timerEl.textContent = secondsLeft + " seconds remaining";
      console.log(secondsLeft);
      // if(secondsLeft === 0){

      // }
    }
  }, 1000);
}

function resetState() {
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

//Check Users Answer and Display Pop-Up Message
function checkAnswer(event) {
  if (!event.target.matches(".btn")) {
    return;
  }
  var userAnswer = event.target.innerText;
  if (userAnswer === questions[currentQuestion].correctAnswer) {
    alert("You got it!");
    correctAnswers++;
  } else {
    alert("That was wrong, but it's ok.");
    secondsLeft = secondsLeft - 4;
  }

  // function clearTime() {
  //   clearInterval(timerInterval);
  // }

  if (shuffleQuestions.length - 1 === currentQuestion) {
    secondsLeft--;
    // if (secondsLeft === 0) {
    //   clearTime();
    //   alert("Time's Up");
    //   console.log(secondsLeft);
    // }
    timerEl.textContent = secondsLeft + " seconds remaining";
    console.log(secondsLeft);
    // if (secondsLeft === 0) {
    //   clearInterval(secondsLeft);
    //   alert("Time's Up");
    //   console.log("Times Up");
    // }
    timerEl.textContent = secondsLeft + " seconds remaining";
    console.log(secondsLeft);
    var initials = prompt(
      "Congratulations! You scored " +
        correctAnswers +
        ". Please enter your initials."
    );
    console.log(initials);
    // Store the users initials and score in local storage
    if (initials.length > 0 && initials !== null) {
      var userScore = {
        userInitials: initials,
        userScore: correctAnswers,
      };
      var storedScores = JSON.parse(localStorage.getItem("highScores"));
      if (storedScores !== null) {
        highScores = storedScores;
      }
      highScores.push(userScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      renderScores();
    } else {
      alert("Cannot Save Your Score");
    }
  } else {
    currentQuestion++;
    displayQuestion();
  }

  // Display the users initials and score at the end of the quiz
  function renderScores() {
    scoreContainer.classList.remove("hide");
    container.classList.add("hide");
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
      highScores = storedScores;
    }
    for (var i = 0; i < highScores.length; i++) {
      // var theScore = highScores[i];
      var li = document.createElement("li");
      li.textContent =
        highScores[i].userInitials + ": " + highScores[i].userScore;
      li.className = "list-group-item";
      scoreList.appendChild(li);
    }
  }
}

answerEl.addEventListener("click", checkAnswer);
