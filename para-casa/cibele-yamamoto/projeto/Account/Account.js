const {Client} = require('../Client/Client')

class Account {
    accountNumber;
    agency;
    bank;
    client;
    pixKeys;
    #balance;
    static allAccounts = [];

    constructor(accountNumber, agency, client) {
        if(client instanceof Client) {
            this.accountNumber = accountNumber;    
            this.agency = agency;
            this.bank = "New Bank";
            this.client = client;
            this.pixKeys = {
                "email": undefined,
                "telefone": undefined,
                "cpf": undefined
            }
            this.#balance = 0;
            this.constructor.allAccounts.push(this);
        } else {
            console.log("Cliente associado a conta inválido!")
        }
    }

    get balance() {
        return this.#balance;
    }

    set balance(amount) {
        this.#balance = amount;
    }

    withdraw(amount) {
        if(this.#balance >= amount) {
            this.#balance -= amount;
            console.log("Saque realizado com Sucesso. O novo saldo é de: " + this.#balance)
        } else {
            throw new Error("Não é possível realizar saque. Saldo insuficiente.")
        }
    }

    deposit(amount) {
        this.#balance += amount;
        console.log("Depósito realizado com Sucesso. O novo saldo é de: " + this.#balance)
    }

    transferTo(accountNumber, cpf, amount) {
        if(this.#balance >= amount) {
            const anotherAccount = this.constructor.allAccounts.find((element) => element.accountNumber === accountNumber && element.client.cpf === cpf); 
            if (anotherAccount instanceof Account) {
                    this.#balance -= amount;
                    anotherAccount.balance = anotherAccount.balance + amount;
                    console.log("PIX realizado com sucesso.");
                    console.log("Saldo da conta de origem: " + this.#balance);
                    console.log("Saldo da conta de destino: " + anotherAccount.balance);
            } else {
                throw new Error("Conta de destino não encontrada.")
            }
        } else {
            throw new Error("Não é possível realizar a transferência. Saldo insuficiente.")
        }
    }

    configurePix(keyType, value) {
        this.pixKeys[keyType] = value;
    }

    pix(keyType, keyValue, amount) {
        if(this.#balance >= amount) {
            const anotherAccount = this.constructor.allAccounts.find((element) => element.pixKeys[keyType] === keyValue)
            this.#balance -= amount;
            anotherAccount.balance = anotherAccount.balance + amount;
            console.log("PIX realizado com sucesso.");
            console.log("Saldo da conta de origem: " + this.#balance);
            console.log("Saldo da conta de destino: " + anotherAccount.balance);

        } else {
            throw new Error("Não é possível realizar a transferência via pix. Saldo insuficiente.")
        }

    }

}

module.exports = {Account}