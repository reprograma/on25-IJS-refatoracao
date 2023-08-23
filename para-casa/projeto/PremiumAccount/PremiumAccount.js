import Account from "../Account/Account";

class PremiumAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income < 18000) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber=accountNumber;
      this.agency=agency;
      this.balance = balance;
      this.income = income;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    const response = super.transfer(value, accountNumber, agency);
    return response;
  }

  pix(value, pixKey, keyType) {
    const response = super.pix(value, pixKey, keyType);
    return response;
  }
}

export default PremiumAccount;