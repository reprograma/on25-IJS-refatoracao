import Account from "./Account.js";

class PixManager {
  constructor(accountInstance) {
    this.accountInstance  = accountInstance;
    this.keyTypes = {
      CPF: "CPF",
      EMAIL: "email",
      TELEFONE: "telefone",
    };
    this.regexPatterns = {
      CPF: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      TELEFONE: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
    };
    this.pixKeys = {};
  }

  createPixKey(keyValue, keyType) {
    if(!this.keyTypes[keyType]){
      return "Tipo de chave inexistente.";
    } 
    if(this.regexPatterns[keyType].test(keyValue)) {
      this.pixKeys[keyType] = keyValue;
      return `Chave PIX do tipo ${keyType} criada com sucesso!`
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.all.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })

    if (!validAccount) {
      throw new Error("Chave pix não encontrada")
    }

    if (value < 0) {
      throw new Error("Valor inválido de pix");
    }

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  listPixKeys() {
    return this.pixKeys
  }

}



export default PixManager;


