const config = {
    all_active_container_answer_selector: ".stack-answers-container:not(.hidden) .stack-answer",
    answer_class: "stack-answer",
    getTable : function() { return nashTable}
}

function isPairedHand(hand) { return hand == text(hand); }

function paintHand() {
    const hand = document.getElementById("hand").innerText
    const isPair = isPairedHand(document.getElementById("hand").innerText);
    Array.from(document.querySelectorAll(`${config.all_active_container_answer_selector}`))
    .forEach(el => {
        const handColor = isPair && el.value == 20 ? getBBColorByHand(hand) :  getBBColorByStack(el.value);
        el.style.backgroundColor = handColor; 
    });
}

function clearHandPaint() {
    Array.from(document.querySelectorAll(`${config.all_active_container_answer_selector}`))
    .forEach(el => el.style.backgroundColor = '');
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
    Array.from((answersElements)).forEach((element, i) => {
        element.innerText = answers[i];
        element.value = answers[i];
      });
}

function restartToNewQuestion() {
    clearAll()
    const newHand = newQuestion();
    newAnswers(newHand);
}

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

    const array = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
    return [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3].map(e => parseFloat((e/10).toFixed(1)));
};




document.addEventListener('keydown', function (event) {
    // if (event.key === 'f' || event.key === 'F') {
    //     clickAnswer("f");
    // }
    // if (event.key === 'x' || event.key === 'X') {
    //     clickAnswer("x");
    // }
    // if (event.key === 'c' || event.key === 'C') {
    //     clickAnswer("c");
    //     clickAnswer("x");
    // }
    // if (event.key === 'a' || event.key === 'A') {
    //     clickAnswer("all-in");
    //     clickAnswer("os");
    // }
    if (event.key === 'r' || event.key === 'R') {
        document.getElementById('clear-all').click();
    }
    if (event.key === 's' || event.key === 'S') {
        document.getElementById('print-all').click();
    }
    
    if (event.key == " ") {
        event.preventDefault();
        const doubleClickEvent = new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.body.dispatchEvent(doubleClickEvent);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('hand').innerText = generateHand();
    restartToNewQuestion();
});