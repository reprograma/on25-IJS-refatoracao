import Account from "../Account/Account";

class PremiumAccount extends Account {
  constructor() {
    super();
  }

  createAccount(accountNumber, agency, balance, income) {
    if (!this.isIncomeCompatible(income) || !this.isValidAccountData(accountNumber, agency, balance)) {
      throw new Error("Renda incompatível ou dados inválidos para cadastro");
    }

    this.initializeAccount(accountNumber, agency, balance, income);
    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findValidAccount(accountNumber, agency);
    this.validateOperation(value);

    validAccount.setBalance(value);
    this.adjustBalance(-value);

    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findValidPixAccount(pixKey, keyType);
    this.validateOperation(value);

    this.adjustBalance(-value);
    validAccount.setBalance(value);

    return "Pix feito com sucesso";
  }

  isIncomeCompatible(income) {
    return income >= 18000;
  }

  isValidAccountData(accountNumber, agency, balance) {
    return accountNumber.length === 5 && agency.length === 4 && balance > 0;
  }

  initializeAccount(accountNumber, agency, balance, income) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.income = income;
  }

  findValidAccount(accountNumber, agency) {
    const validAccount = Account.all.find((account) => (
      account.getAccountNumber() === accountNumber && account.getAgency() === agency
    ));

    if (!validAccount) {
      throw new Error("Conta não encontrada");
    }

    return validAccount;
  }

  validateOperation(value) {
    if (value < 0 || this.balance - value < 0) {
      throw new Error("Operação inválida: saldo insuficiente ou valor negativo");
    }
  }

  adjustBalance(amount) {
    this.balance += amount;
  }
}

export default PremiumAccount;
