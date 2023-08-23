import Account from "../Account/Account";

class StandardAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
    this.transactionLimit = 1000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (income > 4999) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber=accountNumber;
      this.agency=agency;
      this.balance=balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }
    const response = super.transfer(value, accountNumber, agency);
    return response;
  }

  pix(value, pixKey, keyType) {
    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }
    const response = super.pix(value, pixKey, keyType);
    return response;
  }
}

export default StandardAccount;