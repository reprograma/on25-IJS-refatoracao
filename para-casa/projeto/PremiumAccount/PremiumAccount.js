import Account from "../Account/Account";

class PremiumAccount extends Account {
  
  constructor() {
    super();
  };

  createAccount(accountNumber, agency, balance, income) {
    if (income <= 18000) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      this.income = income;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  };

 
};

export default PremiumAccount;