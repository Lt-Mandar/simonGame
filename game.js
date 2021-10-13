//creating array of color sequence for buttons
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// create a new pattern
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+ randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
  level ++;
  $("#level-title").text("Level " + level);
  // console.log(gamePattern);
}

function clickHandler(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
    // console.log(currentColour);

}

// play audio based on variable name

function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function firstKeyPress(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
      console.log("Sucess");
    }

  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").click(clickHandler);
$(document).keypress(firstKeyPress);
