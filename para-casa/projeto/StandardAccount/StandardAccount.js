import Account from "../Account/Account";

class StandardAccount extends Account {
  static TRANSACTION_LIMIT = 1000;

  createAccount(accountNumber, agency, balance, income) {
    this.validate("Renda incompatível com o tipo de conta", income <= 4999);
    this.validate("Dados inválidos para cadastro", accountNumber.length === 5 && agency.length === 4 && balance > 0);

    this.initializeAccount(accountNumber, agency, balance);
    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    this.validate("O seu limite de transação é de 1000 reais", value > StandardAccount.TRANSACTION_LIMIT);
    const validAccount = this.findValidAccount(accountNumber, agency);

    validAccount.setBalance(value);
    this.adjustBalance(-value);

    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    this.validate("O seu limite de transação é de 1000 reais", value > StandardAccount.TRANSACTION_LIMIT);
    const validAccount = this.findValidPixAccount(pixKey, keyType);

    this.adjustBalance(-value);
    validAccount.setBalance(value);

    return "Pix feito com sucesso";
  }

  validate(message, condition) {
    if (!condition) {
      throw new Error(message);
    }
  }

  initializeAccount(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
  }
}

export default StandardAccount;