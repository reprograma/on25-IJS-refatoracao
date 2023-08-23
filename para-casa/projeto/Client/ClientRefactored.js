import AccountRefactored from "../Account/AccountRefactored";

class ClientRefactored {
  name;
  #cpf;
  #account;
  #income;

  constructor(name, cpf, account, income) {
    if(!this.isAccount(account)){
      throw new Error("Erro no cadastro, dados inválidos");
    }

    this.name = name;
    this.#cpf = cpf;
    this.#account = account;
    this.#income = income;
  }

  getConfirmationMessage() {
    return "Cliente cadastrado";
  }

  isAccount(account){
    return account instanceof AccountRefactored;
  }
}

export default ClientRefactored;
