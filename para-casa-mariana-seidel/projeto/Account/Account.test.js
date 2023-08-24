import Account from "./Account.js";

describe("Teste da classe Account", () => {

  const account = new Account(),
    fromAccount = new Account();

  beforeEach(() => {
    account.removeAccount();
    fromAccount.removeAccount();
  })

  test("verificar se instância de Account é feita corretamente", () => {
    expect(account instanceof Account).toBe(true);
  });

  test("depósito com valor de 100 reais", () => {
    const account = new Account(1, 1, 1000);
    account.deposit(100);
    expect(account.getBalance()).toBe(1100);
  });

  test("depósito com valor de -100", () => {
    const account = new Account(1, 1, 1000);
    const depositAccount = () => account.deposit(-100);
    expect(depositAccount).toThrow("Não é possível depositar valores negativos.");
    expect(account.getBalance()).toBe(1000);
  });

  test("depósito com valor não númérico", () => {
    const account = new Account(1, 1, 500);
    const depositAccount = () => account.deposit("");
    expect(depositAccount).toThrow("Não é possível depositar valores não numéricos.");
    expect(account.getBalance()).toBe(500);
  });

  test("instaciar conta com valores válidos", () => {
    const account = new Account('12345', '0001', 1000);
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
  });

  test("criar conta de com dados válidos", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso!");
  });

  test("criar conta com dados inválidos", () => {
    const resultAccount = () => account.createAccount("1234", "0001", 300);
    expect(resultAccount).toThrow("Dados inválidos para cadastro.");
  });

  test("criar chave pix cpf com sucesso", () => {
    const pixkey = account.createPixKey("37761514046", "CPF");
    expect(pixkey).toBe("Chave pix cpf criada com sucesso.");
    expect(account.pixKeys.cpf).toBe("37761514046");
  });

  test("criar chave pix email com sucesso", () => {
    const pixkey = account.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(pixkey).toBe("Chave pix email criada com sucesso.");
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  test("criar chave pix telefone com sucesso", () => {
    const pixkey = account.createPixKey("11912345678", "TELEFONE");
    expect(pixkey).toBe("Chave pix telefone criada com sucesso.");
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => account.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido.");
  });

  test("sacar 100 reais da conta", () => {
    account.createAccount('12346', '0001', 500);
    account.withdraw(100);
    expect(account.getBalance()).toBe(400);
  })

  test("sacar -100 reais da conta", () => {
    const account = new Account();
    account.createAccount('12346', '0001', 500);
    expect(() => account.withdraw(-100)).toThrow("Valor inválido de saque.");
    expect(account.getBalance()).toBe(500);
  })

  test("sacar '-100' reais da conta", () => {
    const account = new Account();
    account.createAccount('12346', '0001', 500);
    expect(() => account.withdraw('-100')).toThrow("Valor inválido de saque.");
    expect(account.getBalance()).toBe(500);
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 1000);
    toAccount.createAccount('12345', '0001', 500);

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const fromAccountPix = fromAccount.pix(10, 'teste@reprograma.com.br', 'email');
    expect(fromAccountPix).toBe("Pix feito com sucesso.");
    expect(toAccount.getBalance()).toBe(510);
    expect(fromAccount.getBalance()).toBe(990);

    toAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 1000);
    toAccount.createAccount('12345', '0001', 500);

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const fromAccountPix = () => fromAccount.pix(10, 'teste@admin.com.br', 'email');
    expect(fromAccountPix).toThrow("Chave pix não encontrada");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    toAccount.removeAccount();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 200);
    toAccount.createAccount('12345', '0001', 500);

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const fromAccountPix = () => fromAccount.pix(300, 'teste@reprograma.com.br', 'email');
    expect(fromAccountPix).toThrow("Você não possui saldo suficiente");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    toAccount.removeAccount();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 1000);
    toAccount.createAccount('12345', '0001', 500);

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    const fromAccountPix = () => fromAccount.pix(-10, 'teste@reprograma.com.br', 'email');
    expect(fromAccountPix).toThrow("Valor inválido de pix");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    toAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 300);
    toAccount.createAccount('12345', '0001', 500);

    expect(fromAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso.");
    expect(fromAccount.getBalance()).toBe(290);
    expect(toAccount.getBalance()).toBe(510);

    toAccount.removeAccount();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 1000);
    toAccount.createAccount('12345', '0001', 500);

    const tranferAccount = () => fromAccount.transfer(100, '12347', '0001');
    expect(tranferAccount).toThrow("Conta não encontrada");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    toAccount.removeAccount();
  })

  test("fazer transferência com valor e dados válidos e saldo insuficiente", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 200);
    toAccount.createAccount('12345', '0001', 500);

    const tranferAccount = () => fromAccount.transfer(300, '12345', '0001');
    expect(tranferAccount).toThrow("Você não possui saldo suficiente");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    toAccount.removeAccount();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const toAccount = new Account();
    fromAccount.createAccount('12346', '0001', 1000);
    toAccount.createAccount('12345', '0001', 500);
    const transfer = () => fromAccount.transfer(-100, '12345', '0001');

    expect(transfer).toThrow("Valor inválido de transferência");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    toAccount.removeAccount();
  })
});
