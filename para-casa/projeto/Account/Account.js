class Account {
  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    };
    Account.all.push(this);
  }

  static all = [];

  destroy() {
    const index = Account.all.indexOf(this);
    if (index !== -1) {
      Account.all.splice(index, 1);
    }
  }

  createAccount(accountNumber, agency, balance) {
    const isValidData =
      accountNumber.length === 5 && agency.length === 4 && balance > 0;
    if (isValidData) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  getBalance() {
    return this.balance;
  }

  getAgency() {
    return this.agency;
  }

  getAccountNumber() {
    return this.accountNumber;
  }

  setAccountNumber(accountNumber) {
    this.accountNumber = accountNumber;
    return this.accountNumber;
  }

  setAgency(agency) {
    this.agency = agency;
    return this.agency;
  }

  setBalance(value) {
    this.balance += value;
    return this.balance;
  }

  deposit(value) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (value > 0) {
      this.balance += value;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }

  createPixKey(keyValue, keyType) {
    const keyRegex = {
      CPF: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      TELEFONE:
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
    };

    if (keyRegex[keyType].test(keyValue)) {
      this.pixKeys[keyType.toLowerCase()] = keyValue;
      return `Chave pix ${keyType.toLowerCase()} criada com sucesso`;
    } else {
      throw new Error(`Erro, ${keyType.toLowerCase()} inválido`);
    }
  }

  // ... withdraw, transfer, pix methods ...
}

export default Account;
