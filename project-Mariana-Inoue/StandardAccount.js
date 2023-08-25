const { BankAccount } = require("./BankAccount");

class StandardAccount extends BankAccount {
  #monthIncome = 4999.00;
  dailyLimit
  constructor(
    client,
    bank,
    accountNumber,
    agencyNumber,
    typeAccount,
    monthIncome, 
    dailyLimit
  ) {
    super(client, bank, accountNumber, agencyNumber, typeAccount);
    this.#monthIncome = monthIncome;
    this.dailyLimit = this.dailyLimit 
  }
  get monthIncome() {
    return this.#monthIncome;
  }

  get monthIncome() {
    return this.#monthIncome;
  }

  dailyTransactions() {
    if(this.typeAccount === 'Standard'){
    this.#monthIncome <= this.dailyLimit
    console.log('transação permitida')
    }
  }
}

module.exports = { StandardAccount };
