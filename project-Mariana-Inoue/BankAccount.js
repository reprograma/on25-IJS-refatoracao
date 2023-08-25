const { Bank } = require("./Bank");
const { Client } = require("./Client");

class BankAccount {
  client;
  bank;
  accountNumber;
  agencyNumber;
  #balance = 0;
  #monthIncome;
  pixKeys;
  typeAccount;
  // standard_account = 4999.99;
  // gold_account = 17999.99;
  // premium_account;

  constructor(client, bank, accountNumber, agencyNumber, typeAccount) {
    if (!(client instanceof Client)) {
      return new Error("Informe um cliente válido");
    }
    if (!(bank instanceof Bank)) {
      return new Error("Informe um banco válido");
    }
    if (
      client.banks.find((element) => element.bankCode === bank.bankCode) ===
      undefined
    ) {
      return new Error(
        `Cliente do CPF ${client.cpf} não possui conta no banco ${bank.bankName}`
      );
    }
    this.client = client;
    this.bank = bank;
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
    this.typeAccount = typeAccount;
    this.pixKeys = [];
  }

  get balance() {
    return this.#balance;
  }

  set balance(newBalance) {
    this.#balance = newBalance;
  }

  get monthIncome() {
    return this.#monthIncome;
  }

  set monthIncome(newIncome) {
    this.#monthIncome = newIncome;
  }

  hasPixKeyInThisAccount(newPix) {
    return (
      this.pixKeys.find((element) => element.cpf === newPix.cpf) !==
        undefined ||
      this.pixKeys.find((element) => element.email === newPix.email) !==
        undefined ||
      this.pixKeys.find((element) => element.phone === newPix.phone) !==
        undefined
    );
  }

  registerPix(newPix) {
    if (!(newPix instanceof Client)) {
      console.log("Informe um cliente válido");
      return;
    }

    if (this.hasPixKeyInThisAccount(newPix)) {
      console.log(`Cliente  ${newPix.name}, já se encontra registrado o pix`);
      return;
    }

    this.pixKeys.push(newPix);
    if (newPix) {
      const cpfIndex = Client.createPixKeys.findIndex(
        (element) => element.cpf === newPix.cpf
      );
      Client.createPixKeys[cpfIndex].qtdPixKeys++;
      console.log(`Pix ${newPix.cpf} criado para o cliente ${newPix.name}`);
    }
     if (newPix) {
      const emailIndex = Client.createPixKeys.findIndex(
        (element) => element.email === newPix.email
      );
      Client.createPixKeys[emailIndex].qtdPixKeys++;
      console.log(`Pix ${newPix.email} criado para o cliente ${newPix.name}`);}
   
      if (newPix) {
      const phoneIndex = Client.createPixKeys.findIndex(
        (element) => element.phone === newPix.phone
      );
      Client.createPixKeys[phoneIndex].qtdPixKeys++;
      console.log(`Pix ${newPix.phone} criado para o cliente ${newPix.name}`);
    } 
  }

  creditAmount(amount) {
    this.#balance += amount;
    console.log(`O novo saldo da conta é: R$ ${this.#balance}`);
  }

  debitAmount(amount) {
    this.#balance -= amount;
    console.log(`O novo saldo da conta é: R$ ${this.#balance}`);
  }

  transferTo(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      console.log("Informe uma conta válida!");
      return;
    }

    let amountToBeDebited = amount;
    if (this.bank.bankCode !== anotherAccount.bank.bankCode) {
      amountToBeDebited = amount + amount * this.bank.transferTax;
      console.log(
        `Essa transferência terá uma taxa de ${
          this.bank.transferTax * 100
        }%, pois se trata de uma transferência entre bancos diferentes.`
      );
    }

    if (this.#balance >= amountToBeDebited) {
      this.#balance -= amountToBeDebited;
      anotherAccount.balance += amount;

      console.log(`O saldo atual da conta de origem é de R$ ${this.#balance}`);
      console.log(
        `O saldo atual da conta de destino é de R$ ${anotherAccount.balance}`
      );
    } else {
      console.log(
        `Saldo insuficiente para realizar a transferência. Seu saldo atual é de ${
          this.#balance
        }. Para realizar essa transferência você precisa ter ${amountToBeDebited} em conta.`
      );
    }
  }

  transferByPix(anotherAccount, amount) {
    if (!(anotherAccount instanceof BankAccount)) {
      console.log("Informe uma conta válida!");
      return;
    }

    let amountToBeDebited = amount;
    if (
      this.bank.bankCode === anotherAccount.bank.bankCode &&
      this.pixKeys === anotherAccount.pixKeys
    ) {
      console.log("nao é possivel transferir ...........");
    }

    if (
      this.bank.bankCode !== anotherAccount.bank.bankCode &&
      this.pixKeys !== anotherAccount.pixKeys
    ) {
      amountToBeDebited = amount + amount * this.bank.transferTax;
      console.log(
        `Essa transferência terá uma taxa de ${
          this.bank.transferTax * 100
        }%, pois se trata de uma transferência entre bancos diferentes.`
      );
    }

    if (this.#balance >= amountToBeDebited) {
      this.#balance -= amountToBeDebited;
      anotherAccount.balance += amount;

      console.log(`O saldo atual da conta de origem é de R$ ${this.#balance}`);
      console.log(
        `O saldo atual da conta de destino é de R$ ${anotherAccount.balance}`
      );
    } else {
      console.log(
        `Saldo insuficiente para realizar a transferência. Seu saldo atual é de ${
          this.#balance
        }. Para realizar essa transferência você precisa ter ${amountToBeDebited} em conta.`
      );
    }
  }

  showAccount() {
    if (this.#monthIncome === "Standard") {
 
    console.log(`Conta ${this.typeAccount}`)
    
    } 
     if (this.typeAccount === "Gold") {
      console.log(`Conta ${this.typeAccount}`)
    }
    if (this.typeAccount === "Premium") {
      console.log(`Conta ${this.typeAccount}`)
    }
  }


  // showAccount() {
  //   if (this.#monthIncome === "Standard") {
 
  //   console.log(`Conta ${this.typeAccount}`)
    
  //   } 
  //    if (this.typeAccount === "Gold") {
  //     console.log(`Conta ${this.typeAccount}`)
  //   }
  //   if (this.typeAccount === "Premium") {
  //     console.log(`Conta ${this.typeAccount}`)
  //   }
  // }
}

module.exports = { BankAccount };
