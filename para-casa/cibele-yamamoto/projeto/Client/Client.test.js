const {Client} = require("./Client")

describe("Testes de clientes", () => {

    it("deve retornar conta do tipo 'standard'", () => {
        const testeCliente = new Client(1, "Maria", 1234567890, 1000)
        expect(testeCliente.accountType).toEqual("standard");
    });

    it("deve retornar conta do tipo 'gold'", () => {
        const testeCliente = new Client(2, "Joao", 2345678901, 6000)
        expect(testeCliente.accountType).toEqual("gold");
    });

    it("deve retornar conta do tipo 'premium'", () => {
        const testeCliente = new Client(3, "Paulo", 3456789012, 20000)
        expect(testeCliente.accountType).toEqual("premium");
    });

})
