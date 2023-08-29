// Importações
const { Bank } = require("./Bank");
const { Client } = require("./Client");
const { BankAccount } = require("./BankAccount");
const { StandardAccount } = require("./StandardAccount");
const { GoldAccount } = require("./GoldAccount");
const { PremiumAccount } = require("./PremiumAccount");



// Criação de bancos
const bank1 = new Bank(100, "Fast Bank", 0.01);
const bank2 = new Bank(200, "Code Bank", 0.02);
const bank3 = new Bank(300, "Top Bank", 0.01);
const bank4 = new Bank(400, "Save Bank", 0.02);
// Criação de clientes
const client1 = new Client("Tonia", 123456789, "email@email.com", "1159999999");
const client2 = new Client(
  "Simone",
  987654321,
  "email@simone.com",
  "63413178083"
);
const client3 = new Client("Ada", 987654321, "email@ada.com", "79067372021");

// // Associando clientes a bancos
client1.addBank(bank1);
client1.addBank(bank2);

client2.addBank(bank1);
client2.addBank(bank2);

client3.addBank(bank4);
client3.addBank(bank2);

// console.log(bank1);
// console.log(bank2);

// // Conferindo clientes
// console.log(client1);
// console.log(client2);
// console.log(client3);


client1.printAsString();

// Criação de conta
const bankAccount1 = new BankAccount(client1, bank1, 1111, 2222, "Standard");
const bankAccount2 = new BankAccount(client2, bank2, 3333, 4444, 'Gold');
const bankAccount3 = new BankAccount(client3, bank2, 3399, 4466, 'Premium');



bankAccount1.registerPix(client1);
bankAccount1.registerPix(client2);

bankAccount1.showAccount(client1);
bankAccount1.showAccount(client2);
//bankAccount3.showAccount(client3);

// console.log(bankAccount1);
// console.log(bankAccount2);
// console.log(bankAccount3);

const standardClient = new StandardAccount(client1, bank1, 1111, 2222, "Standard", 1000);

// console.log(client1);
console.log(standardClient);
// console.log(client3);

// console.log(bankAccount1);
// console.log(bankAccount2);
// console.log(bankAccount3);