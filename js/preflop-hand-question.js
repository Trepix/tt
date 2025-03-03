const config = {
    all_active_container_answer_selector: ".actions-answer-container:not(.hidden) .action-answer",
    answer_class: "action-answer",
    getTable: function () { return preflopTable }
}

function paintHand() {
    const hand = document.getElementById('hand');
    hand.classList.add(paintClass(preflopTable.get(hand.innerText)));
}

function clearHandPaint() {
    const hand = document.getElementById('hand');
    clearAction(hand);
}

function restartToNewQuestion() {
    clearAll();
    newQuestion();
}

document.addEventListener('keydown', function (event) {
    if (event.key === '3') {
        changeTable("3h")
    }
    if (event.key === 'h'  || event.key === 'H') {
        changeTable("hu")
    }
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
    if (event.key === 'ArrowUp') {
        const limitFunc = (_s) => 0
        const valueFunc = (limit, current) => Math.max(limit, current - 1)
        changeOption(limitFunc, valueFunc);
    }
    if (event.key === 'ArrowDown') {
        const limitFunc = (s) => s.options.length - 1
        const valueFunc = (limit, current) => Math.min(limit, current + 1)
        changeOption(limitFunc, valueFunc);
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

function changeOption(limitFunc, valueFunc) {
    const selector = document.getElementById('stack-size');
    const current = selector.selectedIndex;
    const limit = limitFunc(selector);
    const newValue = valueFunc(limit, current)
    selector.selectedIndex = newValue;
    selector.dispatchEvent(new Event('change'));
}

function changeTable(desired_table) {
    // 'false' -> 3h    'true' -> hu
    const selector = document.getElementById('table-toggle');
    const current_table = selector.checked ? 'hu' : '3h'

    if (desired_table != current_table) selector.click();
}

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