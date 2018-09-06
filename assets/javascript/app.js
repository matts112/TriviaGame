$(document).ready(function () {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0;
    var answered = false;
    var correct;
    var triviaGame = [{
        question: "the Neon Genesis Evangelion seris is set in a futuristic",
        answer: ["Seol", "Shanghai", "Tokyo", "Osaka"],
        correct: "3",
        image: ("assets//images/Characters_of_Evangelion.jpg")
    }, {
        question: "What is the name of the series protagonist?",
        answer: ["shinji", "Asuka", "Misato", "Gendo"],
        correct: "1",
        image: ("assets//images/Shinjiprofil.jpg")
    }, {
        question: "What is the name of the orginization that Shinji is recruited by?",
        answer: ["NERV", "RCX", "HEAT", "BAA"],
        correct: "1",
        image: ("assets//images/384425-111847-nerv.jpg")
    }];

    function startGame() {
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false;
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
           
            if (id === correct) {
                answered = true;
                
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswers();
            } else {
                answered = true;
                
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);

            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE' + timeRemaining + 'SECONDS TO CHOOSE');
        }
    }

    function correctAnswers() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswers() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersALL').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">');
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000);
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.anaswerImage').remove();
                $('.answers').append('<h4 class= answerAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answerAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answerAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});