const { Clients } = require('./Client');

class Standard extends Clients {
    constructor(name, cpf, email, telefone, monthlyIncome) {
        if (monthlyIncome <= 4999.99) {
            super(name, cpf, email, telefone, monthlyIncome);
            this.transferLimit = 1000;
            this.type = 'standard';
        } else {
            throw new Error('Não foi possível criar a conta Standard');
        }
    }
}

module.exports = { Standard };