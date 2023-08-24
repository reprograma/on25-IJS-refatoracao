const { Clients } = require('./Client');
const { Gold } = require('./GoldAccount');
const { Standard } = require('./StandardAccount');
const { Premium } = require('./PremiunAccount');
const { BankAccount } = require('./Account');

const pedrin = new Premium("Pedro", 78657, "pedrin@outlook.com", 1195648392, 20000);
const doria = new Gold("Dória", 42354, "dooh@gmail.com", 119876564, 15000);
const phy = new Gold("Aileen", 647563, "aileen@yahoo.com", 119567384, 12000);
const keiko = new Standard("Letícia", 87645, "keikoo@hotmail.com", 1196765432, 4990);

const doriaAccount = new BankAccount(doria, '12345', '6789');
const phyAccount = new BankAccount(phy, '23455', '7685');
const pedrinAccount = new BankAccount(pedrin, '34567', '9876');
const keikoAccount = new BankAccount(keiko, '47658', '5687');

doriaAccount.createdPix('cpf');
doriaAccount.createdPix('telefone');
doriaAccount.createdPix('e-mail');
doriaAccount.createdPix('chave aleatória');

doriaAccount.creditAmount(1000);

phyAccount.createdPix('cpf');
phyAccount.createdPix('telefone');
phyAccount.createdPix('chave aleatória');

console.log(doriaAccount);
console.log(keikoAccount);

doriaAccount.transferPix(300, 647563);

phyAccount.transferTo(100, 78657, '34567')

phyAccount.creditAmount(7000);

phyAccount.transferTo(6000, 78657, '34567')

pedrinAccount.cashWithdrawal(30);

// console.log(BankAccount.all);





