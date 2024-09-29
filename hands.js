document.body.addEventListener('dblclick', (e) => {
    const handClasses = document.getElementById('hand').classList;
    const isAnswered = handClasses.contains("correct-answer") || handClasses.contains("wrong-answer")
    if (isAnswered) restartToNewQuestion()
})

function isCorrectAnswer(answer) {
    const hand = document.getElementById('hand')
    document.getElementById(hand.innerText).classList.add("selected")
    if (answer) hand.classList.add("correct-answer")
    else hand.classList.add("wrong-answer")
}

function newQuestion() {
    document.getElementById('hand').classList.remove("wrong-answer", "correct-answer")
    document.getElementById(hand.innerText).classList.remove("selected")
    document.getElementById('hand').innerText = generateHand()
}

function restartToNewQuestion() {
    clearAll();
    newQuestion();
}

function unselect(cell) {
    cell.classList.remove("selected");
}