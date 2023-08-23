import AccountRefactored from "../Account/AccountRefactored";

class PremiumAccountRefactored extends AccountRefactored {
  transactionLimit;

  createAccount(accountNumber, agency, balance, income) {
    if (income < 18000) {
      throw new Error("Renda incompatível com o tipo de conta");
    }

    super.createAccount(accountNumber, agency, balance);
    this.income = income;
  }
}

export default PremiumAccountRefactored;