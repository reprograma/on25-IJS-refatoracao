const {Account} = require('../Account/Account')

class GoldAccount extends Account {
    limitTransaction;

    constructor(accountNumber, agency, client) {
        if(client.accountType == "gold") {
            super(accountNumber, agency, client);
            this.limitTransaction = 5000;
        } else {
            console.log("Cliente nao possui perfil para contas Gold, o cliente tem perfil " + client.accountType + ".");
            return {"error": 500};
        }
    }

}

module.exports = {GoldAccount}