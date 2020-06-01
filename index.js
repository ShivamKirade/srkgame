var gamePattern = [];
var color = ["red", "blue", "green", "yellow"];
var userPattern = [];
var level = 0;
var started = false;
var session = false;

$("#start").click(function() {
  if (!started) {
    $("#level-title").html("Level-" + level);

    started = true;
    session = true;
    $("#start").html("Enjoy!!!");

    buttonChange("btn-primary");
    nextSequence();


  }
});

$(".bt").click(function() {
  if (session) {
    var userColor = $(this).attr('id');
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length - 1);
  }
});


function nextSequence() {
  userPattern = [];

  $("#level-title").html("level-" + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomcolor = color[randomNumber];
  gamePattern.push(randomcolor);

  $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomcolor);

}

function checkAnswer(level) {
  if (gamePattern[level] === userPattern[level]) {


    if (gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 800);
    }
  }
  //Wrong Answer
   else {

    $("#level-title").html("Game Over!!! Press restart to play again");

    // add and remove class
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

    playSound("wrong");
    startOver();

  }
}

//Effecsts
function startOver() {
  $("#start").html("Restart Game");
  gamePattern = [];
  userPattern=[];
  started = false;
  session = false;
  level = 0;
  buttonChange("btn-danger");
  return;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  return;
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass('pressed');
  }, 100);
  return;
}
function buttonChange(classes){
  $('#start').removeClass(function(){
    var hasclass1=$("#start").hasClass("btn-success");
    var hasclass2=$("#start").hasClass("btn-primary");
    var remove;
    if(hasclass1){
      remove="btn-success";
          return remove;
    }else if(hasclass2)
    {
      remove="btn-primary";
        return remove;
      }else{
        remove="btn-danger";
        return remove;
      }

  }).addClass(classes);
  return;
}
