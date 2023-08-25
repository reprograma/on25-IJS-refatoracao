const {Client} = require('../Client/Client')
const {StandardAccount} = require('../StandardAccount/StandardAccount')


describe("teste das contas", () => {

    beforeEach(() => {
        const cibele = new Client(1, "Cibele", 1234567890, 1000)
        return testeConta = new StandardAccount(1, 11, cibele)
    });

    it("teste de depósito", () => {
        testeConta.deposit(2000)
        expect(testeConta.balance).toEqual(2000)
    });

    it("teste de saque", () => {
        testeConta.deposit(2000)
        testeConta.withdraw(500)
        expect(testeConta.balance).toEqual(1500)
    });
});

