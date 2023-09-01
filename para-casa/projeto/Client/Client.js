import Account from "../Account/Account.js";

class Client {
  #name = "";
  #cpf = "";
  #account = null;
  #income = 0;

  registerClient(name, cpf, account, income) {
    if (!this.isValidAccount(account)) {
      throw new Error("Erro no cadastro, dados inválidos");
    }

    this.#name = name;
    this.#cpf = cpf;
    this.#account = account;
    this.#income = income;

    return "Cliente cadastrado";
  }

  isValidAccount(account) {
    return account instanceof Account;
  }
}

export default Client;

