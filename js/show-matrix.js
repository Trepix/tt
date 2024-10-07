
const button = document.getElementById('show-table');
const lateralPanel = document.getElementById('lateral-panel');


const showTable = (e) => {
    e.preventDefault();
    table.style.display = 'grid';
    lateralPanel.style.display = 'none';
    button.style.display = 'none';
};

const hideTable = () => {
    table.style.display = 'none';
    lateralPanel.style.display = 'block';
    button.style.display = 'block';
};

// Add event listeners for desktop
button.addEventListener('mousedown', showTable);
button.addEventListener('mouseup', hideTable);

// Add event listeners for mobile
button.addEventListener('touchstart', showTable);
button.addEventListener('touchend', hideTable);