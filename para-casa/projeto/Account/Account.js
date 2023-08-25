class Account {
  accountNumber;
  agency;
  balance;
  pixKeys;
  income;
  numberLength;
  
  static regex;
  static allAccounts = [];

  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
    this.numberLength = {
      account: 5,
      agency: 4
    },
    Account.regex = {
      cep: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      phone: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    }
    Account.allAccounts.push(this);
  }

  //evita problemas de memória
  destroy() {
    let i = Account.allAccounts.indexOf(this);
    Account.allAccounts.splice(i, 1);
  }

  validatesAccount() {
    if (
      accountNumber.length === this.numberLength.account &&
      agency.length === this.numberLength.agency &&
      balance > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  createAccount(accountNumber, agency, balance) {
    if (this.validatesAccount()) {
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
    this.accountNumber = accountNumber
    return this.accountNumber
  }

  setAgency(agency) {
    this.agency = agency
    return this.agency
  }

  setBalance(value) {
    this.balance += value;
    return this.balance;
  }

  deposit(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (value > 0) {
      this.balance += value;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }  

  createPixKey(keyValue, keyType) {

    keyType = keyType.toUpperCase();

    switch (keyType) {
      case "CPF":
        if (Account.regex.cpf.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        }
        else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        if (Account.regex.email.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        }
        else {
          throw new Error("Erro, email inválido");
        }
      case "TELEFONE":
        if (Account.regex.phone.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        }
        else {
          throw new Error("Erro, telefone inválido");
        }
      default:
        return "Tipo de chave inexistente";
    }
  }

  withdraw(value) {
    if (value > 0 && typeof value === 'number') {
      if (this.balance - value > 0) {
        this.balance -= value;
        return value;
      } else {
        throw new Error("Você não possui saldo suficiente");
      }
    } else {
      throw new Error("Valor inválido de saque");
    }
  }

  transfer(value, accountNumber, agency) {
    const validAccount = Account.allAccounts.find(account => {
      let accNumber = account.getAccountNumber();
      let accAgency = account.getAgency();
      return accNumber === accountNumber && accAgency === agency;
    })

    if (!validAccount) {
      throw new Error("Conta não encontrada")
    }

    if (value < 0) {
      throw new Error("Valor inválido de transferência");
    }

    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.allAccounts.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })

    if (!validAccount) {
      throw new Error("Chave pix não encontrada")
    }

    if (value < 0) {
      throw new Error("Valor inválido de pix");
    }

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}

export default Account;