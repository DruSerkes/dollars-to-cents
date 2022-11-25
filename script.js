const dollarInput = document.querySelector('input[name=dollars]');
const quarters = document.querySelector('span[name=quarters]');
const dimes = document.querySelector('span[name=dimes]');
const nickels = document.querySelector('span[name=nickels]');
const pennies = document.querySelector('span[name=pennies]');
const form = document.querySelector('form');
const error = document.querySelector('#error');

const numberFormatter = new Intl.NumberFormat();

const setQuarters = (text) => quarters.textContent = text;
const setDimes = (text) => dimes.textContent = text;
const setNickels = (text) => nickels.textContent = text;
const setPennies = (text) => pennies.textContent = text;
const setError = (text) => error.textContent = text;


const revealCoins = () => {
  quarters.parentElement.classList.replace('hide', 'show');
  dimes.parentElement.classList.replace('hide', 'show');
  nickels.parentElement.classList.replace('hide', 'show');
  pennies.parentElement.classList.replace('hide', 'show');
};

const resetOutputs = () => {
  setError('');
  setQuarters('0');
  setDimes('0');
  setNickels('0');
  setPennies('0');
};

const convertDollarsToCoins = (value) => {
  const convertedInput = value * 100;

  const quarters = Math.floor(convertedInput / 25);
  let remainder = Math.round(convertedInput % 25);

  const dimes = Math.floor(remainder / 10);
  remainder = Math.round(remainder % 10);

  const nickels = Math.floor(remainder / 5);
  remainder = Math.round(remainder % 5);

  return { quarters, dimes, nickels, remainder };
};

const handleCalculate = (e) => {
  e.preventDefault()
  const { value } = dollarInput;
  if (isNaN(Number(value))) return setError('Please enter a valid number with no symbols (e.g 6.49)');
  if (Number(value) < 0) return setError('Dollar value must be a positive float value');

  resetOutputs();
  const { quarters, dimes, nickels, remainder } = convertDollarsToCoins(value);

  setQuarters(numberFormatter.format(quarters.toString()));
  setDimes(dimes.toString());
  setNickels(nickels.toString());
  setPennies(remainder.toString());

  revealCoins();
};

form.addEventListener('submit', handleCalculate);