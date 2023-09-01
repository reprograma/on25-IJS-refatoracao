import Account from "../Account/Account";

class GoldAccount extends Account {
  static TRANSACTION_LIMIT = 5000;

  constructor() {
    super();
  }

  createAccount(accountNumber, agency, balance, income) {
    if (!this.isValidIncome(income) || !this.isValidAccountData(accountNumber, agency, balance)) {
      throw new Error("Renda incompatível com o tipo de conta ou dados inválidos para cadastro");
    }

    this.initializeAccount(accountNumber, agency, balance, income);
    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findValidAccount(accountNumber, agency);

    if (value > GoldAccount.TRANSACTION_LIMIT || value < 0 || !this.hasSufficientBalance(value)) {
      throw new Error("Transferência inválida ou saldo insuficiente");
    }

    validAccount.deposit(value);
    this.withdraw(value);
    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findValidAccountByPixKey(pixKey, keyType);

    if (value > GoldAccount.TRANSACTION_LIMIT || value < 0 || !this.hasSufficientBalance(value)) {
      throw new Error("Pix inválido ou saldo insuficiente");
    }

    this.withdraw(value);
    validAccount.deposit(value);
    return "Pix feito com sucesso";
  }

  isValidIncome(income) {
    return income >= 5000 && income <= 17999.99;
  }

  isValidAccountData(accountNumber, agency, balance) {
    return accountNumber.length === 5 && agency.length === 4 && balance > 0;
  }

  initializeAccount(accountNumber, agency, balance, income) {
    Object.assign(this, { accountNumber, agency, balance, income });
  }

  findValidAccount(accountNumber, agency) {
    const validAccount = Account.all.find((account) => account.hasAccountNumberAndAgency(accountNumber, agency));
    if (!validAccount) throw new Error("Conta não encontrada");
    return validAccount;
  }

  findValidAccountByPixKey(pixKey, keyType) {
    const validAccount = Account.all.find((account) => account.hasPixKey(pixKey, keyType));
    if (!validAccount) throw new Error("Chave pix não encontrada");
    return validAccount;
  }

  hasSufficientBalance(value) {
    return this.balance - value >= 0;
  }
}

export default GoldAccount;