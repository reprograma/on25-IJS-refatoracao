const { Clients } = require('./Client');

class Premium extends Clients {
    constructor(name, cpf, email, telefone, monthlyIncome) {
        if (monthlyIncome >= 18000) {
            super(name, cpf, email, telefone, monthlyIncome);
            this.transferLimit = 1000000000;
            this.type = 'premium';
        } else {
            throw new Error('Não foi possível criar a conta Premium');
        }
    }
}

module.exports = { Premium };
