import Account from "../Account/Account.js";

class Client {
  #name;
  #cpf;
  #account;
  #income;
  
  constructor() {
    this.#name = '';
    this.#cpf = '';
    this.#account = null;
    this.#income = 0;
  }

  setName(name) {
    this.#name = name;
  }

  setCPF(cpf) {
    this.#cpf = cpf;
  }

  setAccount(account) {
    this.#account = account instanceof Account ? account :
     (() => { throw new Error("Erro no cadastro, dados inválidos"); })();
  }
  
  setIncome(income) {
    this.#income = income;
  }

  getName() {
    return this.#name;
  }

  getCPF() {
    return this.#cpf;
  }

  getAccount() {
    return this.#account;
  }

  getIncome() {
    return this.#income;
  }

  registerClient(name, cpf, account, income) {
    this.setName(name);
    this.setCPF(cpf);
    this.setAccount(account);
    this.setIncome(income);

    return "Cliente cadastrado";
  }
}

export default Client;
