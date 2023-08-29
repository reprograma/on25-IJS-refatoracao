const { Bank } = require('./Bank');

class Client {
    email;
    name;
    #cpf;
    #phone;
    banks = [];
    static createPixKeys = []

    constructor(name, cpf, email, phone) {
        this.#phone = phone;
        this.email = email;
        this.name = name;
        this.#cpf = cpf;

        this.constructor.createPixKeys.push(
            {
                cpf: this.#cpf,
                email: this.email,
                phone: this.#phone,
                qtdPixKeys: 0,
            }
        )

    }


    get cpf() {
        return this.#cpf;
    }

    set cpf(newCpf) {
        this.#cpf = newCpf
        //console.log(`Seu cpf ---------> ${newCpf}`)
    }

    // get monthIncome() {
    //     return this.#monthIncome;
    // }

    // set monthIncome(newMonthIncome) {
    //     this.#monthIncome = newMonthIncome
    //     //console.log(`Seu cpf ---------> ${newCpf}`)
    // }

    get phone() {
        return this.#phone;
    }

    set phone(newPhone) {
        this.#phone = newPhone
        //console.log(`Seu cpf ---------> ${newCpf}`)
    }

    printAsString() {
        console.log(
            `cpf: ${this.#cpf},  nome: ${this.name}`
        );
    }

     accountIsRegistered(bank) {
       const validateBank =this.banks.find((element) => element.bankCode === bank.bankCode) !== undefined
        return console.log(
            `Cliente do CPF ${this.cpf} já possui conta no banco ********* ${bank.bankName}`
        ) , validateBank


    }

    addBank(bank) {
        if (!(bank instanceof Bank)) {
            console.log('Informe um banco válido $$$$$$$$');
            return;
        }

        if (this.accountIsRegistered(bank)) {
         return
           
        }


        this.banks.push(bank);
        const bankIndex = Bank.createdBanks.findIndex(
            (element) => element.bankCode === bank.bankCode
        );
        Bank.createdBanks[bankIndex].qtdClients++;

        console.log(`Banco ${bank.bankCode} adicionado à cliente ${this.name}.`);
    }

}

module.exports = { Client };