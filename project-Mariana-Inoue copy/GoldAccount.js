const { BankAccount } = require("./BankAccountCopy");

class GoldAccount extends BankAccount {
  dailyTransactions;


  constructor(client, accountNumber, agencyNumber, dailyTransactions) {
    super(client, accountNumber, agencyNumber);
    this.dailyTransactions = dailyTransactions;
  }
}
// showAccount() {
//   console.log("conta gold");
//   super.showAccount();
// }
module.exports = { GoldAccount };
