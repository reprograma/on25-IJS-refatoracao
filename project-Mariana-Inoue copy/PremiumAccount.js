
const { BankAccount } = require("./BankAccountCopy");

class PremiumAccount extends BankAccount {
    showAccount() {
      console.log("INGRESSO NORMAL");
      super.showAccount();
    }
  }


module.exports = PremiumAccount;


