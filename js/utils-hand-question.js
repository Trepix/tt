function isCorrectAnswer(answerElement) {
    const table = config.getTable();
    const hand = document.getElementById('hand')
    const isCorrect = answerElement.getAttribute('value') == table.get(hand.innerText)
    document.getElementById(hand.innerText).classList.add("selected")
    paintHand();

    const correctAction = table.get(hand.innerText);
    Array.from(document.querySelectorAll(`${config.all_active_container_answer_selector}[value="${correctAction}"]`))[0]
        .classList.add("correct-answer")

    if (isCorrect) {
        hand.classList.add("correct-answer-frame")
    }
    else {
        hand.classList.add("wrong-answer-frame")
        answerElement.classList.add("wrong-answer");
    }
}

function clickAnswer(value) {
    const maybeElement = document.querySelectorAll(`${config.all_active_container_answer_selector}[value="${value}"]`);
    if (maybeElement.length > 0) maybeElement[0].click();
}

function newQuestion() {
    const handElement = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.remove("selected")

    restoreAnswersApparence();

    clearHandPaint();
    handElement.classList.remove("wrong-answer-frame", "correct-answer-frame")
    handElement.innerText = generateHand()
    return handElement.innerText;
}

function reduceAnswersOpacity() {
    const answers = Array.from(document.querySelectorAll(`${config.all_active_container_answer_selector}`));
    answers.forEach(el => el.classList.add("non-selected-answer"))
}

function restoreAnswersApparence() {
    const answers = Array.from(document.querySelectorAll(`${config.all_active_container_answer_selector}`));
    answers.forEach(el => el.classList.remove("non-selected-answer", "correct-answer-frame", "wrong-answer-frame", "correct-answer","wrong-answer"));
}

function isAnswered() {
    const handClasses = document.getElementById('hand').classList;
    return handClasses.contains("correct-answer-frame") || handClasses.contains("wrong-answer-frame")
}

document.getElementById('hand').innerText = generateHand();
document.getElementById('hand').addEventListener('click', (e) => {
    restartToNewQuestion()
});

document.body.addEventListener('dblclick', (e) => {
    const handClasses = document.getElementById('hand').classList;
    if (isAnswered()) restartToNewQuestion()
})

Array.from(document.getElementsByClassName(config.answer_class)).forEach(function (element) {
    element.addEventListener('click', (e) => {
        if (!isAnswered()) {
            showAll();
            reduceAnswersOpacity();
            isCorrectAnswer(e.target)
        }
    })
});