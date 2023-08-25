import PremiumAccount from "./PremiumAccount.js";

describe("Teste da classe premiumAccount", () => {
  test("verificar se instancia de premiumAccount é feita corretamente", () => {
    const premiumAccount = new PremiumAccount();
    expect(premiumAccount instanceof PremiumAccount).toBe(true);

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // positivo -> deposito com valor positivo
  test("deposito com valor de 100 reais", () => {
    const premiumAccount = new PremiumAccount();
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    premiumAccount.deposit(100);

    expect(premiumAccount.getBalance()).toBe(10100);

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // negativo -> deposito com valor negativo
  test("deposito com valor de -100", () => {
    const premiumAccount = new PremiumAccount();
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    expect(() => premiumAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(premiumAccount.getBalance()).toBe(10000);

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // negativo -> deposito com valor não numérico
  test("deposito com valor não númérico", () => {
    const premiumAccount = new PremiumAccount();
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    expect(() => premiumAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(premiumAccount.getBalance()).toBe(10000);

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  test("instaciar conta com valores válidos", () => {
    const premiumAccount = new PremiumAccount();
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    expect(premiumAccount.getBalance()).toBe(10000);
    expect(premiumAccount.getAccountNumber()).toBe('12345');
    expect(premiumAccount.getAgency()).toBe('0001');

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // caso positivo -> dados válidos
  test("criar conta de com dados válidos e renda compatível", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const premiumAccount = new PremiumAccount();
    expect(premiumAccount.createAccount("12345", "0001", 500, 20000)).toBe("Conta criada com sucesso");
    expect(premiumAccount.getBalance()).toBe(500);
    expect(premiumAccount.getAccountNumber()).toBe('12345');
    expect(premiumAccount.getAgency()).toBe('0001');

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    const premiumAccount = new PremiumAccount();
    expect(() => premiumAccount.createAccount("12345", "0001", 500, 4000)).toThrow("Renda incompatível com o tipo de conta");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });


  // caso negativo -> algum dado inválido
  test("criar conta com dados inválidos", () => {
    const premiumAccount = new PremiumAccount();
    expect(() => premiumAccount.createAccount("1234", "0001", 20000, 20000)).toThrow("Dados inválidos para cadastro");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // criar chave pix cpf
  test("criar chave pix cpf com sucesso", () => {
    const premiumAccount = new PremiumAccount();
    expect(premiumAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(premiumAccount.pixKeys.cpf).toBe("37761514046");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // criar chave pix email
  test("criar chave pix email com sucesso", () => {
    const premiumAccount = new PremiumAccount();
    expect(premiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(premiumAccount.pixKeys.email).toBe("teste@reprograma.com.br");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // criar chave pix telefone
  test("criar chave pix telefone com sucesso", () => {
    const premiumAccount = new PremiumAccount();
    expect(premiumAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  // criar chave pix invalido
  test("criar chave pix cpf inválido", () => {
    const premiumAccount = new PremiumAccount();
    expect(() => premiumAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");

    // remover da lista de instâncias
    premiumAccount.destroy()

  });

  test("sacar 100 reais da conta", () => {
    const premiumAccount = new PremiumAccount();

    premiumAccount.createAccount('12346', '0001', 20000, 20000);

    premiumAccount.withdraw(100)
    expect(premiumAccount.getBalance()).toBe(19900);

    // remover da lista de instâncias
    premiumAccount.destroy()

  })

  test("sacar -100 reais da conta", () => {
    const premiumAccount = new PremiumAccount();

    premiumAccount.createAccount('12346', '0001', 20000, 20000);

    expect(() => premiumAccount.withdraw(-100)).toThrow("Valor inválido de saque")
    expect(premiumAccount.getBalance()).toBe(20000);

    // remover da lista de instâncias
    premiumAccount.destroy()
  })

  test("sacar '-100' reais da conta", () => {
    const premiumAccount = new PremiumAccount();

    premiumAccount.createAccount('12346', '0001', 20000, 20000);

    expect(() => premiumAccount.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(premiumAccount.getBalance()).toBe(20000);

    // remover da lista de instâncias
    premiumAccount.destroy()
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 10000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    //criar chave pix para a conta de destino
    topremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(frompremiumAccount.pix(100, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
    expect(topremiumAccount.getBalance()).toBe(20100);
    expect(frompremiumAccount.getBalance()).toBe(9900);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 10000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    //criar chave pix para a conta de destino
    topremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => frompremiumAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(10000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 4000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    //criar chave pix para a conta de destino
    topremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => frompremiumAccount.pix(4100, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 10000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    //criar chave pix para a conta de destino
    topremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => frompremiumAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(10000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 7000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    expect(frompremiumAccount.transfer(1000, '12345', '0001')).toBe("Transferência feita com sucesso")
    expect(frompremiumAccount.getBalance()).toBe(6000);
    expect(topremiumAccount.getBalance()).toBe(21000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 7000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    expect(() => frompremiumAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(7000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 4000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    expect(() => frompremiumAccount.transfer(4500, '12345', '0001')).toThrow("Você não possui saldo suficiente")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const frompremiumAccount = new PremiumAccount();
    const topremiumAccount = new PremiumAccount();

    // criar as contas
    frompremiumAccount.createAccount('12346', '0001', 10000, 20000)
    topremiumAccount.createAccount('12345', '0001', 20000, 20000)

    expect(() => frompremiumAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
    expect(topremiumAccount.getBalance()).toBe(20000);
    expect(frompremiumAccount.getBalance()).toBe(10000);

    frompremiumAccount.destroy();
    topremiumAccount.destroy();
  })
});
