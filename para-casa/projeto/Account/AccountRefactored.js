class AccountRefactored {
    accountNumber;
    agency;
    balance;
    pixKeys;
    income;
    static all = [];
  
    constructor(accountNumber, agency, balance) {
      this.accountNumber = accountNumber;
      this.agency = agency;
      this.balance = balance;
      this.pixKeys = {
        cpf: undefined,
        email: undefined,
        telefone: undefined
      };
      AccountRefactored.all.push(this);
    }
  
    // método para remover uma conta da lista e evitar que problemas de memória
    destroy() {
      let i = AccountRefactored.all.indexOf(this);
      AccountRefactored.all.splice(i, 1);
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
  
    getBalance() {
      return this.balance;
    }
  
    getAgency() {
      return this.agency;
    }
  
    getAccountNumber() {
      return this.accountNumber;
    }
  
    setAccountNumber(accountNumber) {
      this.accountNumber = accountNumber;
      return this.accountNumber;
    }
  
    setAgency(agency) {
      this.agency = agency;
      return this.agency;
    }
  
    setBalance(value) {
      this.balance += value;
      return this.balance;
    }
  
    isNumber(value){
      return typeof value === 'number';
    }
  
    isValidValue(value){
      return value > 0;
    }
  
    isValueLowerThanBalance(value){
        return this.balance >= value;
    }
  
    deposit(value) {
        if (!this.isNumber(value)) {
            throw new Error("Não é possível depositar valores não numéricos");
        }
  
        if (this.isValidValue(value) === true) {
            this.balance += value;
        } else {
            throw new Error("Não é possível depositar valores negativos");
        }
    }

    createPixKey(keyValue, keyType) {
      const regexMap = {
        CPF: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
        EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        TELEFONE: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      };
  
      const successMessageMap = {
        CPF: `Chave pix cpf criada com sucesso`,
        EMAIL: `Chave pix email criada com sucesso`,
        TELEFONE: `Chave pix telefone criada com sucesso`,
      };
  
      const errorMessageMap = {
        CPF: `Erro, cpf inválido`,
        EMAIL: `Erro, email inválido`,
        TELEFONE: `Erro, telefone inválido`,
      };
  
      let regex = regexMap[keyType];
      let successMessage = successMessageMap[keyType];
      let errorMessage = errorMessageMap[keyType];
  
      if (!regex) {
        return "Tipo de chave inexistente";
      }
  
      if (regex.test(keyValue)) {
        this.pixKeys[keyType.toLowerCase()] = keyValue;
        return successMessage;
      } else {
        throw new Error(errorMessage);
      }
    }
  
    withdraw(value) {
        if(!this.isNumber(value) || !this.isValidValue(value)){
            throw new Error("Valor inválido de saque");
        }
      
        if(!this.isValueLowerThanBalance(value)) {
            throw new Error("Você não possui saldo suficiente");
        }

        this.balance -= value;
        return value;
    }
  
    transfer(value, accountNumber, agency) {
        const validAccount = AccountRefactored.all.find(account => {
            let accNumber = account.getAccountNumber();
            let accAgency = account.getAgency();
            return accNumber === accountNumber && accAgency === agency;
        })
  
        if (!validAccount) {
            throw new Error("Conta não encontrada");
        }
  
        if (!this.isValidValue(value)) {
            throw new Error("Valor inválido de transferência");
        }
  
        if (!this.isValueLowerThanBalance(value)) {
            throw new Error("Você não possui saldo suficiente");
        }

        validAccount.setBalance(value);
        this.balance -= value;
        return "Transferência feita com sucesso";
    }
  
    pix(value, pixKey, keyType) {
        const validAccount = AccountRefactored.all.find(account => {
            return account.pixKeys[keyType] === pixKey;
        })
  
        if (!validAccount) {
            throw new Error("Chave pix não encontrada");
        }
  
        if (!this.isValidValue(value)) {
            throw new Error("Valor inválido de pix");
        }
  
        if (!this.isValueLowerThanBalance(value)) {
            throw new Error("Você não possui saldo suficiente");
        }

        this.balance -= value;
        validAccount.setBalance(value);
        return "Pix feito com sucesso";
    }
}
  
export default AccountRefactored;