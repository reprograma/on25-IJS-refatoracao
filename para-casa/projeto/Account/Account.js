class Account {
  static all = [];

  #accountNumber;
  #agency;
  #balance;
  #pixKeys = new Map();

  constructor(accountNumber, agency, balance = 0) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    Account.all.push(this);
  }

  destroy() {
    const index = Account.all.indexOf(this);
    if (index !== -1) {
      Account.all.splice(index, 1);
    }
  }

  get balance() {
    return this.#balance;
  }

  get agency() {
    return this.#agency;
  }

  get accountNumber() {
    return this.#accountNumber;
  }

  deposit(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Valor inválido para depósito");
    }
    this.#balance += value;
  }

  withdraw(value) {
    if (typeof value !== "number" || value <= 0 || this.#balance < value) {
      throw new Error("Valor inválido ou saldo insuficiente para saque");
    }
    this.#balance -= value;
    return value;
  }

  setPixKey(keyType, keyValue) {
    let regex;

    switch (keyType.toUpperCase()) {
      case "CPF":
        regex = /.../; // Use o regex do CPF
        break;
      case "EMAIL":
        regex = /.../; // Use o regex do email
        break;
      case "TELEFONE":
        regex = /.../; // Use o regex do telefone
        break;
      default:
        throw new Error("Tipo de chave inexistente");
    }

    if (!regex.test(keyValue)) {
      throw new Error(`Chave ${keyType} inválida`);
    }

    this.#pixKeys.set(keyType.toUpperCase(), keyValue);
  }

  transfer(value, targetAccount) {
    if (typeof value !== "number" || value <= 0 || this.#balance < value) {
      throw new Error(
        "Valor inválido ou saldo insuficiente para transferência"
      );
    }

    this.withdraw(value);
    targetAccount.deposit(value);
  }

  pix(value, keyType, keyValue) {
    const validAccount = Account.all.find(
      (account) => account.#pixKeys.get(keyType.toUpperCase()) === keyValue
    );

    if (!validAccount) {
      throw new Error("Chave pix não encontrada");
    }

    this.transfer(value, validAccount);
  }
}

export default Account;
