const {Client} = require('./Client/Client')
const {Account} = require('./Account/Account')
const {StandardAccount} = require('./StandardAccount/StandardAccount')
const {GoldAccount} = require('./GoldAccount/GoldAccount')
const {PremiumAccount} = require('./PremiumAccount/PremiumAccount')


const cibele = new Client(1, "Cibele", 1234567890, 1000);
const joao = new Client(2, "Joao", 2345678901, 5000);
const maria = new Client(3, "Maria", 3456789012, 18000);

console.log("=== CLIENTES ===")
console.log(cibele);
console.log(joao);
console.log(maria);

// Testar no Jest a criação em perfils errados
const conta1 = new StandardAccount(1, 11, cibele)
const conta2 = new GoldAccount(2, 22, joao)
const conta3 = new PremiumAccount(3, 33, maria)

conta1.configurePix("email", "cibelety@gmail.com")
conta2.configurePix("telefone", "1234-56789")
conta3.configurePix("cpf", "3456789012")

console.log("=== CONTAS ===")
console.log(conta1);
console.log(conta2);
console.log(conta3);

conta1.deposit(2000);
conta1.withdraw(1000);

conta2.deposit(3000);
conta2.withdraw(1000);

conta3.deposit(4000);
conta3.withdraw(1000);

console.log("ALL ACCOUNTS")
console.log(Account.allAccounts)


console.log("TRANSFERENCIA")
conta1.transferTo(2, 2345678901, 100)
conta2.transferTo(3, 3456789012, 100)

Account.allAccounts.forEach(element => console.log(element.balance))

console.log("PIX")
conta1.pix("cpf", "3456789012", 10)
conta1.pix("telefone", "1234-56789", 10)

Account.allAccounts.forEach(element => console.log(element.balance))

/*
=== CLIENTES === >>> OK
Standard - OK
Clientes com conta standard são os clientes base  com até R$4999,99 de renda mensal. Eles também tem limite de transação de 1000 reais podo banco, são pessoasr dia.

Gold - OK
Clientes com conta Gold são so clientes intermediários do banco com renda mensal de R$5000,00 até R$17.999,99. Eles também tem limite de transação de 5000 reais por dia.

Premium - OK
Clientes com conta premium são aqueles que possuem renda mensal a partir de R$18.000,00. Eles não tem limite de transação por dia.

=== OPERACOES ===
*Em todas as transações é necessário verificar se o cliente possui saldo disponível para realizá-la.

Depósito - OK
O cliente também pode depositar dinheiro em sua conta, passando apenas o valor a ser depositado.

Saque - OK
O cliente pode optar por sacar dinheiro em uma dos nossos caixas eletrônicos e para isso basta solicitar o saque e o valor a ser retirado.

Transferência
Temos também a opção por transferência, para realizar esta operação é necessário ter a conta do banco do destinatário, CPF e valor a ser transferido.

PIX
Podemos cadastrar chaves pix para nossos clientes, no momento apenas chaves de e-mail, telefone e cpf para simplificar nosso exercício. Com as chaves pix é possível transferir dinheiro para outra conta de nosso banco. Para realizar a transação é necessário ter a chave pix de quem irá receber e o valor a ser transferido via pix.
*/

