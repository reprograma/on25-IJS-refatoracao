import Account from "../Account/Account";
import Validar from "../utils/Validar";

class GoldAccount extends Account {
  transactionLimit;
  
  constructor() {
    super();
    this.transactionLimit = 5000;
  }

  createAccount(accountNumber, agency, balance, income) {
    Validar.income(this.transactionLimit, income);
    Validar.detailsAccount(accountNumber, agency, balance);
    
    this.accountNumber=accountNumber;
    this.agency=agency;
    this.balance = balance;
    this.income = income;
    return "Conta criada com sucesso";
  }

  transfer(value, accountNumber, agency) {
    const validAccount = this.findAccount(accountNumber, agency);
    
    Validar.numero(value, "Valor inválido de transferência");
    this.validTransfer(value);

    validAccount.deposit(value);
    this.balance -= value;
    return "Transferência feita com sucesso";
  }

  pix(value, pixKey, keyType) {
    const validAccount = this.findAccountByPix(keyType, pixKey);

    Validar.numero(value, "Valor inválido de pix");
    this.validTransfer(value);

    this.balance -= value;
    validAccount.setBalance(value);
    return "Pix feito com sucesso";
  }

  validTransfer(value) {
    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }

    if (this.balance < value) {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}

export default GoldAccount;