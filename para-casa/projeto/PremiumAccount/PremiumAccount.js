import Account from "../Account/Account";

class PremiumAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income < 18000) {
      throw new Error("Renda incompatível com o tipo de conta");
    }    
    this.income = income;
    return super.createAccount(accountNumber, agency, balance);
  }

  transfer(value, accountNumber, agency) {
    return super.transfer(value, accountNumber, agency);
  }

  pix(value, pixKey, keyType) {
    return super.pix(value, pixKey, keyType);
  }
}

export default PremiumAccount;