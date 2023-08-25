import Account from "./Account.js";

describe("Teste da classe Account", () => {
  test("verificar se instancia de Account é feita corretamente", () => {
    const account = new Account();
    expect(account instanceof Account).toBe(true);
    
    // remover da lista de instâncias
    account.destroy()

  });

  // positivo -> deposito com valor positivo
  test("deposito com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
    
    // remover da lista de instâncias
    account.destroy()

  });

  // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(account.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    account.destroy()

  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(account.getBalance()).toBe(500);
    
    // remover da lista de instâncias
    account.destroy()

  });

  test("instaciar conta com valores válidos", () => {
    const account = new Account('12345', '0001', 1000);
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
    
    // remover da lista de instâncias
    account.destroy()

  });

  // caso positivo -> dados válidos
  test("criar conta de com dados válidos", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const account = new Account();
    expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso");
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
    
    // remover da lista de instâncias
    account.destroy()

  });

  // caso negativo -> algum dado inválido
  test("criar conta com dados inválidos", () => {
    const account = new Account();
    expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    
    // remover da lista de instâncias
    account.destroy()

  });

  // criar chave pix cpf
  test("criar chave pix cpf com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(account.pixKeys.cpf).toBe("37761514046");
    
    // remover da lista de instâncias
    account.destroy()

  });

  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
    
    // remover da lista de instâncias
    account.destroy()

  });

  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
    const account = new Account();
    expect(account.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    
    // remover da lista de instâncias
    account.destroy()

  });

  // criar chave pix invalido
  test("criar chave pix cpf inválido", () => {
    const account = new Account();
    expect(() => account.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    
    // remover da lista de instâncias
    account.destroy()

  });

  test("sacar 100 reais da conta", () => {
    const account = new Account();

    account.createAccount('12346', '0001', 500);

    account.withdraw(100)
    expect(account.getBalance()).toBe(400);
    
    // remover da lista de instâncias
    account.destroy()

  })

  test("sacar -100 reais da conta", () => {
    const account = new Account();

    account.createAccount('12346', '0001', 500);

    expect(() => account.withdraw(-100)).toThrow("Valor inválido de saque")
    expect(account.getBalance()).toBe(500);
    
    // remover da lista de instâncias
    account.destroy()
  })

  test("sacar '-100' reais da conta", () => {
    const account = new Account();

    account.createAccount('12346', '0001', 500);

    expect(() => account.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(account.getBalance()).toBe(500);

    // remover da lista de instâncias
    account.destroy()
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(fromAccount.pix(10, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
    expect(toAccount.getBalance()).toBe(510);
    expect(fromAccount.getBalance()).toBe(990);
    
    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 200)
    toAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(300, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    //criar chave pix para a conta de destino
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 300)
    toAccount.createAccount('12345', '0001', 500)

    expect(fromAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso")
    expect(fromAccount.getBalance()).toBe(290);
    expect(toAccount.getBalance()).toBe(510);
    
    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 200)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(300, '12345', '0001')).toThrow("Você não possui saldo suficiente")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    // remover da lista de instâncias
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const fromAccount = new Account();
    const toAccount = new Account();

    // criar as contas
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    fromAccount.destroy();
    toAccount.destroy();
  })
});
