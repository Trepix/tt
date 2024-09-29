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