export const transactionsArray = (transactions, type) => {
  switch (type) {
    case 'income':
      return transactions
        .map(transaction => transaction.amount)
        .filter(item => item > 0);
    case 'expense':
      return transactions
        .map(transaction => transaction.amount)
        .filter(item => item < 0);
    default:
      return transactions.map(transaction => transaction.amount);
  }
};

export const transactionsSum = (transactions, type) => {
  switch (type) {
    case 'income':
      return transactions
        .map(transaction => transaction.amount)
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
    case 'expense':
      return transactions
        .map(transaction => transaction.amount)
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0);
    case 'all':
    default:
      return transactions
        .map(transaction => transaction.amount)
        .reduce((acc, item) => acc + item, 0);
  }
};

export const expenseByClassification = (transactions, classification) => {
  return Math.abs(
    transactions
      .filter(transaction => transaction.amount < 0)
      .filter(transaction => transaction.classification === classification)
      .map(item => item.amount)
      .reduce((acc, item) => acc + item, 0)
  ).toFixed(2);
};

export const incomeByClassification = (transactions, classification) => {
  return transactions
    .filter(transaction => transaction.amount > 0)
    .filter(transaction => transaction.classification === classification)
    .map(item => item.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
};
