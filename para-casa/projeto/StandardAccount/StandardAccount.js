import Account from "../Account/Account";

class StandardAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
    this.transactionLimit = 1000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income > 4999) {
      throw new Error("Renda incompatível com o tipo de conta");
    }
    return super.createAccount(accountNumber, agency, balance);
  }

  transfer(value, accountNumber, agency) {
    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais");
    }
    return super.transfer(value, accountNumber, agency);
  }

  pix(value, pixKey, keyType) {
    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais");
    }    
    return super.pix(value, pixKey, keyType);
  }
}

export default StandardAccount;