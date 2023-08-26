import { Account } from "./Account/Account.js";
import { Client } from "./Client/Client.js";

const maria = new Client("maria", 12334455511, "maria@gmail.com", 999999999); //Client { name: 'maria' }
const miguel = new Client("miguel", 12334455521, "miguel@gmail.com", 999699999);  //Client { name: 'miguel' }

maria.email = "mariaJulia@gmail.com";
console.log(maria.email); //mariaJulia@gmail.com

const contaMaria = new Account(maria, 1234, 12345, 6000); //Account { client: Client { name: 'maria' }, category: [ 'Gold' ] }
const contaMiguel = new Account(miguel, 1234, 12345, 4000); //Account { client: Client { name: 'miguel' }, category: [ 'Standard' ] }


contaMaria.pixKey("email"); //Chave pix: maria@gmail.com criada com sucesso! 
contaMiguel.pixKey("email"); //Chave pix: miguel@gmail.com criada com sucesso!  
contaMiguel.pixKey("cpf"); //Chave pix: 12334455521 criada com sucesso!   
contaMiguel.pixKey("phone"); // Chave pix: 999699999 criada com sucesso!

contaMiguel.transferTo(contaMaria, 12334455511, 500); //Transferência no valor de R$ 500,00 realizada com sucesso! Seu saldo atualizado é de R$ 3500,00. 
contaMiguel.transferTo(contaMaria, 12334455511, 550); //Você ultrapassou seu limite diário de transferência!

contaMaria.transferTo(contaMiguel, 12334455521, 3000); //Transferência no valor de R$ 3000,00 realizada com sucesso! Seu saldo atualizado é de R$ 3500,00.
contaMaria.transferTo(contaMiguel, 12334455521, 2000); //Transferência no valor de R$ 2000,00 realizada com sucesso! Seu saldo atualizado é de R$ 1500,00.

contaMiguel.pix(contaMaria, "mariaJulia@gmail.com", 300); //Pix no valor de R$ 300,00 realizado com sucesso! Seu saldo atualizado é de R$ 8200,00
contaMiguel.pix(contaMaria, "mariana@gmail.com", 300); //Você não tem a quantia necessária para fazer o pix ou sua chave está incorreta/não existe!

contaMaria.withdraw(20); //Saque no valor de R$ 20,00 realizado com sucesso! Seu saldo atualizado é de R$ 1780,00.
contaMaria.withdraw(2000); //"Você não tem a quantia necessária para fazer essa transferência!

contaMaria.deposit(300); //Deposito realizado com sucesso! Seu saldo atualizado é de R$ 2080,00!
contaMaria.deposit(0); //Você precisa colocar um valor maior que 0 para que o deposito seja realizado!  


console.log(contaMiguel.pixKeyList); //[ { email: 'miguel@gmail.com' }, { cpf: 12334455521 }, { phone: 999699999 } ]