import AccountRefactored from "../Account/AccountRefactored";

class StandardAccountRefactored extends AccountRefactored {
  transactionLimit;
  
  constructor(accountNumber, agency, balance) {
    super(accountNumber, agency, balance);
    this.transactionLimit = 1000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income > 4999) {
      throw new Error("Renda incompatível com o tipo de conta")
    }

    super.createAccount(accountNumber, agency, balance);
    this.income = income;
  }

  valueLowerThanLimit(value){
    return value > this.transactionLimit;
  }

  transfer(value, accountNumber, agency) {
    super.transfer(value, accountNumber, agency);

    if (this.valueLowerThanLimit(value) === false) {
        throw new Error("O seu limite de transação é de 1000 reais");
    }
  }

  pix(value, pixKey, keyType) {
    super.pix(value, pixKey, keyType);

    if (this.valueLowerThanLimit(value) === false) {
      throw new Error("O seu limite de transação é de 1000 reais");
    }
  }
}

export default StandardAccountRefactored;