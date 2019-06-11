var correctAnswerCount = 0;
var time = 31;
var intervalId;
var questionCounter = 0;

var resetTimer = function() {
  time = 31;
};

var intervalStart = function() {
  intervalId = setInterval(function() {
    countDown();
  }, 1000);
};

var intervalClear = function() {
  clearInterval(intervalId);
};

var countDown = function() {
  time--;
  $("#time").text(time);
  if (time === 0) {
    intervalClear();
    incorrectAnswer();
  }
};

var content = [
  {
    question: "Monkshood and wolfsbane are the same plant, also known as what?",
    options: ["Asphodel", "Yarrow", "Aconite", "Gillyweed"],
    correct: "Aconite"
  },
  {
    question:
      "Dumbledore has a scar above his left knee that is a perfect map of what?",
    options: ["Scotland", "Hogwarts", "Stonehenge", "The London Underground"],
    correct: "The London Underground"
  },
  {
    question:
      "The visitor’s entrance to the Ministry of Magic is an abandoned red telephone booth in London. What is the five-digit code you must dial to get in?",
    options: ["6-2-4-4-2", "5-4-3-2-1", "0-7-3-1-0", "1-5-6-3-8"],
    correct: "6-2-4-4-2"
  },
  {
    question:
      "Ginny Weasley bought a pet Pygmy Puff from her older brothers' joke shop. What did she name it?",
    options: ["Geoffrey", "Barnabus", "Theodore", "Arnold"],
    correct: "Arnold"
  },
  {
    question: "What is the max speed for a Firebolt broomstick?",
    options: ["50 mph", "100 mph", "150 mph", "200 mph"],
    correct: "150 mph"
  }
];

var correctAnswer = function() {
  $(".options").off();
  $(".question").empty();
  $(".question").text(
    "Brilliant! The correct answer was " +
      content[questionCounter].correct +
      "."
  );
  correctAnswerCount++;
  questionCounter++;
  if (questionCounter === content.length) {
    setTimeout(function() {
      resetPage();
      $("#replay-btn").show();
      $(".results").text(
        "You got " +
          correctAnswerCount +
          " out of " +
          content.length +
          " correct."
      );
      $("#replay-btn").on("click", function() {
        resetPage();
        resetTimer();
        questionCounter = 0;
        correctAnswerCount = 0;
        nextQuestion();
      });
    }, 4000);
  } else {
    setTimeout(function() {
      nextQuestion();
    }, 4000);
  }
};
var incorrectAnswer = function() {
  $(".options").off();
  $(".question").empty();
  $(".question").text(
    "Uh oh, the correct answer was " + content[questionCounter].correct + "."
  );
  questionCounter++;
  if (questionCounter === content.length) {
    setTimeout(function() {
      resetPage();
      $("#replay-btn").show();
      $(".results").text(
        "You got " +
          correctAnswerCount +
          " out of " +
          content.length +
          " correct."
      );
      $("#replay-btn").on("click", function() {
        resetPage();
        resetTimer();
        questionCounter = 0;
        correctAnswerCount = 0;
        nextQuestion();
      });
    }, 4000);
  } else {
    setTimeout(function() {
      nextQuestion();
    }, 4000);
  }
};

var startGame = function() {
  nextQuestion();
};

var resetPage = function() {
  $(".question").empty();
  $(".buttons").empty();
  $("#replay-btn").hide();
  $(".results").empty();
};

var nextQuestion = function() {
  resetTimer();
  resetPage();
  intervalStart();
  $(".question").text(content[questionCounter].question);
  for (i = 0; i < content[questionCounter].options.length; i++) {
    var answerBtn = $("<button>");
    answerBtn.attr("value", content[questionCounter].options[i]);
    answerBtn.addClass("options btn btn-secondary");
    answerBtn.text(content[questionCounter].options[i]);
    $(".buttons").append(answerBtn);
  }

  $(".options").on("click", function() {
    intervalClear();
    if ($(this).attr("value") === content[questionCounter].correct) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
};

startGame();
