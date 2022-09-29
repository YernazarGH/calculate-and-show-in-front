let start = document.getElementById('start'), // получить кнопку "начать расчет"
    budgetValue = document.getElementsByClassName('budget-value')[0], // получить все блоки со значением value
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'), // получить все input с class expenses-item
    expensesItemBtn = document.getElementsByTagName('button')[0], // получить первые три кнопки при помощи тега
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('#income'), // получить оставшиеся поля
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'); // получить поля необязательных расходов


    /*
//при помощи цикла найти первые три кнопки 
let btn = document.getElementsByTagName('button');
*/
let money,
    time;

start.addEventListener('click', function () {  // События для получения данных от пользователя
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате ГГГГ-ММ-ДД");
    while(isNaN(money) || money == '' || money == null ) {
        money = +prompt("Ваш бюджет на месяц?", "");
    };
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value= new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', function() { // События для определения обязательных рассходов
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        
        if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b  && a.length <50 ) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        };
    };
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {  // События для определения необязательных расходов   
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    };
});

countBudgetBtn.addEventListener('click', function() {   // События дневного бюджета и уровня достатка
    if(appData.budget == undefined) {
        daybudgetValue.textContent = 'Error';
        levelValue.textContent = 'Error';
    }else{
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        
        if (appData.moneyPerDay < 200) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 200 && appData.moneyPerDay < 3000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 3000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        };
    };
});

chooseIncome.addEventListener('input', function() { // Событие по определению дополнительного дохода
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if(appData.savings == false) {
        appData.savings = true;
    }else{
        appData.savings = false;
    }
});

chooseSum.addEventListener('change', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.mothlyIncome = (((sum/100)/12)*percent);
        appData.yaerIncome = ((sum/100)*percent);
        monthsavingsValue.textContent = appData.mothlyIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yaerIncome.toFixed(1);
    }else{
        monthsavingsValue.textContent = 'error';
        yearsavingsValue.textContent = 'error';
    }
});

choosePercent.addEventListener('change', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.mothlyIncome = (((sum/100)/12)*percent);
        appData.yaerIncome = ((sum/100)*percent);
        monthsavingsValue.textContent = appData.mothlyIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yaerIncome.toFixed(1);
    }else{
        monthsavingsValue.textContent = 'error';
        yearsavingsValue.textContent = 'error';
    }
});

let appData = {                     // основной обьект где храняться данные пользователя
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};
