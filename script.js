// Переменные для отслеживания состояния калькулятора
let currentInput = ''; // Текущий ввод
let previousValue = null; // Предыдущее значение
let currentOperation = null; // Текущая операция

// Получаем нужные элементы
const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

// Обновляем дисплей калькулятора
function updateDisplay() {
  if (currentInput === '') {
    display.textContent = previousValue !== null ? previousValue : '0';
  } else {
    display.textContent = currentInput;
  }
}

// Обработка нажатия цифр
digitButtons.forEach(btn => {
  btn.addEventListener('click', handleDigitClick.bind(null, btn));
});

// Обработка нажатия кнопки точки
document.querySelectorAll('.digit').forEach(btn => {
  if (btn.textContent === '.') {
    btn.addEventListener('click', handleDecimalClick);
  }
});

// Обработка выбора математической операции
operatorButtons.forEach(btn => {
  btn.addEventListener('click', handleOperatorClick.bind(null, btn));
});

// Обработка нажатия кнопки "="
equalsButton.addEventListener('click', handleEqualsClick);

// Обработка сброса калькулятора (AC)
clearButton.addEventListener('click', handleClearClick);

// Добавляем прослушивание событий клавиатуры
window.addEventListener('keydown', handleKeyboardEvents);

// Обновляем дисплей при старте
updateDisplay();

// 🔧 Функции-обработчики

// Обработка нажатия цифры
function handleDigitClick(btn) {
  if (currentInput.length > 10) return; // Ограничиваем длину числа
  if (currentInput === '0') currentInput = ''; // Удаляем лишний ноль
  currentInput += btn.textContent;
  updateDisplay();
}

// Обработка нажатия точки
function handleDecimalClick() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

// Обработка выбора операции
function handleOperatorClick(btn) {
  if (currentInput === '') return; // Пропускаем пустое значение
  if (previousValue === null) {
    previousValue = parseFloat(currentInput);
  } else {
    previousValue = compute(previousValue, parseFloat(currentInput), currentOperation);
  }
  currentOperation = btn.dataset.op;
  currentInput = '';
  updateDisplay();
}

// Обработка нажатия кнопки "="
function handleEqualsClick() {
  if (currentOperation && currentInput !== '') {
    previousValue = compute(previousValue, parseFloat(currentInput), currentOperation);
    currentInput = '';
    currentOperation = null;
    updateDisplay();
  }
}

// Обработка сброса калькулятора (AC)
function handleClearClick() {
  currentInput = '';
  previousValue = null;
  currentOperation = null;
  updateDisplay();
}

// Математическая функция для вычислений
function compute(a, b, operation) {
  switch (operation) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) {
        alert("Ошибка: деление на ноль");
        return a;
      }
      return a / b;
    default: return b;
  }
}

// 🌐 Обработка событий клавиатуры
function handleKeyboardEvents(event) {
  event.preventDefault(); // Блокируем дефолтное поведение клавиш (для безопасности)

  const keyCode = event.key;

  // 🔢 Обработка цифр
  if (/^\d$/.test(keyCode)) {
    const digitButton = Array.from(digitButtons).find(b => b.textContent === keyCode);
    if (digitButton) handleDigitClick(digitButton);
  }

  // 🕵️‍♀️ Обработка специальных символов
  switch (event.key) {
    case '+': 
      handleOperatorClick(document.querySelector(`[data-op="${event.key}"]`)); 
      break;
    case '-': 
      handleOperatorClick(document.querySelector(`[data-op="${event.key}"]`)); 
      break;
    case '*': 
      handleOperatorClick(document.querySelector(`[data-op="${event.key}"]`)); 
      break;
    case '/': 
      handleOperatorClick(document.querySelector(`[data-op="${event.key}"]`)); 
      break;
    case '=': 
    case 'Enter': 
      handleEqualsClick(); 
      break;
    case '.': 
      handleDecimalClick(); 
      break;
    case 'Escape': 
      handleClearClick(); 
      break;
  }
}