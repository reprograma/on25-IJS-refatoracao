const {Account} = require('../Account/Account')

class StandardAccount extends Account {
    limitTransaction;

    constructor(accountNumber, agency, client) {
        if(client.accountType == "standard") {
            super(accountNumber, agency, client);
            this.limitTransaction = 1000;
        } else {
            console.log("Cliente nao possui perfil para contas Standard, o cliente tem perfil " + client.accountType + ".");
            return {"error": 500};
        }
    }
}

module.exports = {StandardAccount}