import Account from "../Account/Account";

class GoldAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income < 5000 || income > 17999.99) {
      throw new Error("Renda incompatível com o tipo de conta");
    }
    this.income = income;    
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

export default GoldAccount;