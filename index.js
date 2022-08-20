console.log("hello world!");
var started = false;
buttonColors = ["red", "green", "yellow", "blue"];
var level = 0;
gamePattern = [];
userClickedPattern = [];

//order of sequence
function nextSequence() {
  userClickedPattern = [];
  var num = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[num];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  checkAnswer(level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//checking user's clicks!
$(".btn").on("click", function (e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setInterval(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start the game

$(document).on("keypress", function (e) {
  if (started == false) {
    nextSequence();
    started = true;
  }
});

//checking whether the given answer is true or false
function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over")
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press any key to continue...");
    startover();
  }
}

//restarting the game
function startover() {
  started = false;
  level = 0;
  gamePattern = [];
}