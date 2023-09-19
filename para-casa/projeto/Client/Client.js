import Account from "../Account/Account.js";

class Client {
  name;
  #cpf;
  #account;
  #income;

  constructor(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
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

  updateClientInfo(name, cpf, account, income) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#income = income;

      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }
}

export default Client;
