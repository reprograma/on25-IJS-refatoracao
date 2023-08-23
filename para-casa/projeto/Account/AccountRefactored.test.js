import AccountRefactored from "./AccountRefactored";

let account, fromAccount, toAccount;

beforeEach(() => {
  account = new AccountRefactored();
  fromAccount = new AccountRefactored();
  toAccount = new AccountRefactored();
});

describe("Teste da classe AccountRefactored", () => {
  test("verificar se instancia de AccountRefactored é feita corretamente", () => {
    expect(account instanceof AccountRefactored).toBe(true);
    account.destroy();
  });

  test("deposito com valor de 100 reais", () => {
    const account = new AccountRefactored(1, 1, 1000);
    account.deposit(100);
    expect(account.getBalance()).toBe(1100);
    
    account.destroy();
  });

  test("deposito com valor de -100", () => {
    const account = new AccountRefactored(1, 1, 1000);
    expect(() => account.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(account.getBalance()).toBe(1000);
    
    account.destroy();
  });

  test("deposito com valor não numérico", () => {
    const account = new AccountRefactored(1, 1, 500);
    expect(() => account.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(account.getBalance()).toBe(500);
    
    account.destroy();
  });

  test("instaciar conta com valores válidos", () => {
    const account = new AccountRefactored('12345', '0001', 1000);
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
    
    account.destroy();
  });

  test("criar conta de com dados válidos", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe("Conta criada com sucesso");
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe('12345');
    expect(account.getAgency()).toBe('0001');
    
    account.destroy();
  });

  test("criar conta com dados inválidos", () => {
    expect(() => account.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    account.destroy();
  });

  test("criar chave pix cpf com sucesso", () => {
    expect(account.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(account.pixKeys.cpf).toBe("37761514046");
    
    account.destroy();
  });

  test("criar chave pix email com sucesso", () => {
    expect(account.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");

    account.destroy();
  });

  test("criar chave pix telefone com sucesso", () => {
    expect(account.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    account.destroy();
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => account.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    account.destroy();
  });

  test("sacar 100 reais da conta", () => {
    account.createAccount('12346', '0001', 500);
    account.withdraw(100)
    expect(account.getBalance()).toBe(400);
    
    account.destroy();
  })

  test("sacar -100 reais da conta", () => {
    account.createAccount('12346', '0001', 500);
    expect(() => account.withdraw(-100)).toThrow("Valor inválido de saque")
    expect(account.getBalance()).toBe(500);
    
    account.destroy();
  })

  test("sacar '-100' reais da conta", () => {
    account.createAccount('12346', '0001', 500);
    expect(() => account.withdraw('-100')).toThrow("Valor inválido de saque")
    expect(account.getBalance()).toBe(500);

    account.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(fromAccount.pix(10, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso")
    expect(toAccount.getBalance()).toBe(510);
    expect(fromAccount.getBalance()).toBe(990);
    
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    fromAccount.createAccount('12346', '0001', 200)
    toAccount.createAccount('12345', '0001', 500)

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(300, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL")
    expect(() => fromAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
    
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    fromAccount.createAccount('12346', '0001', 300)
    toAccount.createAccount('12345', '0001', 500)

    expect(fromAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso")
    expect(fromAccount.getBalance()).toBe(290);
    expect(toAccount.getBalance()).toBe(510);
    
    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    fromAccount.createAccount('12346', '0001', 200)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(300, '12345', '0001')).toThrow("Você não possui saldo suficiente")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(200);

    fromAccount.destroy();
    toAccount.destroy();
  })

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    fromAccount.createAccount('12346', '0001', 1000)
    toAccount.createAccount('12345', '0001', 500)

    expect(() => fromAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência")
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);

    fromAccount.destroy();
    toAccount.destroy();
  })
});
