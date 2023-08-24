class Clients {
    name;
    #cpf;
    #monthlyIncome;
    email;
    telefone;

    constructor(name, cpf, email, telefone, monthlyIncome) {
        this.name = name;
        this.#cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.#monthlyIncome = monthlyIncome;

    }

    get cpf() {
        return this.#cpf;
    }

    get monthlyIncome() {
        return this.#monthlyIncome;
    }
}

module.exports = { Clients};