import Account from "../Account/Account";

class GoldAccount extends Account {
  constructor() {
    super();
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    if (!this.isIncomeCompatible(income)) {
      // Utiliza método para validar renda compatível
      throw new Error("Renda incompatível com o tipo de conta");
    }

    if (this.isValidAccountData(accountNumber, agency, balance)) {
      // Utiliza método para validar dados da conta
      this.initializeAccount(accountNumber, agency, balance, income); // Utiliza método para inicializar a conta
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findAccountByNumberAndAgency(
      accountNumber,
      agency
    ); // Utiliza método para buscar conta

    this.validateTransaction(value); // Utiliza método para validar a transação

    if (this.balance - value >= 0) {
      validAccount.deposit(value); // Utiliza método para depositar em conta válida
      this.withdraw(value); // Utiliza método para sacar da conta atual
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findAccountByPixKey(pixKey, keyType); // Utiliza método para buscar conta por chave PIX

    this.validateTransaction(value); // Utiliza método para validar a transação

    if (this.balance - value >= 0) {
      this.withdraw(value); // Utiliza método para sacar da conta atual
      validAccount.deposit(value); // Utiliza método para depositar na conta válida
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  // Método para validar se a renda é compatível com uma conta Gold
  isIncomeCompatible(income) {
    return income >= 5000 && income <= 17999.99;
  }

  // Método para validar dados da conta
  isValidAccountData(accountNumber, agency, balance) {
    return accountNumber.length === 5 && agency.length === 4 && balance > 0;
  }

  initializeAccount(accountNumber, agency, balance, income) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.income = income;
  }

  // Método para buscar conta por número e agência
  findAccountByNumberAndAgency(accountNumber, agency) {
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

  // Método para buscar conta por chave PIX
  findAccountByPixKey(pixKey, keyType) {
    const validAccount = Account.all.find((account) => {
      return account.pixKeys[keyType] === pixKey;
    });

    if (!validAccount) {
      throw new Error("Chave pix não encontrada");
    }

    return validAccount;
  }

  // Método para validar a transação
  validateTransaction(value) {
    if (value > this.transactionLimit) {
      throw new Error("O seu limite de transação é de 1000 reais");
    }

    if (value < 0) {
      throw new Error("Valor inválido de transação");
    }
  }
}

export default GoldAccount;
