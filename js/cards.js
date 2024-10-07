const Suits = ["spades", "hearts", "clubs", "diamonds"]
const Values = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateCard() {
    const suit = Suits[randomInteger(0, Suits.length)]
    const value = Values[randomInteger(0, Values.length)]
    return { "value": value, "suit": suit };
}

function generateHand() {
    const firstCard = generateCard();
    do {
        secondCard = generateCard()
    } while (firstCard == secondCard)

    const firstIndex = Values.findIndex(v => v == firstCard.value);
    const secondIndex = Values.findIndex(v => v == secondCard.value);


    if (firstIndex == secondIndex) return firstCard.value + secondCard.value
    const suited = firstCard.suit == secondCard.suit ? 's' : 'o'
    if (firstIndex < secondIndex) return firstCard.value + secondCard.value + suited
    else return secondCard.value + firstCard.value + suited
}