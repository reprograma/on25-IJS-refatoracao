class Account {
  // removi o private dos atributos para lidar melhor com a herança já que o javascript não lida muito bem com protected
  #accountNumber;
  #agency;
  #balance;
  pixKeys;
  income;
  static allAcc = []; // forma estática de manter tracking e todas as instâncias da classe Account

  constructor(accountNumber, agency, balance) {
    this.#accountNumber = accountNumber;
    this.#agency = agency;
    this.#balance = balance;
    this.pixKeys = {
      cpf: null,
      email: null,
      telefone: null,
    };
    Account.allAcc.push(this); // a cada instância é adicionada a lista estática de all
  }

  // método para remover uma conta da lista e evitar que problemas de memória
  destroy() {
    let i = Account.allAcc.indexOf(this);
    Account.allAcc.splice(i, 1);
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.#accountNumber = accountNumber;
      this.#agency = agency;
      this.#balance = balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  get Balance() {
    return this.#balance;
  }

  get Agency() {
    return this.#agency;
  }

  get AccountNumber() {
    return this.#accountNumber;
  }

  set AccountNumber(accountNumber) {
    this.#accountNumber = accountNumber;
    return this.#accountNumber;
  }

  set Agency(agency) {
    this.#agency = agency;
    return this.#agency;
  }

  set Balance(value) {
    this.#balance += value;
    return this.#balance;
  }

  deposit(amount) {
    if (typeof amount === "string" || typeof amount === "boolean") {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (amount > 0) {
      this.#balance += amount;
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let regex =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (regex.test(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emailRegex.test(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        } else {
          throw new Error("Erro, email inválido");
        }
      case "TELEFONE":
        let phoneRegex =
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

        if (phoneRegex.test(keyValue)) {
          this.pixKeys.telefone = keyValue;
          return "Chave pix telefone criada com sucesso";
        } else {
          throw new Error("Erro, telefone inválido");
        }
      default:
        return "Tipo de chave inexistente";
    }
  }

  withdraw(value) {
    if (value > 0 && typeof value === "number") {
      if (this.#balance - value > 0) {
        this.#balance -= value;
        return value;
      } else {
        throw new Error("Você não possui saldo suficiente");
      }
    } else {
      throw new Error("Valor inválido de saque");
    }
  }

  transfer(value, accountNumber, agency) {
    const validAccount = Account.allAcc.find((account) => {
      let accNumber = account.AccountNumber;
      let accAgency = account.Agency;
      return accNumber === accountNumber && accAgency === agency;
    });

    if (!validAccount) {
      throw new Error("Conta não encontrada");
    } else if (value < 0) {
      throw new Error("Valor inválido de transferência");
    } else if (this.#balance - value > 0) {
      validAccount.Balance = value;
      this.#balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.allAcc.find((account) => {
      return account.pixKeys[keyType] === pixKey;
    });

    if (!validAccount) {
      throw new Error("Chave pix não encontrada");
    } else if (value < 0) {
      throw new Error("Valor inválido de pix");
    } else if (this.#balance - value > 0) {
      this.#balance -= value;
      validAccount.Balance = value;
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}

export default Account;
