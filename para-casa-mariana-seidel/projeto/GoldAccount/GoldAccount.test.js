import GoldAccount from "./GoldAccount.js";

describe("Teste da classe GoldAccount", () => {
  const goldAccount = new GoldAccount(),
    fromGoldAccount = new GoldAccount();

  beforeEach(() => {
    goldAccount.removeAccount();
    fromGoldAccount.removeAccount();
  })

  test("verificar se a instância de GoldAccount é feita corretamente", () => {
    expect(goldAccount instanceof GoldAccount).toBe(true);
  });

  test("depósito com valor de 100 reais", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    goldAccount.deposit(100);

    expect(goldAccount.getBalance()).toBe(1100);
  });

  test("depósito com valor de -100", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    const depositGoldAcc = () => goldAccount.deposit(-100);
    expect(depositGoldAcc).toThrow("Não é possível depositar valores negativos");
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("depósito com valor não númérico", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    const depositGoldAcc = () => goldAccount.deposit("");
    expect(depositGoldAcc).toThrow("Não é possível depositar valores não numéricos");
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("instaciar conta com valores válidos", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(goldAccount.getBalance()).toBe(1000);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda compatível", () => {
    const createdGoldAcc = goldAccount.createAccount("12345", "0001", 500, 6000);
    expect(createdGoldAcc).toBe("Conta criada com sucesso");
    expect(goldAccount.getBalance()).toBe(500);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    const createdGoldAcc = () => goldAccount.createAccount("12345", "0001", 500, 4000);
    expect(createdGoldAcc).toThrow("Renda incompatível com o tipo de conta");
  });


  test("criar conta com dados inválidos", () => {
    const createdGoldAcc = () => goldAccount.createAccount("1234", "0001", 6000, 7000);
    expect(createdGoldAcc).toThrow("Dados inválidos para cadastro");
  });

  test("criar chave pix cpf com sucesso", () => {
    const pixkey = goldAccount.createPixKey("37761514046", "CPF");
    expect(pixkey).toBe("Chave pix cpf criada com sucesso.");
    expect(goldAccount.pixKeys.cpf).toBe("37761514046");
  });

  test("criar chave pix email com sucesso", () => {
    const pixkey = goldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(pixkey).toBe("Chave pix email criada com sucesso.");
    expect(goldAccount.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  test("criar chave pix telefone com sucesso", () => {
    const pixkey = goldAccount.createPixKey("11912345678", "TELEFONE");
    expect(pixkey).toBe("Chave pix telefone criada com sucesso.");
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => goldAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
  });

  test("sacar 100 reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    goldAccount.withdraw(100);
    expect(goldAccount.getBalance()).toBe(5900);
  })

  test("sacar -100 reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    expect(() => goldAccount.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(goldAccount.getBalance()).toBe(6000);
  })

  test("sacar '-100' reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    expect(() => goldAccount.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(goldAccount.getBalance()).toBe(6000);
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 1000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    toGoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixGoldAcc = fromGoldAccount.pix(100, 'teste@reprograma.com.br', 'email');
    expect(pixGoldAcc).toBe("Pix feito com sucesso.");
    expect(toGoldAccount.getBalance()).toBe(6100);
    expect(fromGoldAccount.getBalance()).toBe(900);

    toGoldAccount.removeAccount();
  })

  test("fazer pix com valor e chave válidos, saldo suficiente, porém ultrapassando o limite", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 5500, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    toGoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixGoldAcc = () => fromGoldAccount.pix(5500, 'teste@reprograma.com.br', 'email');
    expect(pixGoldAcc).toThrow("O seu limite de transação é de 1000 reais");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(5500);

    toGoldAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 1000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    toGoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixGoldAcc = () => fromGoldAccount.pix(10, 'teste@admin.com.br', 'email');
    expect(pixGoldAcc).toThrow("Chave pix não encontrada");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(1000);

    toGoldAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 4000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    toGoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixGoldAcc = () => fromGoldAccount.pix(4100, 'teste@reprograma.com.br', 'email');
    expect(pixGoldAcc).toThrow("Você não possui saldo suficiente");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(4000);

    toGoldAccount.removeAccount();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 1000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    toGoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixGoldAcc = () => fromGoldAccount.pix(-10, 'teste@reprograma.com.br', 'email');
    expect(pixGoldAcc).toThrow("Valor inválido de pix");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(1000);

    toGoldAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 7000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(fromGoldAccount.transfer(100, '12345', '0001')).toBe("Transferência feita com sucesso.");
    expect(fromGoldAccount.getBalance()).toBe(6900);
    expect(toGoldAccount.getBalance()).toBe(6100);

    toGoldAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 7000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(() => fromGoldAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(7000);

    toGoldAccount.removeAccount();
  })

  test("fazer transferência com valor e dados válidos, saldo suficiente, porém ultrapassando o limite", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 7000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    const tranferGoldAcc = () => fromGoldAccount.transfer(6000, '12345', '0001');
    expect(tranferGoldAcc).toThrow("O seu limite de transação é de 1000 reais");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(7000);

    toGoldAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 4000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    const tranferGoldAcc = () => fromGoldAccount.transfer(4500, '12345', '0001');
    expect(tranferGoldAcc).toThrow("Você não possui saldo suficiente");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(4000);

    toGoldAccount.removeAccount();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const toGoldAccount = new GoldAccount();
    fromGoldAccount.createAccount('12346', '0001', 1000, 7000);
    toGoldAccount.createAccount('12345', '0001', 6000, 7000);

    const tranferGoldAcc = () => fromGoldAccount.transfer(-100, '12345', '0001');
    expect(tranferGoldAcc).toThrow("Valor inválido de transferência");
    expect(toGoldAccount.getBalance()).toBe(6000);
    expect(fromGoldAccount.getBalance()).toBe(1000);

    toGoldAccount.removeAccount();
  })
});
