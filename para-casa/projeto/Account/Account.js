class Account {
  // removi o private dos atributos para lidar melhor com a herança já que o javascript não lida muito bem com protected
  accountNumber;
  agency;
  balance;
  pixKeys;
  income;
  static all = []; // forma estática de manter tracking e todas as instâncias da classe Account

  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
    Account.all.push(this); // a cada instância é adicionada a lista estática de all
  }

  // método para remover uma conta da lista e evitar que problemas de memória
  destroy() {
    let i = Account.all.indexOf(this);
    Account.all.splice(i, 1);
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
    this.accountNumber = accountNumber;
  }

  setAgency(agency) {
    this.agency = agency;
  }

  setBalance(value) {
    this.balance += value;
  }

  deposit(value) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (value > 0) {
      this.setBalance(value);
    } else {
      throw new Error("Não é possível depositar valores negativos");
    }
  }

  validInformation(keyRegex, keyValue, keyType){
    if (keyRegex.test(keyValue)) {
          this.pixKeys[keyType] = keyValue;
          return `Chave pix ${keyType} criada com sucesso`;
        }
        else {
          throw new Error(`Erro, ${keyType} inválido`);
        }
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        let cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        this.validInformation(cpfRegex, keyValue, "cpf");
        break;

      case "EMAIL":
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.validInformation(emailRegex, keyValue, "email");
        break;

      case "TELEFONE":
        let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        this.validInformation(phoneRegex, keyValue, "telefone")
        break;
        
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

  verifyEnoughBalance(value, validAccount){
    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
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

    const response = this.verifyEnoughBalance(value, validAccount);
    return response;

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

    const response = this.verifyEnoughBalance(value, validAccount);
    return response;
  }
}

export default Account;