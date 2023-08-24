import Account from "../Account/Account";

class GoldAccount extends Account {
  transactionLimit;

  constructor() {
    super();
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    const variableLenght = 5;
    const otherVariableLenght = 4;
    const valueIncome = 5000;
    const otherValueIncome = 17999.99;
    
    if (income < valueIncome || income > otherValueIncome) {
      throw new Error("Renda incompatível com o tipo de conta")
    }

    if (accountNumber.length === variableLenght && agency.length === otherVariableLenght && balance > 0) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      this.income = income;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    if (value > this.transactionLimit) {
      throw new Error("O seu limite de transação é de 1000 reais");
    }
    return super.transfer(value, accountNumber, agency);
  }

  pix(value, pixKey, keyType) {
    if (value > this.transactionLimit) {
      throw new Error("O seu limite de transação é de 1000 reais");
    }
    return super.pix(value, pixKey, keyType);
  }
}

export default GoldAccount;