class Client {
    id; // client id
    name; // client name
    cpf; // client cpf
    #income; // monthly income of the client
    accountType; // type of account that the client is allowed to open

    constructor(id, name, cpf, income) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.#income = income;
        this.accountType = this.calcAccountType(income);
    }

    calcAccountType(income) {
        if(this.#income < 5000) {
            return "standard";
        } else if(this.#income < 18000) {
            return "gold";
        } else if(this.#income >= 18000){
            return "premium";
        }
    }
}

module.exports = {Client};