import Account from "../Account/Account";
import Validar from "../utils/Validar";

class StandardAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
    this.transactionLimit = 1000;
  }

  createAccount(accountNumber, agency, balance, income) {
    Validar.income(this.transactionLimit, income);
    Validar.detailsAccount(accountNumber, agency, balance);

    super.createAccount(accountNumber, agency, balance);
    this.balance=balance;
    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findAccount(accountNumber, agency);

    Validar.numero(value, "Valor inválido de transferência");
    Validar.validTransfer(value, this.transactionLimit, this.balance);

    validAccount.deposit(value);
    this.balance -= value;
    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findAccountByPix(keyType, pixKey);

    Validar.numero(value, "Valor inválido de pix");
    Validar.validTransfer(value, this.transactionLimit, this.balance);

    this.balance -= value;
    validAccount.setBalance(value);
    return "Pix feito com sucesso";
  }
}

export default StandardAccount;