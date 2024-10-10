function isCorrectAnswer(answer) {
    const hand = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.add("selected")

    if (answer) hand.classList.add("correct-answer")
    else hand.classList.add("wrong-answer")
}

function newQuestion(newHand) {
    const handElement = document.getElementById('hand')
    console.log(document.getElementById(handElement.innerText))
    document.getElementById(handElement.innerText).classList.remove("selected")
    clearAction(handElement);
    handElement.classList.remove("wrong-answer", "correct-answer")


    handElement.innerText = newHand
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function newAnswers(newHand) {
    const answers = generateNewAnswers(newHand);
    shuffleArray(answers);
    const answersElements = document.getElementsByClassName("stack-answer");
    Array.from(answersElements).forEach((element, i) => {
        element.innerText = answers[i];
      });
}

function restartToNewQuestion() {
    const newHand = generateHand();
    clearAll();
    newQuestion(newHand);
    newAnswers(newHand);
}

function clickAnswer(value) {
    const maybeElement = document.querySelectorAll(`.actions-answer-container:not(.hidden) .action-answer[value="${value}"]`);
    if (maybeElement.length > 0) maybeElement[0].click();  
}


// document.addEventListener('keydown', function (event) {
//     if (event.key === 'f' || event.key === 'F') {
//         clickAnswer("f");
//     }
//     if (event.key === 'x' || event.key === 'X') {
//         clickAnswer("x");
//     }
//     if (event.key === 'c' || event.key === 'C') {
//         clickAnswer("c");
//         clickAnswer("x");
//     }
//     if (event.key === 'a' || event.key === 'A') {
//         clickAnswer("all-in");
//         clickAnswer("os");
//     }
//     if (event.key === 'r' || event.key === 'R') {
//         document.getElementById('clear-all').click();
//     }
//     if (event.key === 's' || event.key === 'S') {
//         document.getElementById('print-all').click();
//     }
    
//     if (event.key == " ") {
//         event.preventDefault();
//         const doubleClickEvent = new MouseEvent('dblclick', {
//             bubbles: true,
//             cancelable: true,
//             view: window
//         });
//         document.body.dispatchEvent(doubleClickEvent);
//     }
// });

function limit(value) {
    return Math.min(200, Math.max(10, value));
}

function randomBoolean() {
    return randomInteger(0, 100) % 2 == 0;
}


function randomStack() {
    return randomInteger(10, 200);
}

function randomAround(stack) {
    const delta = randomInteger(10, 50);
    const sum = randomBoolean();
    return sum ? limit(stack + delta) : limit(stack - delta);
}

function retryUntilDiff(values, fgen) {
    var genValue = fgen()
    while (values.includes(genValue)) {
        genValue = fgen()
    }
    return genValue;
}

function generateNewAnswers(hand) {
    const correctAnswer = parseInt(parseFloat(nashTable.get(hand)) * 10);
    const randomAroundGen = function() { return randomAround(correctAnswer) }    
    const wrongAnswer1 = (retryUntilDiff([correctAnswer], randomAroundGen))
    const wrongAnswer2 = (retryUntilDiff([correctAnswer, wrongAnswer1], randomStack))
    const wrongAnswer3 = (retryUntilDiff([correctAnswer, wrongAnswer1, wrongAnswer2], randomAroundGen))
    return [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3].map(e => (e/10).toFixed(1));
};


document.getElementById('hand').addEventListener('click', (e) => {
    restartToNewQuestion()
});

document.body.addEventListener('dblclick', (e) => {
    const handClasses = document.getElementById('hand').classList;
    const isAnswered = handClasses.contains("correct-answer") || handClasses.contains("wrong-answer")
    if (isAnswered) restartToNewQuestion()
})

Array.from(document.getElementsByClassName('stack-answer')).forEach(function (element) {
    element.addEventListener('click', (e) => {
        showAll();
        isCorrectAnswer(e.target.innerText == nashTable.get(hand.innerText))
    })
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('hand').innerText = generateHand();
    restartToNewQuestion();
});