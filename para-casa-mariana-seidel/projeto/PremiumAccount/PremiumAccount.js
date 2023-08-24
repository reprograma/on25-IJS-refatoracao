import Account from "../Account/Account";

class PremiumAccount extends Account {
  transactionLimit;

  constructor() {
    super();
  }

  createAccount(accountNumber, agency, balance, income) {
    const variableLenght = 5;
    const otherVariableLenght = 4;
    const valueIncome = 18000;

    if (income < valueIncome) {
      throw new Error("Renda incompatível com o tipo de conta");
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
}

export default PremiumAccount;