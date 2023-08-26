const { StandardAccount } = require("./StandardAccount.js");

describe("Teste da classe StandardAccount", () => {

    test("verificar se a instância de StandardAccount é feita corretamente", () => {
        const standardAccount = new StandardAccount();
        expect(standardAccount instanceof StandardAccount).toBe(true);
    });

    test("remover a conta da lista", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12345', '0001', 1000);
        standardAccount.removeAccount()
    });

    test("criar conta com valores válidos", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12345', '0001', 1000);
        expect(standardAccount.balance).toBe(1000);
        expect(standardAccount.accountNumber).toBe('12345');
        expect(standardAccount.agency).toBe('0001');
    });

    test("criar conta com dados válidos e renda compatível", () => {
        const standardAccount = new StandardAccount();
        expect(standardAccount.createAccount("12345", "0001", 500, 2000)).toBe("Conta criada com sucesso");
        expect(standardAccount.balance).toBe(500);
        expect(standardAccount.accountNumber).toBe('12345');
        expect(standardAccount.agency).toBe('0001');
      });

    test("criar conta com dados válidos e renda incompatível", () => {
        const standardAccount = new StandardAccount();
        expect(() => standardAccount.createAccount("12345", "0001", 500, 10000)).toThrow("Renda incompatível com o tipo de conta");
    });

    test("criar conta com dados inválidos", () => {
        const standardAccount = new StandardAccount();
        expect(() => standardAccount.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    });
});

describe("Testes de depósitos nas contas StandardAccount", () => {

    test("deposito com valor de R$ 100 em conta com saldo de R$ 1000", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12345', '0001', 1000);
        standardAccount.deposit(100);
    
        expect(standardAccount.balance).toBe(1100);
    });

    test("deposito com valor de negativo de R$ 100", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12345', '0001', 1000);
        expect(() => standardAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
        expect(standardAccount.balance).toBe(1000);
    });

    test("deposito com valor não númérico", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12345', '0001', 1000);
        expect(() => standardAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
        expect(standardAccount.balance).toBe(1000);
    });

});

describe("Testes de criação de chave PIX", () => {

    test("criar chave pix cpf com sucesso", () => {
        const standardAccount = new StandardAccount();
        expect(standardAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
        expect(standardAccount.pixKeys.cpf).toBe("37761514046");
    });

    test("criar chave pix email com sucesso", () => {
        const standardAccount = new StandardAccount();
        expect(standardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
        expect(standardAccount.pixKeys.email).toBe("teste@reprograma.com.br");
    });

    test("criar chave pix telefone com sucesso", () => {
        const standardAccount = new StandardAccount();
        expect(standardAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    });

    test("criar chave pix cpf inválido", () => {
        const standardAccount = new StandardAccount();
        expect(() => standardAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    
    });
});


describe("Testes de saque em contas tipo StandardAccount", () => {

    test("sacar R$ 100 de conta com saldo de R$ 500", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12346', '0001', 500);
        standardAccount.withdraw(100)
        expect(standardAccount.balance).toBe(400);
    });

    test("sacar valor negativo da conta", () => {
        const standardAccount = new StandardAccount();
        standardAccount.createAccount('12346', '0001', 500);
    
        expect(() => standardAccount.withdraw(-100)).toThrow("Valor inválido de saque")
        expect(standardAccount.balance).toBe(500);
    })

});


describe("Testes de transferências por PIX", () => {

    test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 1000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(fromStandardAccount.pix(10, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
        expect(toStandardAccount.balance).toBe(510);
        expect(fromStandardAccount.balance).toBe(990);
    });

    test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 2000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromStandardAccount.pix(1200, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(2000);
    });

    test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 1000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromStandardAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(1000);
    });

    test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 200)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromStandardAccount.pix(300, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(200);    
    })

    test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 1000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
        expect(() => fromStandardAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(1000);
    
    })
});


describe("Testes de transferência para outra conta StandardAccount", () => {

    test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 300)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        expect(fromStandardAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso")
        expect(fromStandardAccount.balance).toBe(290);
        expect(toStandardAccount.balance).toBe(510);
    });

    test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 1000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        expect(() => fromStandardAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(1000);
    });

    test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 2000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        expect(() => fromStandardAccount.transfer(1200, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(2000);
    });

    test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 200)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        expect(() => fromStandardAccount.transfer(300, '12345', '0001')).toThrow("Você não possui saldo suficiente")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(200);
    });

    test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
        const fromStandardAccount = new StandardAccount();
        const toStandardAccount = new StandardAccount();
        fromStandardAccount.createAccount('12346', '0001', 1000)
        toStandardAccount.createAccount('12345', '0001', 500)
    
        expect(() => fromStandardAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
        expect(toStandardAccount.balance).toBe(500);
        expect(fromStandardAccount.balance).toBe(1000);
    });
})



/*


  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {

    fromStandardAccount.removeAccount();
    toStandardAccount.removeAccount();
  })
}); */
