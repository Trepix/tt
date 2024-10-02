document.body.addEventListener('dblclick', (e) => {
    const handClasses = document.getElementById('hand').classList;
    const isAnswered = handClasses.contains("correct-answer") || handClasses.contains("wrong-answer")
    if (isAnswered) restartToNewQuestion()
})

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

document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        document.getElementById('f').click();
    }
    if (event.key === 'c' || event.key === 'C') {
        document.getElementById('clear-all').click();
    }
    if (event.key === 's' || event.key === 'S') {
        document.getElementById('show-all').click();
    }
    if (event.key == " " ) {
        event.preventDefault();
        const doubleClickEvent = new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.body.dispatchEvent(doubleClickEvent);
    }
});

document.getElementById('hand').innerText = generateHand()
document.getElementById('hand').addEventListener('click', (e) => {
    restartToNewQuestion()
})

Array.from(document.getElementsByClassName('action-answer')).forEach(function (element) {
    element.addEventListener('click', (e) => {
        showAll();
        isCorrectAnswer(e.target.id == preflopTable.get(hand.innerText))
    })
});