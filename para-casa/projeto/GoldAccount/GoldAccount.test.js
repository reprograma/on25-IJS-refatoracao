const { GoldAccount } = require("./GoldAccount.js");

describe("Teste da classe GoldAccount", () => {

    test("verificar se a instância de GoldAccount é feita corretamente", () => {
        const goldAccount = new GoldAccount();
        expect(goldAccount instanceof GoldAccount).toBe(true);
    });

    test("remover a conta da lista", () => {
        const goldAccount = new goldAccount();
        goldAccount.createAccount('12345', '0001', 1000, 6000);
        goldAccount.removeAccount()
    });

    test("criar conta com valores válidos", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12345', '0001', 1000, 6000);
        expect(goldAccount.balance).toBe(1000);
        expect(goldAccount.accountNumber).toBe('12345');
        expect(goldAccount.agency).toBe('0001');
    });

    test("criar conta com dados válidos e renda compatível", () => {
        const goldAccount = new GoldAccount();
        expect(goldAccount.createAccount("12345", "0001", 500, 6000)).toBe("Conta criada com sucesso");
        expect(goldAccount.balance).toBe(500);
        expect(goldAccount.accountNumber).toBe('12345');
        expect(goldAccount.agency).toBe('0001');
      });

    test("criar conta com dados válidos e renda incompatível", () => {
        const goldAccount = new GoldAccount();
        expect(() => goldAccount.createAccount("12345", "0001", 500, 4000)).toThrow("Renda incompatível com o tipo de conta");
    });

    test("criar conta com dados inválidos", () => {
        const goldAccount = new GoldAccount();
        expect(() => goldAccount.createAccount("1234", "0001", 6000, 7000)).toThrow("Dados inválidos para cadastro");
    });
});

describe("Testes de depósitos nas contas GoldAccount", () => {

    test("deposito com valor de R$ 100 em conta com saldo de R$ 1000", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12345', '0001', 1000, 6000);
        goldAccount.deposit(100);
    
        expect(goldAccount.balance).toBe(1100);
    });

    test("deposito com valor de negativo de R$ 100", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12345', '0001', 1000, 6000);
        expect(() => goldAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(goldAccount.balance).toBe(1000);
    });

    test("deposito com valor não númérico", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12345', '0001', 1000, 6000);
        expect(() => goldAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
        expect(goldAccount.balance).toBe(1000);
    });

});

describe("Testes de criação de chave PIX", () => {

    test("criar chave pix cpf com sucesso", () => {
        const goldAccount = new GoldAccount();
        expect(goldAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
        expect(goldAccount.pixKeys.cpf).toBe("37761514046");
    });

    test("criar chave pix email com sucesso", () => {
        const goldAccount = new GoldAccount();
        expect(goldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
        expect(goldAccount.pixKeys.email).toBe("teste@reprograma.com.br");
    });

    test("criar chave pix telefone com sucesso", () => {
        const goldAccount = new GoldAccount();
        expect(goldAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    });

    test("criar chave pix cpf inválido", () => {
        const goldAccount = new GoldAccount();
        expect(() => goldAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    });
});


describe("Testes de saque em contas tipo GoldAccount", () => {

    test("sacar R$ 100 de conta com saldo de R$ 6000", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12346', '0001', 6000, 7000);
    
        goldAccount.withdraw(100)
        expect(goldAccount.balance).toBe(5900);
    });

    test("sacar valor negativo da conta", () => {
        const goldAccount = new GoldAccount();
        goldAccount.createAccount('12346', '0001', 6000, 7000);
    
        expect(() => goldAccount.withdraw(-100)).toThrow("Valor inválido de saque")
        expect(goldAccount.balance).toBe(6000);
    })

});


describe("Testes de transferências por PIX", () => {

    test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(fromgoldAccount.pix(100, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
        expect(togoldAccount.balance).toBe(6100);
        expect(fromgoldAccount.balance).toBe(900);
    });

    test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();

        fromgoldAccount.createAccount('12346', '0001', 5500, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)

        togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromgoldAccount.pix(5500, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(5500);
    });

    test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();

        fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)

        togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromgoldAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(1000);
    });

    test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();

        fromgoldAccount.createAccount('12346', '0001', 4000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)

        togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromgoldAccount.pix(4100, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(4000);
    })

    test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();

        fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)

        togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromgoldAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(1000);
    })
});


describe("Testes de transferência para outra conta GoldAccount", () => {

    test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        expect(fromgoldAccount.transfer(100, '12345', '0001')).toBe("Transferência feita com sucesso")
        expect(fromgoldAccount.balance).toBe(6900);
        expect(togoldAccount.balance).toBe(6100);
    });

    test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        expect(() => fromgoldAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(7000);
    });

    test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        expect(() => fromgoldAccount.transfer(6000, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(7000);
    });

    test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 4000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        expect(() => fromgoldAccount.transfer(4500, '12345', '0001')).toThrow("Você não possui saldo suficiente")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(4000);
    });

    test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
        const fromgoldAccount = new GoldAccount();
        const togoldAccount = new GoldAccount();
        fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
        togoldAccount.createAccount('12345', '0001', 6000, 7000)
    
        expect(() => fromgoldAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
        expect(togoldAccount.balance).toBe(6000);
        expect(fromgoldAccount.balance).toBe(1000);
    });
})




