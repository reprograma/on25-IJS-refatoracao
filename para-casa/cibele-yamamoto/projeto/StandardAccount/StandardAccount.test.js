import StandardAccount from "./StandardAccount.js";

describe("Teste da classe StandardAccount", () => {
  test("verificar se instancia de StandardAccount é feita corretamente", () => {
    const standardAccount = new StandardAccount();
    expect(standardAccount instanceof StandardAccount).toBe(true);
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // positivo -> deposito com valor positivo
  test("deposito com valor de 100 reais", () => {
    const standardAccount = new StandardAccount();
    standardAccount.createAccount('12345', '0001', 1000);
    standardAccount.deposit(100);

    expect(standardAccount.getBalance()).toBe(1100);
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const standardAccount = new StandardAccount();
    standardAccount.createAccount('12345', '0001', 1000);
    expect(() => standardAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(standardAccount.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não númérico", () => {
    const standardAccount = new StandardAccount();
    standardAccount.createAccount('12345', '0001', 1000);
    expect(() => standardAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(standardAccount.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  test("instaciar conta com valores válidos", () => {
    const standardAccount = new StandardAccount();
    standardAccount.createAccount('12345', '0001', 1000);
    expect(standardAccount.getBalance()).toBe(1000);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // caso positivo -> dados válidos
  test("criar conta de com dados válidos e renda compatível", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const standardAccount = new StandardAccount();
    expect(standardAccount.createAccount("12345", "0001", 500, 2000)).toBe("Conta criada com sucesso");
    expect(standardAccount.getBalance()).toBe(500);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const standardAccount = new StandardAccount();
    expect(() => standardAccount.createAccount("12345", "0001", 500, 10000)).toThrow("Renda incompatível com o tipo de conta");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // caso negativo -> algum dado inválido
  test("criar conta com dados inválidos", () => {
    const standardAccount = new StandardAccount();
    expect(() => standardAccount.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // criar chave pix cpf
  test("criar chave pix cpf com sucesso", () => {
    const standardAccount = new StandardAccount();
    expect(standardAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(standardAccount.pixKeys.cpf).toBe("37761514046");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
    const standardAccount = new StandardAccount();
    expect(standardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(standardAccount.pixKeys.email).toBe("teste@reprograma.com.br");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
    const standardAccount = new StandardAccount();
    expect(standardAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  // criar chave pix invalido
  test("criar chave pix cpf inválido", () => {
    const standardAccount = new StandardAccount();
    expect(() => standardAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    
    // remover da lista de instâncias
    standardAccount.destroy()

  });

  test("sacar 100 reais da conta", () => {
    const standardAccount = new StandardAccount();

    standardAccount.createAccount('12346', '0001', 500);

    standardAccount.withdraw(100)
    expect(standardAccount.getBalance()).toBe(400);
    
    // remover da lista de instâncias
    standardAccount.destroy()

  })

  test("sacar -100 reais da conta", () => {
    const standardAccount = new StandardAccount();

    standardAccount.createAccount('12346', '0001', 500);

    expect(() => standardAccount.withdraw(-100)).toThrow("Valor inválido de saque")
    expect(standardAccount.getBalance()).toBe(500);
    
    // remover da lista de instâncias
    standardAccount.destroy()
  })

  test("sacar '-100' reais da conta", () => {
    const standardAccount = new StandardAccount();

    standardAccount.createAccount('12346', '0001', 500);

    expect(() => standardAccount.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(standardAccount.getBalance()).toBe(500);

    // remover da lista de instâncias
    standardAccount.destroy()
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 1000)
    toStandardAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(fromStandardAccount.pix(10, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
    expect(toStandardAccount.getBalance()).toBe(510);
    expect(fromStandardAccount.getBalance()).toBe(990);
    
    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 2000)
    toStandardAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromStandardAccount.pix(1200, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);
    
    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 1000)
    toStandardAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromStandardAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 200)
    toStandardAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromStandardAccount.pix(300, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);

    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 1000)
    toStandardAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromStandardAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 300)
    toStandardAccount.createAccount('12345', '0001', 500)

    expect(fromStandardAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso")
    expect(fromStandardAccount.getBalance()).toBe(290);
    expect(toStandardAccount.getBalance()).toBe(510);
    
    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 1000)
    toStandardAccount.createAccount('12345', '0001', 500)

    expect(() => fromStandardAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 2000)
    toStandardAccount.createAccount('12345', '0001', 500)

    expect(() => fromStandardAccount.transfer(1200, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);

    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 200)
    toStandardAccount.createAccount('12345', '0001', 500)

    expect(() => fromStandardAccount.transfer(300, '12345', '0001')).toThrow("Você não possui saldo suficiente")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);

    // remover da lista de instâncias
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();

    // criar as contas
    fromStandardAccount.createAccount('12346', '0001', 1000)
    toStandardAccount.createAccount('12345', '0001', 500)

    expect(() => fromStandardAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  })
});
