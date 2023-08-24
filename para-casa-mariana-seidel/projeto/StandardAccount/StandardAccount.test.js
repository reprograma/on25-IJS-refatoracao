import StandardAccount from "./StandardAccount.js";

describe("Teste da classe StandardAccount", () => {
  const standardAccount = new StandardAccount(),
    fromStandardAccount = new StandardAccount();

  beforeEach(() => {
    standardAccount.removeAccount();
    fromStandardAccount.removeAccount();
  })

  test("verificar se a instância de StandardAccount é feita corretamente", () => {
    expect(standardAccount instanceof StandardAccount).toBe(true);
  });

  test("depósito com valor de 100 reais", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    standardAccount.deposit(100);

    expect(standardAccount.getBalance()).toBe(1100);
  });

  test("depósito com valor de -100", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    const depositStandardAcc = () => standardAccount.deposit(-100);
    expect(depositStandardAcc).toThrow("Não é possível depositar valores negativos");
    expect(standardAccount.getBalance()).toBe(1000);
  });

  test("depósito com valor não númérico", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    const depositStandardAcc = () => standardAccount.deposit("");
    expect(depositStandardAcc).toThrow("Não é possível depositar valores não numéricos");
    expect(standardAccount.getBalance()).toBe(1000);

  });

  test("instaciar conta com valores válidos", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    expect(standardAccount.getBalance()).toBe(1000);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda compatível", () => {
    const createStandardAcc = standardAccount.createAccount("12345", "0001", 500, 2000);
    expect(createStandardAcc).toBe("Conta criada com sucesso!");
    expect(standardAccount.getBalance()).toBe(500);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    const createStandardAcc = () => standardAccount.createAccount("12345", "0001", 500, 10000);
    expect(createStandardAcc).toThrow("Renda incompatível com o tipo de conta");
  });

  test("criar conta com dados inválidos", () => {
    const createStandardAcc = () => standardAccount.createAccount("1234", "0001", 300);
    expect(createStandardAcc).toThrow("Dados inválidos para cadastro");
  });

  test("criar chave pix cpf com sucesso", () => {
    const pixKey = standardAccount.createPixKey("37761514046", "CPF");
    expect(pixKey).toBe("Chave pix cpf criada com sucesso.");
    expect(standardAccount.pixKeys.cpf).toBe("37761514046");
  });

  test("criar chave pix email com sucesso", () => {
    const pixKey = standardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(pixKey).toBe("Chave pix email criada com sucesso.");
    expect(standardAccount.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  test("criar chave pix telefone com sucesso", () => {
    const pixKey = standardAccount.createPixKey("11912345678", "TELEFONE");
    expect(pixKey).toBe("Chave pix telefone criada com sucesso.");
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => standardAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
  });

  test("sacar 100 reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    standardAccount.withdraw(100);
    expect(standardAccount.getBalance()).toBe(400);
  })

  test("sacar -100 reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    expect(() => standardAccount.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(standardAccount.getBalance()).toBe(500);
  })

  test("sacar '-100' reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    expect(() => standardAccount.withdraw('-100')).toThrow("Valor inválido de saque");
    expect(standardAccount.getBalance()).toBe(500);
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);

    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixStandardAcc = fromStandardAccount.pix(10, 'teste@reprograma.com.br', 'email');
    expect(pixStandardAcc).toBe("Pix feito com sucesso.");
    expect(toStandardAccount.getBalance()).toBe(510);
    expect(fromStandardAccount.getBalance()).toBe(990);

    toStandardAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 2000);
    toStandardAccount.createAccount('12345', '0001', 500);

    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixStandardAcc = () => fromStandardAccount.pix(1200, 'teste@reprograma.com.br', 'email');
    expect(pixStandardAcc).toThrow("O seu limite de transação é de 1000 reais");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);

    toStandardAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);

    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixStandardAcc = () => fromStandardAccount.pix(10, 'teste@admin.com.br', 'email');
    expect(pixStandardAcc).toThrow("Chave pix não encontrada");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    toStandardAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 200);
    toStandardAccount.createAccount('12345', '0001', 500);

    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixStandardAcc = () => fromStandardAccount.pix(300, 'teste@reprograma.com.br', 'email');
    expect(pixStandardAcc).toThrow("Você não possui saldo suficiente");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);

    toStandardAccount.removeAccount();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);

    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixStandardAcc = () => fromStandardAccount.pix(-10, 'teste@reprograma.com.br', 'email');
    expect(pixStandardAcc).toThrow("Valor inválido de pix");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    toStandardAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 300);
    toStandardAccount.createAccount('12345', '0001', 500);

    const transferStandardAcc = fromStandardAccount.transfer(10, '12345', '0001');
    expect(transferStandardAcc).toBe("Transferência feita com sucesso.");
    expect(fromStandardAccount.getBalance()).toBe(290);
    expect(toStandardAccount.getBalance()).toBe(510);

    toStandardAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);

    const transferStandardAcc = () => fromStandardAccount.transfer(100, '12347', '0001');
    expect(transferStandardAcc).toThrow("Conta não encontrada");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    toStandardAccount.removeAccount();
  })

  test("fazer transferência com valor e dados válidos, saldo suficiente, porém ultrapassando o limite", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 2000);
    toStandardAccount.createAccount('12345', '0001', 500);

    const transferStandardAcc = () => fromStandardAccount.transfer(1200, '12345', '0001');
    expect(transferStandardAcc).toThrow("O seu limite de transação é de 1000 reais");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);

    toStandardAccount.removeAccount();
  })

  test("fazer transferência com valor e dados válidos e saldo insuficiente", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 200);
    toStandardAccount.createAccount('12345', '0001', 500);

    const transferStandardAcc = () => fromStandardAccount.transfer(300, '12345', '0001');
    expect(transferStandardAcc).toThrow("Você não possui saldo suficiente");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);

    toStandardAccount.removeAccount();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);

    const transferStandardAcc = () => fromStandardAccount.transfer(-100, '12345', '0001');
    expect(transferStandardAcc).toThrow("Valor inválido de transferência");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);

    toStandardAccount.removeAccount();
  })
});
