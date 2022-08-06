class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting balance:', myAccount.balance);

// First withdrawal should fail
t1 = new Withdrawal(50.25, myAccount);
console.log('Committed? ', t1.commit());
console.log('Transaction 1:', t1);

console.log('My account balance:', myAccount.balance);

// Deposit
t2 = new Deposit(120.00, myAccount);
console.log('Committed? ', t2.commit());
console.log('Transaction 2:', t2);

console.log('My account balance:', myAccount.balance);

// 2nd withdrawal should succeed
t3 = new Withdrawal(9.99, myAccount);
console.log('Committed? ', t3.commit());
console.log('Transaction 3:', t3);

console.log('Ending balance:', myAccount.balance);
