import StandardAccount from "./StandardAccount.js";

const standardAccount = new StandardAccount();

describe("Teste da classe StandardAccount", () => {
  test("verificar se instancia de StandardAccount é feita corretamente", () => {    
    expect(standardAccount instanceof StandardAccount).toBe(true);
    standardAccount.destroy();
  });

  test("deposito com valor de 100 reais", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    standardAccount.deposit(100);
    expect(standardAccount.getBalance()).toBe(1100);
    standardAccount.destroy();
  });
  
  test("deposito com valor de -100", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    expect(() => standardAccount.deposit(-100)).toThrow("Não é possível depositar valores negativos");
    expect(standardAccount.getBalance()).toBe(1000);
    standardAccount.destroy();
  });
  
  test("deposito com valor não númérico", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    expect(() => standardAccount.deposit("")).toThrow("Não é possível depositar valores não numéricos");
    expect(standardAccount.getBalance()).toBe(1000);
    standardAccount.destroy();
  });

  test("instaciar conta com valores válidos", () => {
    standardAccount.createAccount('12345', '0001', 1000);
    expect(standardAccount.getBalance()).toBe(1000);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
    standardAccount.destroy();
  });

  test("criar conta de com dados válidos e renda compatível", () => {
    // numero conta (5 digitos) agencia (4 digitos) e saldo (numero positivo)
    expect(standardAccount.createAccount("12345", "0001", 500, 2000)).toBe("Conta criada com sucesso");
    expect(standardAccount.getBalance()).toBe(500);
    expect(standardAccount.getAccountNumber()).toBe('12345');
    expect(standardAccount.getAgency()).toBe('0001');
    standardAccount.destroy();
  });

  test("criar conta de com dados válidos e renda incompatível", () => {
    expect(() => standardAccount.createAccount("12345", "0001", 500, 10000)).toThrow("Renda incompatível com o tipo de conta");
    standardAccount.destroy();
  });

  test("criar conta com dados inválidos", () => {
    expect(() => standardAccount.createAccount("1234", "0001", 300)).toThrow("Dados inválidos para cadastro");
    standardAccount.destroy();
  });

  test("criar chave pix cpf com sucesso", () => {
    expect(standardAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(standardAccount.pixKeys.cpf).toBe("37761514046");
    standardAccount.destroy();
  });

  test("criar chave pix email com sucesso", () => {
    expect(standardAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(standardAccount.pixKeys.email).toBe("teste@reprograma.com.br");
    standardAccount.destroy();
  });

  test("criar chave pix telefone com sucesso", () => {
    expect(standardAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
    standardAccount.destroy();
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => standardAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
    standardAccount.destroy();
  });

  test("sacar 100 reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    standardAccount.withdraw(100);
    expect(standardAccount.getBalance()).toBe(400);
    standardAccount.destroy();
  });

  test("sacar -100 reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    expect(() => standardAccount.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(standardAccount.getBalance()).toBe(500);
    standardAccount.destroy();
  });

  test("sacar '-100' reais da conta", () => {
    standardAccount.createAccount('12346', '0001', 500);
    expect(() => standardAccount.withdraw('-100')).toThrow("Valor inválido de saque");
    expect(standardAccount.getBalance()).toBe(500);
    standardAccount.destroy();
  });

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(fromStandardAccount.pix(10, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso");
    expect(toStandardAccount.getBalance()).toBe(510);
    expect(fromStandardAccount.getBalance()).toBe(990);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 2000);
    toStandardAccount.createAccount('12345', '0001', 500);
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() => fromStandardAccount.pix(1200, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() => fromStandardAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 200);
    toStandardAccount.createAccount('12345', '0001', 500);
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() => fromStandardAccount.pix(300, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);
    toStandardAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() => fromStandardAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 300);
    toStandardAccount.createAccount('12345', '0001', 500);
    expect(fromStandardAccount.transfer(10, '12345', '0001')).toBe("Transferência feita com sucesso");
    expect(fromStandardAccount.getBalance()).toBe(290);
    expect(toStandardAccount.getBalance()).toBe(510);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);
    expect(() => fromStandardAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 2000);
    toStandardAccount.createAccount('12345', '0001', 500);
    expect(() => fromStandardAccount.transfer(1200, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(2000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 200);
    toStandardAccount.createAccount('12345', '0001', 500);
    expect(() => fromStandardAccount.transfer(300, '12345', '0001')).toThrow("Você não possui saldo suficiente");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(200);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const fromStandardAccount = new StandardAccount();
    const toStandardAccount = new StandardAccount();
    fromStandardAccount.createAccount('12346', '0001', 1000);
    toStandardAccount.createAccount('12345', '0001', 500);
    expect(() => fromStandardAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência");
    expect(toStandardAccount.getBalance()).toBe(500);
    expect(fromStandardAccount.getBalance()).toBe(1000);
    fromStandardAccount.destroy();
    toStandardAccount.destroy();
  });
});
