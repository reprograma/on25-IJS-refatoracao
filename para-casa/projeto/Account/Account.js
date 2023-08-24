class Account {
  accountNumber;
  agency;
  balance;
  pixKeys;
  income;
  static getAllAccounts = []; 

  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
    Account.getAllAccounts.push(this);
    return "Conta criada com sucesso";
  }


  removeAccount() {
    let i = Account.getAllAccounts.indexOf(this);
    Account.getAllAccounts.splice(i, 1);
  };

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  };

  getBalance() {
    return this.balance;
  };

  getAgency() {
    return this.agency;
  };

  getAccountNumber() {
    return this.accountNumber;
  };

  setAccountNumber(accountNumber) {
    this.accountNumber = accountNumber;
  };

  setAgency(agency) {
    this.agency = agency;
  };

  setBalance(value) {
    this.balance += value;

  }

  deposit(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível depositar valores não numéricos");
    };
    if (value > 0) {
      this.balance += value;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  };

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (regex.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        }
        else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emailRegex.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        }
        else {
          throw new Error("Erro, email inválido");
        }
      case "TELEFONE":
        let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;


        if (phoneRegex.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        }
        else {
          throw new Error("Erro, telefone inválido");
        }
      default:
        return "Tipo de chave inexistente";
    }
  };

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
  };

  transfer(value, accountNumber, agency) {
    const validAccount = Account.getAllAccounts.find(account => {
      let accNumber = account.getAccountNumber();
      let accAgency = account.getAgency();
      return accNumber === accountNumber && accAgency === agency;
    });

    if (!validAccount) {
      throw new Error("Conta não encontrada")
    };

    if (value < 0) {
      throw new Error("Valor inválido de transferência");
    };

    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  };

  pix(value, pixKey, keyType) {
    const validAccount = Account.getAllAccounts.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })

    if (!validAccount) {
      throw new Error("Chave pix não encontrada")
    };

    if (value < 0) {
      throw new Error("Valor inválido de pix");
    };

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }
};

export default Account;