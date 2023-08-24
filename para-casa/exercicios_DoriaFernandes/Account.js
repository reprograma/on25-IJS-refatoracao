const { Clients } = require('./Client');

class BankAccount {

    client;
    accountNumber;
    agencyNumber;
    #balance = 0;
    pixKeys;
    static all = [];

    constructor(client, accountNumber, agencyNumber) {
        if (!(client instanceof Clients)) {
            return new Error('Informe um cliente válido');
        }
        this.client = client;
        this.accountNumber = accountNumber;
        this.agencyNumber = agencyNumber;
        this.pixKeys = {
            cpf: undefined,
            email: undefined,
            telefone: undefined,
            randomKey: undefined
        }
        BankAccount.all.push(this);
    }

    get balance() {
        return this.#balance;
    }

    set balance(newBalance) {
        this.#balance = newBalance;
    }

    creditAmount(amount) {
        this.#balance += amount;
        console.log(`Depósito realizado com sucesso, no valor de R$${amount},00. O novo saldo da conta é: R$ ${this.#balance},00`);
        return 'creditado'
    }

    cashWithdrawal(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Sacou o valor de R$${amount},00 `)
            console.log(`O saldo atual é de R$${this.balance},00. `)
            return 'ok';
        } else {
            console.log(`Você não possui saldo o suficiente`)
            return 'error saldo'
        }
    }

    generateRandomKey(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomKey = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomKey += characters.charAt(randomIndex);
        }

        return randomKey;
    }

    createdPix(type) {
        switch (type) {
            case "e-mail":
                this.pixKeys.email = this.client.email;
                console.log(`Chave pix criada com sucesso`);
                break;
            case "cpf":
                this.pixKeys.cpf = this.client.cpf;
                console.log(`Chave pix criada com sucesso`);
                break;
            case "telefone":
                this.pixKeys.telefone = this.client.telefone;
                console.log(`Chave pix criada com sucesso`);
                break;
            case "chave aleatória":
                this.pixKeys.randomKey = this.generateRandomKey(10);
                console.log(`Chave pix criada com sucesso`);
                break;
            default:
                console.log("Chave de Pix inválida")
        }
    }

    transferPix(amount, chave) {
        if (amount <= this.#balance) {
            const anotherAccount = BankAccount.all.find(account => account.pixKeys.cpf === chave);
            if (anotherAccount) {
                this.#balance -= amount;
                anotherAccount.#balance += amount;
                console.log(`Pix realizado com sucesso no valor de R$${amount},00, para ${anotherAccount.client.name}. Seu saldo atual é de R$${this.#balance},00`);
                return 'ok'
            } else {
                console.log(`Chave PIX inválida`);
                return 'error'
            }
        } else {
            console.log(`Você não possui saldo o suficiente, seu saldo atual é R$${this.#balance},00`);
            return 'error'
        }
    }

    transferTo(amount, cpf, account) {
        const transferLimit = this.client.transferLimit;
        const anotherAccount = BankAccount.all.find(acc => acc.accountNumber === account);
        const anotherCpf = BankAccount.all.find(acc => acc.client.cpf === cpf);
        if (amount > transferLimit) {
            console.log(`Você não possui limite diário disponível pra essa transferência. Seu limite atual é de R$${transferLimit},00`)
            return 'error limite';
        } if (amount > this.#balance) {
            console.log(`Saldo insuficiente. Seu saldo atual é de R$${this.#balance},00.`);
            return 'error saldo';
        } if (anotherAccount) {
            if (anotherCpf) {
                this.client.transferLimit -= amount;
                this.#balance -= amount;
                anotherAccount.#balance += amount;
                console.log(`Transferência realizada com sucesso para ${anotherAccount.client.name}, no valor de R$${amount},00. Seu saldo atual é de R$${this.#balance},00.`);
                return 'ok';
            } else {
                console.log("CPF não encontrado");
                return 'error cpf'
            }
        } else {
            console.log('Ops ocorreu um erro, tente novamente mais tarde');
            return 'error'
        }
    }
}


module.exports = { BankAccount };


