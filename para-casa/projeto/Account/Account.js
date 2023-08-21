import Validar from "../utils/Validar";

class Account {
  accountNumber;
  agency;
  balance;
  pixKeys;
  income;
  static all = [];

  constructor(accountNumber, agency, balance) {
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.pixKeys = {
      cpf: undefined,
      email: undefined,
      telefone: undefined
    }
    Account.all.push(this);
  }

  destroy() {
    const index = Account.all.indexOf(this);
    if(index !== -1) {
      Account.all.splice(index, 1);
    }
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
    Validar.numero(value, "Não é possível depositar valores não númericos ou negativos");
    this.balance += value;
  }

  createPixKey(keyValue, keyType) {
    switch (keyType) {
      case "CPF":
        if (Validar.cpf(keyValue)) {
          this.pixKeys.cpf = keyValue;
          return "Chave pix cpf criada com sucesso";
        } else {
          throw new Error("Erro, cpf inválido");
        }
      case "EMAIL":
        if (Validar.email(keyValue)) {
          this.pixKeys.email = keyValue;
          return "Chave pix email criada com sucesso";
        } else {
          throw new Error("Erro, email inválido");
        }
      case "TELEFONE":
        if (Validar.telefone(keyValue)) {
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
    Validar.numero(value, "Valor inválido de saque");

    if (this.balance < value) {
      throw new Error("Você não possui saldo suficiente");
    }
    
    this.balance -= value;
    return value;
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findAccount(accountNumber, agency);
    Validar.numero(value, "Valor inválido de transferência");

    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findAccountByPix(keyType, pixKey);
    Validar.numero(value, "Valor inválido de pix");

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  findAccount(accountNumber, agency) {
    const validAccount = Account.all.find(account => {
      const 
        accNumber = account.getAccountNumber(),
        accAgency = account.getAgency();
      return accNumber === accountNumber && accAgency === agency;
    })

    if (!validAccount) {
      throw new Error("Conta não encontrada");
    }

    return validAccount;
  }

  findAccountByPix(keyType, pixKey) {
    const validAccount = Account.all.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })

    if (!validAccount) {
      throw new Error("Chave pix não encontrada");
    }

    return validAccount;
  }
}

export default Account;