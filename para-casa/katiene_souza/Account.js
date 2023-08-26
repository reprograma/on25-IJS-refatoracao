import { Client } from "./Client.js";

export class Account {
    #accountNumber;
    #agencyNumber;
    #salary;
    #pixKeyList;
    #moneyTransferDay;

    constructor(client, accountNumber, agencyNumber, salary) {
        this.client = this.validateClient(client);
        this.#accountNumber = accountNumber;
        this.#agencyNumber = agencyNumber;
        this.category = [];
        this.#salary = this.accountCategory(salary);
        this.#pixKeyList = [];
        this.#moneyTransferDay = 0;
    };

    get pixKeyList() {
        return this.#pixKeyList;
    }

    get salary() {
        return ({ salary: this.#salary });
    }

    get accountNumber() {
        return ({ accountNumber: this.#accountNumber });
    }

    get agencyNumber() {
        return ({ agencyNumber: this.#agencyNumber });
    }

    get moneyTransferDay() {
        return ({ moneyTransferDay: this.#moneyTransferDay });
    }

    validateClient(client) {
        if (!(client instanceof Client)) {
            console.log("Informe um cliente válido!");
        }

        return client;
    }

    accountCategory(salary) {
        let numberStandard = 4999.99,
            numberGold = 17999.99,
            numberPremium = 17999.99,
            numberValidateGold = 5000;

        if (salary <= numberStandard) {
            this.category.push("Standard");

        } else if (salary >= numberValidateGold && salary <= numberGold) {
            this.category.push("Gold");

        } else if (salary > numberPremium) {
            this.category.push("Premium");
        }

        return salary;
    }

    pixKey(typeKey) {
        if (typeKey === "email") {
            this.#pixKeyList.push({ email: this.client.email });
            console.log(`Chave pix: ${this.client.email} criada com sucesso!`);
        
        } else if (typeKey === "cpf") {
            this.#pixKeyList.push({ cpf: this.client.cpf });
            console.log(`Chave pix: ${this.client.cpf} criada com sucesso!`);
        
        } else if (typeKey === "phone") {
            this.#pixKeyList.push({ phone: this.client.phone });
            console.log(`Chave pix: ${this.client.phone} criada com sucesso!`);
        
        } else {
            console.log("Informe uma chave válida: email, cpf ou telefone!");
        }
    };

    pix(anotherAccount, typeKey, amout) {
        if (!(anotherAccount instanceof Account)) {
            console.log("Informe um banco válido!");
        }

        const key = anotherAccount.pixKeyList.some((key) => key.email === typeKey ||
            key.cpf === typeKey || key.phone === typeKey);

        if (this.#salary >= amout && key === true) {
            this.#salary -= amout;
            anotherAccount.#salary += amout;
            console.log(`Pix no valor de R$ ${amout},00 realizado com sucesso! Seu saldo atualizado é de R$ ${this.#salary},00`);
        
        } else {
            console.log("Você não tem a quantia necessária para fazer o pix ou sua chave está incorreta/não existe!");
        }
    }

    withdraw(amout) {
        if (this.#salary >= amout && amout > 0) {
            this.#salary -= amout;

            console.log(`Saque no valor de R$ ${amout},00 realizado com sucesso! Seu saldo atualizado é de R$ ${this.#salary},00.`);

        } else {
            console.log("Você não tem a quantia necessária para fazer essa transferência!");
        }
    }

    transferTo(anotherAccount, cpf, amout) {
        if (!(anotherAccount instanceof Account)) {
            console.log("informe um banco válido!");
        };

        const limit = this.#moneyTransferDay += amout;

        let validateLimit = 1000,
            validateLimitTwo = 5000;

        const validate = this.category == "Standard" && limit <= validateLimit ||
            this.category == "Gold" && limit <= validateLimitTwo ||
            this.category == "Premium";

        if (anotherAccount.client.cpf !== cpf) {
            console.log("informe um CPF valido!");

        } else if (this.#salary >= amout && validate === true) {
            this.#salary -= amout;
            anotherAccount.#salary += amout;
            console.log(`Transferência no valor de R$ ${amout},00 realizada com sucesso! Seu saldo atualizado é de R$ ${this.#salary},00.`);

        } else if (limit > validateLimit || limit > validateLimitTwo) {
            console.log("Você ultrapassou seu limite diário de transferência!");

        } else {
            console.log("Você não tem a quantia necessária para fazer essa transferência!");
        }
    }

    deposit(amout) {
       let validateNumber = 0;

        if (amout > validateNumber) {
            this.#salary += amout;
            console.log(`Deposito realizado com sucesso! Seu saldo atualizado é de R$ ${this.#salary},00!`);

        } else {
            console.log("Você precisa colocar um valor maior que 0 para que o deposito seja realizado!");
        }
    }
};
