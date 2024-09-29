
function text(hand) { return hand.slice(0, 2); }

const Actions = Object.freeze({
    PAINT: 0,
    CLEAR: 1
});

const table = document.getElementById('cardMatrix');

let painting = { isDragging: false, action: null };

function clearAll() {
    Array.from(document.getElementsByClassName("card-cell")).forEach(cell => {
        clear(cell)
    }
    );
}


function repaint() {
    document.getElementById('cardMatrix').childNodes.forEach(cell => {
        if (isPainted(cell)) {
            clear(cell);
            show(cell);
        }
    });
}

function showAll() {
    Array.from(document.getElementsByClassName("card-cell")).forEach(cell => {
        show(cell)
    }
    );
}

function isPainted(cell) {
    return cell.className.split(' ').some(c => c.includes('paint'))
}

function changeState(cell) {
    if (isPainted(cell)) {
        clear(cell)
    }
    else show(cell)
}

function changeTo(cell, action) {
    if (action == Actions.CLEAR) {
        clear(cell)
    }
    else {
        show(cell)
    }
}

function isCardElement(element) {
    return element.classList.contains('card-cell')
}

table.addEventListener('mousedown', (e) => {
    if (isCardElement(e.target)) {
        painting.isDragging = true;
        painting.action = isPainted(e.target) ? Actions.CLEAR : Actions.PAINT;
        changeState(e.target);
    }
});

document.addEventListener('mouseup', () => {
    painting.isDragging = false;
    painting.action = null;

});

table.addEventListener('mouseover', (e) => {
    if (painting.isDragging && isCardElement(e.target)) {
        changeTo(e.target, painting.action)
    }
});

document.getElementById('clear-all').addEventListener('click', (e) => {
    clearAll();
});

document.getElementById('show-all').addEventListener('click', (e) => {
    showAll()
});
