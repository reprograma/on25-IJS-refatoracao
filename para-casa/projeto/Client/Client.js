import Account from "../Account/Account.js";

class Client {
  #name;
  #cpf;
  #account;
  #income;

  constructor(name, cpf, account, income) {
    if (account instanceof Account) {
      this.#name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }

  // criado get para cada atributo
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
}

export default Client;
