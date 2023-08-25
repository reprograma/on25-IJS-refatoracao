import PixManager from "./PixManager.js";

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
    this.PixManager = new PixManager(this)
    Account.all.push(this); 
  }


  destroy() {
    let accountData = Account.all.indexOf(this);
    Account.all.splice(accountData, 1);
  }
  
  createAccount(accountNumber, agency, balance) {
    const ACCOUNT_NUMBER_LENGTH = 5;
    const AGENCY_NUMBER_LENGTH = 4;  
    if (ACCOUNT_NUMBER_LENGTH && AGENCY_NUMBER_LENGTH && balance > 0) {
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

  deposit(amount) {
    if (typeof amount !== 'number') {
      throw new Error("Não é possível depositar valores não numéricos");
    }
    if (amount < 0) {
      throw new Error("Não é possível depositar valores negativos");
    } 
    this.balance += amount;
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

  createPixKey(keyValue, keyType) {
    return this.PixManager.createPixKey(keyValue, keyType);
  }

}



export default Account;


