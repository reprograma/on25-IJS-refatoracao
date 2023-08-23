import AccountRefactored from "../Account/AccountRefactored";

class GoldAccountRefactored extends AccountRefactored {
  transactionLimit;
  
  constructor(accountNumber, agency, balance) {
    super(accountNumber, agency, balance);
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income < 5000 || income > 17999.99) {
        throw new Error("Renda incompatível com o tipo de conta");
    }

    super.createAccount(accountNumber, agency, balance);
    this.income = income;
  }

  valueLowerThanLimit(value){
    return value > this.transactionLimit;
  }

  transfer(value, accountNumber, agency) {
    super.transfer(value, accountNumber, agency);

    if (valueLowerThanLimit(value) === false) {
      throw new Error ("O seu limite de transação é de 1000 reais");
    }
  }

  pix(value, pixKey, keyType) {
    super.pix(value, pixKey, keyType);

    if (valueLowerThanLimit(value) === false) {
      throw new Error ("O seu limite de transação é de 1000 reais");
    }
  }
}

export default GoldAccountRefactored;