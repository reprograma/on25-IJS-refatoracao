import GoldAccount from "./GoldAccount.js";

describe("Teste da classe GoldAccount", () => {
  test("verificar se instancia de GoldAccount é feita corretamente", () => {
    const goldAccount = new GoldAccount();
    expect(goldAccount instanceof GoldAccount).toBe(true);
    
    goldAccount.destroy()

  });

  test("deposito com valor de 100 reais", () => {
    const goldAccount = new GoldAccount();
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    goldAccount.deposit(100);

    expect(goldAccount.getBalance()).toBe(1100);
    
    goldAccount.destroy()

  });


  test("deposito com valor de -100", () => {
    const goldAccount = new GoldAccount();
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(() => goldAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(goldAccount.getBalance()).toBe(1000);
    
    goldAccount.destroy()

  });

  
  test("deposito com valor não númérico", () => {
    const goldAccount = new GoldAccount();
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(() => goldAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(goldAccount.getBalance()).toBe(1000);
    
    goldAccount.destroy()

  });

  test("instaciar conta com valores válidos", () => {
    const goldAccount = new GoldAccount();
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(goldAccount.getBalance()).toBe(1000);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
    
    goldAccount.destroy()

  });

  test("criar conta de com dados válidos e renda compatível", () => {
    const goldAccount = new GoldAccount();
    expect(goldAccount.createAccount("12345", "0001", 500, 6000)).toBe("Conta criada com sucesso");
    expect(goldAccount.getBalance()).toBe(500);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
    
    goldAccount.destroy()

  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    const goldAccount = new GoldAccount();
    expect(() => goldAccount.createAccount("12345", "0001", 500, 4000)).toThrow("Renda incompatível com o tipo de conta");
    
    goldAccount.destroy()

  });


  test("criar conta com dados inválidos", () => {
    const goldAccount = new GoldAccount();
    expect(() => goldAccount.createAccount("1234", "0001", 6000, 7000)).toThrow("Dados inválidos para cadastro");
    
    goldAccount.destroy()

  });

  test("criar chave pix cpf com sucesso", () => {
    const goldAccount = new GoldAccount();
    let cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    expect(goldAccount.validInformation(cpfRegex, "37761514046", "CPF")).toBe("Chave pix CPF criada com sucesso")
    
    goldAccount.createPixKey("37761514046", "CPF")
    expect(goldAccount.pixKeys.cpf).toBe("37761514046");
    
    goldAccount.destroy()
  });

  test("criar chave pix email com sucesso", () => {
    const goldAccount = new GoldAccount();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    expect(goldAccount.validInformation(emailRegex, "teste@reprograma.com.br", "EMAIL")).toBe("Chave pix EMAIL criada com sucesso")
    
    goldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(goldAccount.pixKeys.email).toBe("teste@reprograma.com.br");
    
    goldAccount.destroy()
  });

  test("criar chave pix telefone com sucesso", () => {
    const goldAccount = new GoldAccount();
    let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    expect(goldAccount.validInformation(phoneRegex, "11912345678", "TELEFONE")).toBe("Chave pix TELEFONE criada com sucesso")
    
    goldAccount.createPixKey("11912345678", "TELEFONE")
    expect(goldAccount.pixKeys.telefone).toBe("11912345678");
    
    goldAccount.destroy()
  })

  test("criar chave pix cpf inválido", () => {
    const goldAccount = new GoldAccount();
    expect(() => goldAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    
    goldAccount.destroy()

  });

  test("sacar 100 reais da conta", () => {
    const goldAccount = new GoldAccount();

    goldAccount.createAccount('12346', '0001', 6000, 7000);

    goldAccount.withdraw(100)
    expect(goldAccount.getBalance()).toBe(5900);
    
    // remover da lista de instâncias
    goldAccount.destroy()

  })

  test("sacar -100 reais da conta", () => {
    const goldAccount = new GoldAccount();

    goldAccount.createAccount('12346', '0001', 6000, 7000);

    expect(() => goldAccount.withdraw(-100)).toThrow("Valor inválido de saque")
    expect(goldAccount.getBalance()).toBe(6000);
    
    // remover da lista de instâncias
    goldAccount.destroy()
  })

  test("sacar '-100' reais da conta", () => {
    const goldAccount = new GoldAccount();

    goldAccount.createAccount('12346', '0001', 6000, 7000);

    expect(() => goldAccount.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(goldAccount.getBalance()).toBe(6000);

    // remover da lista de instâncias
    goldAccount.destroy()
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(fromgoldAccount.pix(100, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
    expect(togoldAccount.getBalance()).toBe(6100);
    expect(fromgoldAccount.getBalance()).toBe(900);
    
    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 5500, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromgoldAccount.pix(5500, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(5500);
    
    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromgoldAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 4000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromgoldAccount.pix(4100, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromgoldAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);
    
    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    expect(fromgoldAccount.transfer(100, '12345', '0001')).toBe("Transferência feita com sucesso")
    expect(fromgoldAccount.getBalance()).toBe(6900);
    expect(togoldAccount.getBalance()).toBe(6100);
    
    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    expect(() => fromgoldAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(7000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 7000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    expect(() => fromgoldAccount.transfer(6000, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(7000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 4000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    expect(() => fromgoldAccount.transfer(4500, '12345', '0001')).toThrow("Você não possui saldo suficiente")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount('12346', '0001', 1000, 7000)
    togoldAccount.createAccount('12345', '0001', 6000, 7000)

    expect(() => fromgoldAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);

    fromgoldAccount.destroy();
    togoldAccount.destroy();
  })
});
