const {Account} = require('../Account/Account')

class PremiumAccount extends Account {
    limitTransaction;

    constructor(accountNumber, agency, client) {
        if(client.accountType == "premium") {
            super(accountNumber, agency, client);
            this.limitTransaction = "unlimited";

        } else {
            console.log("Cliente nao possui perfil para contas Premium, o cliente tem perfil " + client.accountType + ".");
            return {"error": 500};
        } 
    }

}

module.exports = {PremiumAccount}