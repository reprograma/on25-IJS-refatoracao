class Account {
    #accountNumber;
    #agency;
    #balance;
    pixKeys;
    
    static all = []; 

    constructor(accountNumber, agency, balance) {
        this.#accountNumber = accountNumber;
        this.#agency = agency;
        this.#balance = balance;
        this.pixKeys = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        }

    Account.all.push(this);
    }

    get balance() {
        return this.#balance;
    }

    get agency() {
        return this.#agency;
    }

    get accountNumber() {
        return this.#accountNumber;
    }

    set accountNumber(accountNumber) {
        this.#accountNumber = accountNumber
    }

    set agency(agency) {
        this.#agency = agency
    }

    set balance(amount) {
        this.#balance = amount;
    }

    removeAccount() {
        let accountItem = Account.all.indexOf(this);
        Account.all.splice(accountItem, 1);
    }

    createAccount(accountNumber, agency, balance) {
        if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
            this.accountNumber = accountNumber;
            this.agency = agency;
            this.balance = balance;
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    deposit(amount) {
        if (typeof amount === 'string' || typeof amount === 'boolean') {
            throw new Error("Não é possível depositar valores não numéricos");
        }
        if (amount > 0) {
            this.balance += amount;
        } else {
            throw new Error("Não é possível depositar valores negativos");
        }
    }

    createPixKey(keyValue, keyType) {
        switch (keyType) {
            case "CPF":
                let regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regex.test(keyValue)) {
                    this.pixKeys.cpf = keyValue;
                    return "Chave pix cpf criada com sucesso";
                }
                else {
                    throw new Error("Erro, cpf inválido");
                }

            case "EMAIL":
                let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (emailRegex.test(keyValue)) {
                    this.pixKeys.email = keyValue;
                    return "Chave pix email criada com sucesso";
                }
                else {
                    throw new Error("Erro, email inválido");
                }

            case "TELEFONE":
                let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                if (phoneRegex.test(keyValue)) {
                    this.pixKeys.telefone = keyValue;
                    return "Chave pix telefone criada com sucesso";
                }
                else {
                    throw new Error("Erro, telefone inválido");
                }
        default:
            return "Tipo de chave inexistente";
        }
    }

    withdraw(amount) {
        if (amount > 0 && typeof amount === 'number') {
            if (this.balance - amount > 0) {
                this.balance -= amount;
                return amount;
            } else {
                throw new Error("Você não possui saldo suficiente");
            }
        } else {
            throw new Error("Valor inválido de saque");
        }
    }

    transfer(amount, accountNumber, agency) {
        const validAccount = Account.all.find(account => {
            let accNumber = account.accountNumber;
            let accAgency = account.agency;
            return accNumber === accountNumber && accAgency === agency;
        })

        if (!validAccount) {
            throw new Error("Conta não encontrada")
        }

        if (amount < 0) {
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
            throw new Error("Chave pix não encontrada")
        }

        if (amount < 0) {
            throw new Error("Valor inválido de pix");
        } else if (this.balance - amount > 0) {
            this.balance -= amount;
            validAccount.deposit(amount);
            return "Pix feito com sucesso";
        } else {
            throw new Error("Você não possui saldo suficiente");
        }
    } 
}

module.exports = { Account };