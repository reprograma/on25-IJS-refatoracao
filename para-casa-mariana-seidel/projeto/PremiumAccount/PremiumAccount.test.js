import PremiumAccount from "./PremiumAccount.js";

describe("Teste da classe premiumAccount", () => {
  const premiumAccount = new PremiumAccount(),
    fromPremiumAccount = new PremiumAccount();

  beforeEach(() => {
    premiumAccount.removeAccount();
    fromPremiumAccount.removeAccount();
  })

  test("verificar se a instância de premiumAccount é feita corretamente", () => {
    expect(premiumAccount instanceof PremiumAccount).toBe(true);
  });

  test("depósito com valor de 100 reais", () => {
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    premiumAccount.deposit(100);
    expect(premiumAccount.getBalance()).toBe(10100);
  });

  test("depósito com valor de -100", () => {
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    const depositPremiumAcc = () => premiumAccount.deposit(-100);
    expect(depositPremiumAcc).toThrow("Não é possível depositar valores negativos");
    expect(premiumAccount.getBalance()).toBe(10000);
  });

  test("depósito com valor não númérico", () => {
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    const depositPremiumAcc = () => premiumAccount.deposit("");
    expect(depositPremiumAcc).toThrow("Não é possível depositar valores não numéricos");
    expect(premiumAccount.getBalance()).toBe(10000);
  });

  test("instaciar conta com valores válidos", () => {
    premiumAccount.createAccount('12345', '0001', 10000, 20000);
    expect(premiumAccount.getBalance()).toBe(10000);
    expect(premiumAccount.getAccountNumber()).toBe('12345');
    expect(premiumAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda compatível", () => {
    const createPremiumAcc = premiumAccount.createAccount("12345", "0001", 500, 20000);
    expect(createPremiumAcc).toBe("Conta criada com sucesso");
    expect(premiumAccount.getBalance()).toBe(500);
    expect(premiumAccount.getAccountNumber()).toBe('12345');
    expect(premiumAccount.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    const createPremiumAcc = () => premiumAccount.createAccount("12345", "0001", 500, 4000);
    expect(createPremiumAcc).toThrow("Renda incompatível com o tipo de conta");
  });

  test("criar conta com dados inválidos", () => {
    const createPremiumAcc = () => premiumAccount.createAccount("1234", "0001", 20000, 20000);
    expect(createPremiumAcc).toThrow("Dados inválidos para cadastro");
  });

  test("criar chave pix cpf com sucesso", () => {
    const pixKey = premiumAccount.createPixKey("37761514046", "CPF");
    expect(pixKey).toBe("Chave pix cpf criada com sucesso.");
    expect(premiumAccount.pixKeys.cpf).toBe("37761514046");
  });

  test("criar chave pix email com sucesso", () => {
    const pixKey = premiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(pixKey).toBe("Chave pix email criada com sucesso.");
    expect(premiumAccount.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  test("criar chave pix telefone com sucesso", () => {
    const pixKey = premiumAccount.createPixKey("11912345678", "TELEFONE");
    expect(pixKey).toBe("Chave pix telefone criada com sucesso.");
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => premiumAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
  });

  test("sacar 100 reais da conta", () => {
    premiumAccount.createAccount('12346', '0001', 20000, 20000);
    premiumAccount.withdraw(100);
    expect(premiumAccount.getBalance()).toBe(19900);
  })

  test("sacar -100 reais da conta", () => {
    premiumAccount.createAccount('12346', '0001', 20000, 20000);
    expect(() => premiumAccount.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(premiumAccount.getBalance()).toBe(20000);
  })

  test("sacar '-100' reais da conta", () => {
    premiumAccount.createAccount('12346', '0001', 20000, 20000);
    expect(() => premiumAccount.withdraw('-100')).toThrow("Valor inválido de saque");
    expect(premiumAccount.getBalance()).toBe(20000);
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 10000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    toPremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixPremiumAcc = fromPremiumAccount.pix(100, 'teste@reprograma.com.br', 'email');
    expect(pixPremiumAcc).toBe("Pix feito com sucesso.");
    expect(toPremiumAccount.getBalance()).toBe(20100);
    expect(fromPremiumAccount.getBalance()).toBe(9900);

    toPremiumAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 10000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    toPremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixPremiumAcc = () => fromPremiumAccount.pix(10, 'teste@admin.com.br', 'email');
    expect(pixPremiumAcc).toThrow("Chave pix não encontrada");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(10000);

    toPremiumAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 4000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    toPremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixPremiumAcc = () => fromPremiumAccount.pix(4100, 'teste@reprograma.com.br', 'email');
    expect(pixPremiumAcc).toThrow("Você não possui saldo suficiente");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(4000);

    toPremiumAccount.removeAccount();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 10000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    toPremiumAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const pixPremiumAcc = () => fromPremiumAccount.pix(-10, 'teste@reprograma.com.br', 'email');
    expect(pixPremiumAcc).toThrow("Valor inválido de pix");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(10000);

    toPremiumAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 7000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    const transferPremiumAcc = fromPremiumAccount.transfer(1000, '12345', '0001');
    expect(transferPremiumAcc).toBe("Transferência feita com sucesso.");
    expect(fromPremiumAccount.getBalance()).toBe(6000);
    expect(toPremiumAccount.getBalance()).toBe(21000);

    toPremiumAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 7000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    const transferPremiumAcc = () => fromPremiumAccount.transfer(100, '12347', '0001');
    expect(transferPremiumAcc).toThrow("Conta não encontrada");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(7000);

    toPremiumAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 4000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    const transferPremiumAcc = () => fromPremiumAccount.transfer(4500, '12345', '0001');
    expect(transferPremiumAcc).toThrow("Você não possui saldo suficiente");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(4000);

    toPremiumAccount.removeAccount();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const toPremiumAccount = new PremiumAccount();
    fromPremiumAccount.createAccount('12346', '0001', 10000, 20000);
    toPremiumAccount.createAccount('12345', '0001', 20000, 20000);

    const transferPremiumAcc = () => fromPremiumAccount.transfer(-100, '12345', '0001');
    expect(transferPremiumAcc).toThrow("Valor inválido de transferência");
    expect(toPremiumAccount.getBalance()).toBe(20000);
    expect(fromPremiumAccount.getBalance()).toBe(10000);

    toPremiumAccount.removeAccount();
  })
});
