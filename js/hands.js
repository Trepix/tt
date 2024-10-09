function isCorrectAnswer(answer) {
    const hand = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.add("selected")
    hand.classList.add(paintClass(preflopTable.get(hand.innerText)));

    if (answer) hand.classList.add("correct-answer")
    else hand.classList.add("wrong-answer")
}

function newQuestion() {
    const handElement = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.remove("selected")

    clearAction(handElement);
    handElement.classList.remove("wrong-answer", "correct-answer")
    handElement.innerText = generateHand()
}

function restartToNewQuestion() {
    clearAll();
    newQuestion();
}

function unselect(cell) {
    cell.classList.remove("selected");
}

function clickAnswer(value) {
    const maybeElement = document.querySelectorAll(`.actions-answer-container:not(.hidden) .action-answer[value="${value}"]`);
    if (maybeElement.length > 0) maybeElement[0].click();  
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'f' || event.key === 'F') {
        clickAnswer("f");
    }
    if (event.key === 'x' || event.key === 'X') {
        clickAnswer("x");
    }
    if (event.key === 'c' || event.key === 'C') {
        clickAnswer("c");
        clickAnswer("x");
    }
    if (event.key === 'a' || event.key === 'A') {
        clickAnswer("all-in");
        clickAnswer("os");
    }
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

function getAnswerContainer(group) {
    return document.getElementById(`${group}-actions-answer-container`);
}

function groupSimilarActions(group) {
    switch (group) {
        case "bb-btn-l":
        case "bb-btn-l-sb-c":
            return "bb-sb-l"
        case "bb-btn-l-sb-iso":
        case "bb-btn-mr":
            return "sb-btn-mr"
        default:
            return group;
    }
}

function reloadQuestionContainer() {
    const answers = document.querySelectorAll(`[id$="actions-answer-container"]`);
    answers.forEach(a => a.classList.add("hidden"));

    const group = getDataFile().split('_').slice(2, -1).join("-");
    const similarGroup = groupSimilarActions(group);

    const container = getAnswerContainer(similarGroup);

    if (container != undefined) {
        container.classList.remove("hidden");
    }
    else getAnswerContainer("complete").classList.remove("hidden");
};

document.getElementById('hand').innerText = generateHand();
document.getElementById('hand').addEventListener('click', (e) => {
    restartToNewQuestion()
});

document.body.addEventListener('dblclick', (e) => {
    const handClasses = document.getElementById('hand').classList;
    const isAnswered = handClasses.contains("correct-answer") || handClasses.contains("wrong-answer")
    if (isAnswered) restartToNewQuestion()
})

Array.from(document.getElementsByClassName('action-answer')).forEach(function (element) {
    element.addEventListener('click', (e) => {
        showAll();
        isCorrectAnswer(e.target.getAttribute('value') == preflopTable.get(hand.innerText))
    })
});