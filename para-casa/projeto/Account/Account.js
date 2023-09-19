class Account {
  // removi o private dos atributos para lidar melhor com a herança já que o javascript não lida muito bem com protected
  accountNumber;
  agency;
  balance;
  pixKeys = {
    cpf: undefined,
    email: undefined,
    telefone: undefined
  };
  static all = []; // forma estática de manter tracking e todas as instâncias da classe Account

  constructor(accountNumber, agency, balance) {
    if (this.validateAccountData(accountNumber, agency, balance)) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      Account.all.push(this);
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
    Account.all.push(this); // a cada instância é adicionada a lista estática de all
  }

  validateAccountData(accountNumber, agency, balance) {
    return (
      accountNumber.length === 5 &&
      agency.length === 4 &&
      typeof balance === 'number' &&
      balance > 0
    );
  }

  // método para remover uma conta da lista e evitar que problemas de memória
  destroy() {
    let index = Account.all.indexOf(this);
    Account.all.splice(index, 1);
  }

  createAccount(accountNumber, agency, balance) {
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
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
    const validKeyTypes = Object.keys(this.#pixKeyRegex);

    if (!validKeyTypes.includes(keyType)) {
      throw new Error("Tipo de chave PIX inválido");
    }

    const regex = this.#pixKeyRegex[keyType];

    if (regex.test(keyValue)) {
      this.#pixKeys[keyType.toLowerCase()] = keyValue;
      return `Chave PIX ${keyType.toLowerCase()} criada com sucesso`;
    } else {
      throw new Error(`Erro, ${keyType.toLowerCase()} inválido`);
    }
  }

  // createPixKey(keyValue, keyType) {
    
  //   switch (keyType) {
  //     case "CPF":
  //       let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

  //       if (regex.test(keyValue)) {
  //         this.pixKeys.cpf = keyValue;
  //         return "Chave pix cpf criada com sucesso";
  //       }
  //       else {
  //         throw new Error("Erro, cpf inválido");
  //       }
  //     case "EMAIL":
  //       let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //       if (emailRegex.test(keyValue)) {
  //         this.pixKeys.email = keyValue;
  //         return "Chave pix email criada com sucesso";
  //       }
  //       else {
  //         throw new Error("Erro, email inválido");
  //       }
  //     case "TELEFONE":
  //       let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;


  //       if (phoneRegex.test(keyValue)) {
  //         this.pixKeys.telefone = keyValue;
  //         return "Chave pix telefone criada com sucesso";
  //       }
  //       else {
  //         throw new Error("Erro, telefone inválido");
  //       }
  //     default:
  //       return "Tipo de chave inexistente";
  //   }
  // }

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
    const validAccount = Account.all.find(account => {
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
    const validAccount = Account.all.find(account => {
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