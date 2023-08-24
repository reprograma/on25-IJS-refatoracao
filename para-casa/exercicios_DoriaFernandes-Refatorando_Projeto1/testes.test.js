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

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(doriaAccount.createdPix('cpf')).toEqual(output);
    })
})

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(doriaAccount.createdPix('telefone')).toEqual(output);
    })
})

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(doriaAccount.createdPix('e-mail')).toEqual(output);
    })
})

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(doriaAccount.createdPix('chave aleatória')).toEqual(output);
    })
})

describe('creditAmount function', () => {

    test('Realizar o deposito', () => {
        const output = 'creditado';
        expect(doriaAccount.creditAmount(1000)).toEqual(output);
    })
});

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(phyAccount.createdPix('cpf')).toEqual(output);
    })
})

describe('createdPix function', () => {
    test('Criando chave PIX', () => {
        const output = 'criado';
        expect(phyAccount.createdPix('chave aleatória')).toEqual(output);
    })
})

describe('transferPix function', () => {
    test('Fazendo um PIX', () => {
        const output = 'ok';
        expect(doriaAccount.transferPix(300, 647563)).toEqual(output);
    })
})

describe('transferTo function', () => {

    test('Realizando um TED', () => {
        const output = 'ok';
        expect(phyAccount.transferTo(100, 78657, '34567')).toEqual(output);
    })
});

describe('creditAmount function', () => {

    test('Realizar o deposito', () => {
        const output = 'creditado';
        expect(phyAccount.creditAmount(7000)).toEqual(output);
    })
});

describe('transferTo function', () => {

    test('Realizando um TED', () => {
        const output = 'error limite';
        expect(phyAccount.transferTo(6000, 78657, '34567')).toEqual(output);
    })
});

describe('cashWithdrawal function', () => {

    test('Realizar o saque', () => {
        const output = 'ok';
        expect(pedrinAccount.cashWithdrawal(30)).toEqual(output);
    })
});