import Account from "../Account/Account.js";

class Client {
  #name;
  #cpf;
  #account;
  #income;

  constructor(name, cpf, account, income) {
    if (!(account instanceof Account)) {
      throw new Error("Erro no cadastro, conta inválida");
    }

    if (!name || typeof name !== "string") {
      throw new Error("Nome inválido");
    }

    if (!cpf || typeof cpf !== "string") {
      throw new Error("CPF inválido");
    }

    if (typeof income !== "number" || income <= 0) {
      throw new Error("Renda inválida");
    }

    this.#name = name;
    this.#cpf = cpf;
    this.#account = account;
    this.#income = income;
  }

  get name() {
    return this.#name;
  }

  get cpf() {
    return this.#cpf;
  }

  get account() {
    return this.#account;
  }

  get income() {
    return this.#income;
  }
}

export default Client;
