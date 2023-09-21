class PixKey {
  constructor(keyType) {
    this.keyType = keyType;
    this.keyValue = null;
  }

  createKey(keyValue) {
    switch (this.keyType) {
      case "CPF":
        const cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (cpfRegex.test(keyValue)) {
          this.keyValue = keyValue;
          return "Chave pix CPF criada com sucesso";
        } else {
          throw new Error("Erro, CPF inválido");
        }
      case "EMAIL":
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailRegex.test(keyValue)) {
          this.keyValue = keyValue;
          return "Chave pix email criada com sucesso";
        } else {
          throw new Error("Erro, email inválido");
        }
      case "TELEFONE":
        const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        if (phoneRegex.test(keyValue)) {
          this.keyValue = keyValue;
          return "Chave pix telefone criada com sucesso";
        } else {
          throw new Error("Erro, telefone inválido");
        }
      default:
        throw new Error("Tipo de chave inexistente");
    }
  }

  getKeyType() {
    return this.keyType;
  }

  getKeyValue() {
    return this.keyValue;
  }
}
// Dividi a classe account em dois para tentar manter uma responsabilidade unica em cada classe
class Account {
  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      CPF: new PixKey("CPF"),
      EMAIL: new PixKey("EMAIL"),
      TELEFONE: new PixKey("TELEFONE")
    };
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
  }

  setAgency(agency) {
    this.agency = agency;
  }

  setBalance(value) {
    this.balance += value;
  }

  deposit(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error("Não é possível depositar valores não numéricos ou negativos");
    }
    this.balance += value;
  }

  withdraw(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error("Valor inválido de saque");
    }
    if (this.balance - value < 0) {
      throw new Error("Você não possui saldo suficiente");
    }
    this.balance -= value;
    return value;
  }

  transfer(value, targetAccount) {
    if (value <= 0 || typeof value !== 'number') {
      throw new Error("Valor inválido de transferência");
    }
    if (this.balance - value < 0) {
      throw new Error("Você não possui saldo suficiente");
    }
    this.balance -= value;
    targetAccount.setBalance(value);
  }

  pix(value, targetPixKey) {
    if (value <= 0 || typeof value !== 'number') {
      throw new Error("Valor inválido de pix");
    }
    if (this.balance - value < 0) {
      throw new Error("Você não possui saldo suficiente");
    }
    this.balance -= value;
    targetPixKey.setBalance(value);
  }
}


export default Account;