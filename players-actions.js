const player3HPositions = document.querySelectorAll("#player-3h-position .option");
player3HPositions.forEach(option => {
    option.addEventListener("click", () => {
        if (sbActionKey() != undefined) hideFilter(sbActionKey());

        player3HPositions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        resetFilter("btn-3h");
        if (option.getAttribute("value") == "btn") {
            hideFilter("btn-3h");
            reloadMatrix();
        }
        
    });
});

const btn3HActions = document.querySelectorAll("#btn-3h-action-container .option");
btn3HActions.forEach(option => {
    option.addEventListener("click", () => {
        if (sbActionKey() != undefined) {
            clearFilter(sbActionKey());
            hideFilter(sbActionKey());
        }

        btn3HActions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");

        if (sbActionKey() != undefined) {
            resetFilter(sbActionKey());
        }

        if (playerPosition() != 'bb') {
            reloadMatrix();
        }
        
        
    });
});

const sb3HActions = document.querySelectorAll('[id^="sb-3h"][id$="action-container"] .option');
sb3HActions.forEach(option => {
    option.addEventListener("click", () => {
        sb3HActions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        reloadMatrix();
    });
});

const playerHUPositions = document.querySelectorAll("#player-hu-position .option");
playerHUPositions.forEach(option => {
    option.addEventListener("click", () => {
        resetFilter(sbActionKey());
        if (option.getAttribute("value") == "sb") {
            hideFilter(sbActionKey());
            reloadMatrix();
        }
        playerHUPositions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
    });
});

const sbHUActions = document.querySelectorAll("#sb-hu-action-container .option");
sbHUActions.forEach(option => {
    option.addEventListener("click", () => {
        sbHUActions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
    });
});

function showFilter(name) {
    const nameElement = containerId(name);
    const element = document.getElementById(nameElement);
    element.classList.remove("hidden");
}

function hideFilter(name) {
    const container = containerId(name);
    const containerElement = document.getElementById(container);
    containerElement.classList.add("hidden");
    clearFilter(actionId(name)); 
}

function clearFilter(actionId) {
    const actionsElements = document.querySelectorAll(`#${actionId} .option`);
    actionsElements.forEach(o => o.classList.remove("active"));
}

function resetFilter(name) {
    hideFilter(name);
    showFilter(name);
}

function actionId(name) {
    return name + '-action';
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

function asSelectorName(action, whoDidAction) {
    if (action == undefined) return '';
    if (action == 'f') return '';
    else return `-${whoDidAction}-` + action;
}

function asVarName(action, whoDidAction) {
    if (action == undefined) return '';
    if (action == 'f') return '';
    else return `_${whoDidAction}_` + action;
}

function selectorActionValue(actionSelectorId) {
    const element = document.querySelectorAll(`${actionSelectorId} .option.active`);
    if (element.length == 0) return undefined;
    return element[0].getAttribute("value")

}

function btnAction() {
    const action = selectorActionValue("#btn-3h-action");
    return asVarName(action, 'btn');
}

function sbActionKey() {
    if (playerPosition() != 'bb') return undefined;
    if (getTable() == '3h') {
        const btnActionValue = selectorActionValue("#btn-3h-action")
        if (btnActionValue == undefined) return undefined;
        return 'sb-3h' + asSelectorName(btnActionValue , "btn");
    }
    else {
        return 'sb-hu'
    }
}

function sbAction() {
    const action = selectorActionValue('[id^="sb-3h"][id$="action-container"]');
    return asVarName(action, 'sb');
}
