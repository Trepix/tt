const player3HPositions = document.querySelectorAll("#player-3h-position .option");
player3HPositions.forEach(option => {
    option.addEventListener("click", () => {
        player3HPositions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");

        resetFilter("btn");
        if (option.getAttribute("value") == "btn") {
            hideFilter("btn");
            console.log(getDataFile());
            reloadMatrix();
        }
        hideFilter("sb");
    });
});

const btn3HActions = document.querySelectorAll("#btn-3h-action-container .option");
btn3HActions.forEach(option => {
    option.addEventListener("click", () => {
        btn3HActions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        if (playerPosition() != 'bb') {
            reloadMatrix();
        }
        else {
            resetFilter("sb");
        }
    });
});

const sb3HActions = document.querySelectorAll("#sb-3h-action-container .option");
sb3HActions.forEach(option => {
    option.addEventListener("click", () => {
        sb3HActions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
    });
});

const playerHUPositions = document.querySelectorAll("#player-hu-position .option");
playerHUPositions.forEach(option => {
    option.addEventListener("click", () => {
        playerHUPositions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");

        resetFilter("sb");
        if (option.getAttribute("value") == "sb") {
            hideFilter("sb");
            console.log(getDataFile());
            reloadMatrix();
        }
    });
});

function showFilter(name) {
    const nameElement = containerId(name);
    const element = document.getElementById(nameElement);
    element.classList.remove("hidden");
}

function hideFilter(name) {
    const action = actionId(name);
    const container = containerId(name);
    const containerElement = document.getElementById(container);
    containerElement.classList.add("hidden");

    const actionsElements = document.querySelectorAll(`#${action} .option`);
    actionsElements.forEach(o => o.classList.remove("active"));
}

function resetFilter(name) {
    hideFilter(name);
    showFilter(name);
}

function actionId(name) {
    return name + '-' + getTable() + '-action';
}

function containerId(name) {
    return actionId(name) + '-container';
}

function playerPosition() {
    const selector = `#player-${getTable()}-position .option.active`;

    const position = document.querySelectorAll(selector);
    if (position.length == 0) return undefined;
    return position[0].getAttribute("value");
}

function asVarName(element, prefix) {
    if (element.length == 0) return '';
    const value = element[0].getAttribute("value")
    if (value == 'f') return '';
    else return prefix + element[0].getAttribute("value");
}

function btnAction() {
    const position = document.querySelectorAll("#btn-3h-action .option.active");
    return asVarName(position, '_btn_');
}

function sbAction() {
    const position = document.querySelectorAll("#sb-3h-action .option.active");
    return asVarName(position, '_sb_');
}
