class GoldAccount extends Account {
  constructor() {
    super();
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    this.validateAccount(accountNumber, agency, balance);
    this.validateIncome(income);

    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.income = income;

    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findValidAccount(accountNumber, agency);
    this.validateTransaction(value);

    if (this.balance - value < 0) {
      throw new Error("Você não possui saldo suficiente");
    }

    validAccount.setBalance(value);
    this.balance -= value;
    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findValidPixAccount(pixKey, keyType);
    this.validateTransaction(value);

    if (this.balance - value < 0) {
      throw new Error("Você não possui saldo suficiente");
    }

    this.balance -= value;
    validAccount.setBalance(value);
    return "Pix feito com sucesso";
  }

  validateAccount(accountNumber, agency, balance) {
    if (accountNumber.length !== 5 || agency.length !== 4 || balance <= 0) {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  validateIncome(income) {
    if (income < 5000 || income > 17999.99) {
      throw new Error("Renda incompatível com o tipo de conta");
    }
  }

  validateTransaction(value) {
    if (value < 0) {
      throw new Error("Valor inválido de transação");
    }

    if (value > this.transactionLimit) {
      throw new Error("O seu limite de transação é de 1000 reais");
    }
  }

  findValidAccount(accountNumber, agency) {
    const validAccount = Account.all.find((account) => {
      return (
        account.getAccountNumber() === accountNumber &&
        account.getAgency() === agency
      );
    });

    if (!validAccount) {
      throw new Error("Conta não encontrada");
    }

    return validAccount;
  }

  findValidPixAccount(pixKey, keyType) {
    const validAccount = Account.all.find((account) => {
      return account.pixKeys[keyType] === pixKey;
    });

    if (!validAccount) {
      throw new Error("Chave pix não encontrada");
    }

    return validAccount;
  }
}

export default GoldAccount;
