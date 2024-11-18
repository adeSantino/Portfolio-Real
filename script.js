    // calculator //
function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    const lastChar = display.value.slice(-1);
    if ('+-*/'.includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }
    display.value += operator;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

    // tictactoe
// Initialize variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell clicks
function handleCellClick(index) {
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if there is a winner
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        document.getElementById('message').innerText = 'Draw!';
        isGameActive = false;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    document.getElementById('message').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });
}

// Initialize the game board
function initializeGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'border', 'border-gray-400', 'h-16', 'flex', 'items-center', 'justify-center', 'text-2xl', 'cursor-pointer');
        cell.id = `cell-${i}`;
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }

    document.getElementById('resetButton').addEventListener('click', resetGame);
}

// Start the game
initializeGame();

// Calendar

document.addEventListener('DOMContentLoaded', function () {
    const calendarDays = document.getElementById('calendarDays');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const eventForm = document.getElementById('eventForm');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const events = {}; // Store events

    function renderCalendar(month, year) {
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

        // Previous month's trailing days
        for (let i = 0; i < firstDay; i++) {
            calendarDays.innerHTML += `<div></div>`;
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${month + 1}-${day}`;
            const eventType = events[date]?.type || '';
            const eventText = events[date]?.text || '';
            calendarDays.innerHTML += `<div data-date="${date}">
                ${day}
                ${eventType ? `<span class="event ${eventType}">${eventText}</span>` : ''}
            </div>`;
        }
    }

    function openModal(date) {
        modal.style.display = 'block';
        eventForm.dataset.date = date;
    }

    function closeModalFunction() {
        modal.style.display = 'none';
    }

    function addEvent(event) {
        event.preventDefault();
        const date = eventForm.dataset.date;
        const eventType = document.getElementById('eventType').value;
        const eventText = document.getElementById('eventText').value;
        events[date] = { type: eventType, text: eventText };
        renderCalendar(currentMonth, currentYear);
        closeModalFunction();
    }

    calendarDays.addEventListener('click', function (e) {
        if (e.target.dataset.date) {
            openModal(e.target.dataset.date);
        }
    });

    prevMonth.addEventListener('click', function () {
        currentMonth = currentMonth > 0 ? currentMonth - 1 : 11;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', function () {
        currentMonth = currentMonth < 11 ? currentMonth + 1 : 0;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    closeModal.addEventListener('click', closeModalFunction);
    eventForm.addEventListener('submit', addEvent);
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });

    renderCalendar(currentMonth, currentYear);
});

