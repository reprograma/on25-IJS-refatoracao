class Account {
  accountNumber;
  agency;
  balance;
  pixKeys;
  income;

  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = { cpf: undefined, email: undefined, telefone: undefined };
    Account.all.push(this);
  }

  destroy() {
    const index = Account.all.indexOf(this);
    if (index !== -1) {
      Account.all.splice(index, 1);
    }
  }

  static all = [];

  static createAccount(accountNumber, agency, balance) {
    if (accountNumber && agency && accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      return new Account(accountNumber, agency, balance);
    }
    throw new Error("Invalid data for account creation");
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
    return (this.accountNumber = accountNumber);
  }

  setAgency(agency) {
    return (this.agency = agency);
  }

  setBalance(value) {
    this.balance += value;
    return this.balance;
  }

  deposit(value) {
    if (typeof value !== "number") {
      throw new Error("Cannot deposit non-numeric values");
    }
    if (value <= 0) {
      throw new Error("Cannot deposit negative or zero values");
    }
    this.balance += value;
  }

  createPixKey(keyValue, keyType) {
    const regexMap = {
      cpf: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      telefone:
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
    };

    if (regexMap[keyType].test(keyValue)) {
      this.pixKeys[keyType] = keyValue;
      return `Pix key ${keyType} created successfully`;
    }
    throw new Error(`Invalid ${keyType} for pix key`);
  }

  withdraw(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Invalid withdrawal value");
    }

    if (this.balance - value < 0) {
      throw new Error("Insufficient balance");
    }

    this.balance -= value;
    return value;
  }

  static findAccountByNumberAndAgency(accountNumber, agency) {
    return Account.all.find(
      (account) =>
        account.getAccountNumber() === accountNumber &&
        account.getAgency() === agency
    );
  }

  transfer(value, accountNumber, agency) {
    const validAccount = Account.findAccountByNumberAndAgency(
      accountNumber,
      agency
    );

    if (!validAccount) {
      throw new Error("Account not found");
    }

    if (value <= 0) {
      throw new Error("Invalid transfer value");
    }

    if (this.balance - value < 0) {
      throw new Error("Insufficient balance");
    }

    validAccount.setBalance(value);
    this.balance -= value;
    return "Transfer successful";
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.all.find(
      (account) => account.pixKeys[keyType] === pixKey
    );

    if (!validAccount) {
      throw new Error("Pix key not found");
    }

    if (value <= 0) {
      throw new Error("Invalid pix value");
    }

    if (this.balance - value < 0) {
      throw new Error("Insufficient balance");
    }

    this.balance -= value;
    validAccount.setBalance(value);
    return "Pix successful";
  }
}

export default Account;
