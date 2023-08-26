const { Account } = require("../Account/Account");

class StandardAccount extends Account {
    transactionLimit;
  
    constructor(accountNumber, agency, balance) {
        super(accountNumber, agency, balance);
        this.transactionLimit = 1000;
    }

    createAccount(accountNumber, agency, balance, salary) {
        if (salary > 4999) {
            throw new Error("Renda incompatível com o tipo de conta")
        }
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.accountNumber = accountNumber;
            this.agency = agency;
            this.balance = balance;
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    transfer(amount, accountNumber, agency) {
        const validAccount = Account.all.find(account => {
            let accNumber = account.accountNumber;
            let accAgency = account.agency;
            return accNumber === accountNumber && accAgency === agency; 
    })

        if (!validAccount) {
            throw new Error ("Conta não encontrada")
        }

        if (amount > this.transactionLimit) {
            throw new Error ("O seu limite de transação é de 1000 reais")
        } else if (amount < 0) {
            throw new Error("Valor inválido de transferência");
        } else if (this.balance - amount > 0) {
            validAccount.deposit(amount);
            this.balance -= amount;
            return "Transferência feita com sucesso";
        } else {
            throw new Error("Você não possui saldo suficiente");
        }
  }

    pix(amount, pixKey, keyType) {
        const validAccount = Account.all.find(account => {
            return account.pixKeys[keyType] === pixKey;
    })
  
        if (!validAccount) {
            throw new Error ("Chave pix não encontrada")
        }

        if (amount > this.transactionLimit) {
            throw new Error ("O seu limite de transação é de 1000 reais")
        }

        if (amount < 0) {
            throw new Error("Valor inválido de pix");
        }

        if (this.balance - amount > 0) {
            this.balance -= amount;
            validAccount.deposit(amount);
            return "Pix feito com sucesso";
        } else {
            throw new Error("Você não possui saldo suficiente");
        }
  }
}

module.exports = { StandardAccount };