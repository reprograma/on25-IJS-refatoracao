// Importações
const { Bank } = require('./Bank');
const { Client } = require('./Client');
const { BankAccount } = require('./BankAccount');
const { StandardAccount} = require('./StandardAccount');
const { GoldAccount} = require('./GoldAccount');
const { PremiumAccount} = require('./PremiumAccount');
// Criação de bancos
const bank1 = new Bank(100, 'Lua Bank', 0.01);
const bank2 = new Bank(200, 'Code Bank', 0.02);

// Criação de clientes
const client1 = new Client('Luara' , 123456789, 'email@email.com', '1159999999');
const client2 = new Client('Simone', 987654321);
const client3 = new Client('Ada', 987654321);

// // Associando clientes a bancos
client1.addBank(bank1); // Banco 100 adicionado à cliente Luara.
client1.addBank(bank1); // Cliente do CPF 123456789 já possui conta no banco Lua Bank.
// client1.addBank(bank2); // Banco 200 adicionado à cliente Luara.
// client1.removeBank(bank2); // Banco 200 removido da cliente Luara
// client1.removeBank(bank2); // Cliente do CPF 123456789 não possui conta no banco Code Bank para ser removida.

client2.addBank(bank1); // Banco 100 adicionado à cliente Simone.
client2.addBank(bank2); // Banco 200 adicionado à cliente Simone.

// client3.addBank(bank1); // Banco 100 adicionado à cliente Ada.
// client3.addBank(bank2); // Banco 200 adicionado à cliente Ada.

// client3.addBank("Banco que não existe"); // Informe um banco válido.

// // Conferindo bancos
// console.log(Bank.createdBanks); // [ { bankCode: 100, qtdClients: 3 }, { bankCode: 200, qtdClients: 2 } ]

console.log(bank1);
console.log(bank2);

// /*
// Exemplo do que será impresso:
// Bank { bankCode: 100, bankName: 'Lua Bank' }
// */

// Conferindo clientes
console.log(client1);
console.log(client2);
console.log(client3);



client1.printAsString()

// /*
// Client {
//   name: 'Ada',
//   banks: [
//     Bank { bankCode: 100, bankName: 'Lua Bank' },
//     Bank { bankCode: 200, bankName: 'Code Bank' }
//   ]
// }
// */

// Criação de conta
const bankAccount1 = new BankAccount(client1, bank1, 1111, 2222, 'Standard');
const bankAccount2 = new BankAccount(client2, bank2, 3333, 4444);

console.log(bankAccount1)
bankAccount1.registerPix(client1)
bankAccount1.registerPix(client1)
bankAccount1.showAccount()
// // Utilizando os métodos de Conta Corrente
// bankAccount1.creditAmount(5000); // O novo saldo da conta após o crédito é: R$ 5000,00
// bankAccount2.creditAmount(2000); // O novo saldo da conta após o crédito é: R$ 2000,00

// // Transferência entre bancos diferentes
//bankAccount1.transferByPix(bankAccount1, 1500);


//bankAccount1.showAccount('Gold')
//bankAccount2.transferTo(bankAccount1, 5000);

/** Exemplo de saídas:
  Essa transferência  terá uma taxa de 1%, pois se trata de uma transferência entre bancos diferentes.
  O saldo atual da conta de origem é de R$ 3485
  O saldo atual da conta de destino é de R$ 3500

  ---

  Essa transferência terá uma taxa de 2%, pois se trata de uma transferência entre bancos diferentes.
  Saldo insuficiente para realizar a transferência. Seu saldo atual é de 3500.
  Para realizar essa transferência você precisa ter 5100 em conta.
*/
