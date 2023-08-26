import Account from "../Account/Account.js";

class Client {
    name;
    #cpf;
    #account;
    #salary;
  
    constructor(name, cpf, account, salary) {
        this.name = name;
        this.#cpf = cpf;
        this.#account = account;
        this.#salary = salary;
    }

 
    get cpf() {
        return this.#cpf;
    }

    get account() {
        return this.#account;
    }

    get salary() {
        return this.#salary;
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }

    set account(account) {
        this.#account = account
    }

    set salary(amount) {
        this.#salary = amount;
    }


  registerClient(name, cpf, account, salary) {
    if (account instanceof Account) {
      this.name = name;
      this.#cpf = cpf;
      this.#account = account;
      this.#salary = salary;

      return "Cliente cadastrado";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }
}


module.exports = { Client }
