export default class Validar {
  static cpf(value) {
    const regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return regex.test(value);
  }

  static email(value) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(value);
  }

  static telefone(value) {
    const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return phoneRegex.test(value);
  }

  static numero(value, message) {
    if(value < 0 || typeof value !== "number") {
      throw new Error(message)
    }
  }

  static income(transactionLimit, income) {
    let valid
    switch(transactionLimit) {
      case 1000:
        valid = income < 4999;
        break
      case 5000:
        valid = income > 5000 && income < 17999.99;
        break
      default:
        valid = income >= 18000;
        break;
    }

    if(!valid) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
  }

  static detailsAccount(accountNumber, agency, balance) {
    if(accountNumber.length !== 5 || agency.length !== 4 || balance < 0) {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  static validTransfer(value, transactionLimit, balance) {
    if (value > transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }

    if (balance < value) {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}