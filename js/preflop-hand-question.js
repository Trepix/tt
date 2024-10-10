function isCorrectAnswer(answerElement) {
    const hand = document.getElementById('hand')
    const isCorrect = answerElement.getAttribute('value') == preflopTable.get(hand.innerText)
    document.getElementById(hand.innerText).classList.add("selected")
    hand.classList.add(paintClass(preflopTable.get(hand.innerText)));

    const correctAction = preflopTable.get(hand.innerText);
    Array.from(document.querySelectorAll(`.actions-answer-container:not(.hidden) .action-answer[value=${correctAction}]`))[0]
        .classList.add("correct-answer")

    if (isCorrect) {
        hand.classList.add("correct-answer-frame")
    }
    else {
        hand.classList.add("wrong-answer-frame")
        answerElement.classList.add("wrong-answer");
    }
}

function newQuestion() {
    const handElement = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.remove("selected")

    restoreAnswersApparence();

    clearAction(handElement);
    handElement.classList.remove("wrong-answer-frame", "correct-answer-frame")
    handElement.innerText = generateHand()
}

function restartToNewQuestion() {
    clearAll();
    newQuestion();
}

function reduceAnswersOpacity() {
    const answers = Array.from(document.querySelectorAll(`.actions-answer-container:not(.hidden) .action-answer`));
    answers.forEach(el => el.classList.add("non-selected-answer"))
}

function restoreAnswersApparence() {
    const answers = Array.from(document.querySelectorAll(`.actions-answer-container:not(.hidden) .action-answer`));
    answers.forEach(el => el.classList.remove("non-selected-answer", "correct-answer-frame", "wrong-answer-frame", "correct-answer","wrong-answer"));
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
        case "3h-bb-btn-l":
        case "3h-bb-btn-l-sb-c":
            return "3h-bb-sb-l"
        case "3h-bb-btn-l-sb-iso":
        case "3h-bb-btn-mr":
        case "3h-bb-btn-mr-sb-3bet":
        case "3h-bb-btn-mr-sb-c":
        case "hu-bb-sb-mr":
            return "3h-sb-btn-mr"
        default:
            return group;
    }
}

function reloadQuestionContainer() {
    const answers = document.querySelectorAll(`[id$="actions-answer-container"]`);
    answers.forEach(a => a.classList.add("hidden"));

    const group = getDataFile().split('_').slice(1, -1).join("-");
    const similarGroup = groupSimilarActions(group);

    const container = getAnswerContainer(similarGroup);

    if (container != undefined) {
        container.classList.remove("hidden");
    }
    else getAnswerContainer("complete").classList.remove("hidden");
};

function isAnswered() {
    const handClasses = document.getElementById('hand').classList;
    return handClasses.contains("correct-answer-frame") || handClasses.contains("wrong-answer-frame")
}

document.getElementById('hand').innerText = generateHand();
document.getElementById('hand').addEventListener('click', (e) => {
    restartToNewQuestion()
});

document.body.addEventListener('dblclick', (e) => {
    if (isAnswered()) restartToNewQuestion()
})

Array.from(document.getElementsByClassName('action-answer')).forEach(function (element) {
    element.addEventListener('click', (e) => {
        if (!isAnswered()) {
            showAll();
            reduceAnswersOpacity();
            isCorrectAnswer(e.target)
        }
    })
});