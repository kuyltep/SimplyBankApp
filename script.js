'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-10-09T07:43:59.331Z',
    '2021-10-11T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  // currency: 'CAD',
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];
console.log(accounts);
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const getDaysBetweenTwoDate = (date1, date2) =>
    Math.trunc(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const transacs = sort
    ? account.transactions.slice().sort((a, b) => a - b)
    : account.transactions;
  transacs.forEach(function (trans, index) {
    const date = new Date(account.transactionsDates[index]);
    const datePassed = getDaysBetweenTwoDate(new Date(), date);
    const transactionRow = `
    <div class="transactions__row">
          <div class="transactions__type ${
            trans > 0
              ? 'transactions__type--deposit'
              : 'transactions__type--withdrawal'
          }">
            ${index + 1} ${trans > 0 ? 'депозит' : 'вывод средств'}
          </div>
          <div class="transactions__date">${
            datePassed === 0
              ? 'Today'
              : datePassed === 1
              ? 'Yesterday'
              : datePassed <= 7
              ? `${datePassed} days ago`
              : new Intl.DateTimeFormat(account.locale).format(date)
          }</div>
          <div class="transactions__value">${trans.toFixed(2)}$</div>
        </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

function createNicnames(arr) {
  arr.forEach(
    account =>
      (account.nickName = account.userName
        .toLowerCase()
        .split(' ')
        .map(item => item[0])
        .join(''))
  );
}

createNicnames(accounts);
console.log(accounts);

function printBalance(account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  labelBalance.innerHTML = balance + '$';
  account.balance = balance.toFixed(2);
}

function changeUI(account) {
  displayTransactions(account);
  displayTotal(account);
  printBalance(account);
}

function displayTotal(account) {
  const totalDeposit = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  const totalWithdrew = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  const totalInterest = account.transactions
    .filter(trans => trans > 0)
    .map(trans => (trans * account.interest) / 100)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumIn.innerHTML = totalDeposit.toFixed(2) + '$';
  labelSumOut.innerHTML = Math.abs(totalWithdrew.toFixed(2)) + '$';
  labelSumInterest.innerHTML = totalInterest.toFixed(2) + '$';
}
// displayTotal(account1);
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const now = new Date();
  currentAccount = accounts.find(
    acc => acc.nickName === inputLoginUsername.value
  );
  // const locale = navigator.language;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  labelDate.innerHTML = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.innerHTML = `Welcome, ${currentAccount.userName}`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    changeUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transfetAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    acc => acc.nickName === recipientNickname
  );
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    recipientAccount &&
    transfetAmount > 0 &&
    transfetAmount <= currentAccount.balance &&
    recipientAccount?.nickName !== currentAccount.nickName
  ) {
    recipientAccount.transactions.push(transfetAmount);
    currentAccount.transactions.push(-transfetAmount);
    recipientAccount.transactionsDates.push(new Date().toISOString());
    currentAccount.transactionsDates.push(new Date().toISOString());
    changeUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.pin === +inputClosePin.value &&
    inputCloseUsername.value === currentAccount.nickName
  ) {
    const deleteAccountIndex = accounts.findIndex(
      acc => acc.nickName === inputCloseUsername.value
    );
    accounts.splice(deleteAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.innerHTML = 'Войдите в свой аккаунт';
    inputClosePin.value = '';
    inputCloseUsername.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= loanAmount / 10)
  ) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    changeUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

let areTransSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !areTransSorted);
  areTransSorted = !areTransSorted;
});
const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', function () {
  [...document.querySelectorAll('.transactions__row')].forEach(function (
    row,
    i
  ) {
    if (i % 3 === 0) {
      row.style.backgroundColor = 'grey';
    }
  });
});
