//arrray of questions, choices, and right answers;   
var questions = [{
  title: "What was Bassnectars banned festival in CO?",
  choices: ["Das Energi", "BassCenter", "Bonnaroo", "EDC"],
  answer: "BassCenter"
},
{
  title: "Where is Lost Lands?",
  choices: ["Ohio", "North Dakota", "Las Vegas", "Not charted in USA"],
  answer: "Ohio"
},
{
  title: "Back in 2017 who threw the ninja nation tour?",
  choices: ["Alison-Wonderland", "Datsik", "PartyFavor", "Tiesto"],
  answer: "Datsik"
},
{
  title: "Who has some of the most insane shows?",
  choices: ["Alison-Wonderland", "Bassnectar", "PrettyLights", "All-of-the-above"],
  answer: "All-of-the-above"
},
{
  title: "What stage did they just finnish deconstucting in CO?",
  choices: ["Denver-Collesium", "Western-Complex", "Red-Rocks", "The-Mission"],
  answer: "Red-Rocks"
},
{
  title: "Where is Das Energi?",
  choices: ["Utah", "Kansas", "Arkansas", "None of the above"],
  answer: "Utah"
},
{
  title: "Where is Electric Forest?",
  choices: ["Wisconsin", "Ohio", "Michigan", "Flordia"],
  answer: "Michigan"
},
{
  title: "Where is Lollapalooza?",
  choices: ["Colorado", "Flordia", "Chicago", "Michigan"],
  answer: "Chicago"
},
{
  title: "Where is Nocturnal Wonderland?",
  choices: ["Colorado", "Seattle", "California", "Arkansas"],
  answer: "California"
},
{
  title: "Where is Dancefestopia?",
  choices: ["Tennessee", "Kansas", "Chicago", "Michigan"],
  answer: "Kansas"
}
]

//setting the numerical var for functions;

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once there is a click function to start the game;
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  //end the game function when timer is at 0;
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}

//stop the timer to end the game and clear interval timer 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 10 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
  JavaScript Quiz!
</h1>
<h3>
  Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 5seconds from the timer if incorrect answer is choosen;
function incorrect() {
timeLeft -= 5; 
next();
}

//increases the score by 10points if the user chooses the correct answer;
function correct() {
score += 10;
next();
}

//loops through the questions 1 by 1;
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
  if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}