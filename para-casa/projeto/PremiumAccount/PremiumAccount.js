import Account from "../Account/Account";

class PremiumAccount extends Account {
    transactionLimit;

    constructor() {
        super();
    }

    createAccount(accountNumber, agency, balance, income) {
        super.createAccount(accountNumber, agency, balance);
        if (income < 18000) {
            throw new Error("Renda incompatível com o tipo de conta");
        } else if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.income = income;
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }
}

export default PremiumAccount;