const { Clients } = require('./Client');

    class Gold extends Clients {
        constructor(name, cpf, email, telefone, monthlyIncome) {
            if (monthlyIncome >= 5000 && monthlyIncome <= 17999.99) {
                super(name, cpf, email, telefone, monthlyIncome);
                this.transferLimit = 5000;
                this.type = 'gold';
            } else {
                throw new Error('Não foi possível criar a conta Gold');
            }
        }
    }

module.exports = { Gold };