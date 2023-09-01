import GoldAccount from "./GoldAccount.js";

describe("Teste da classe GoldAccount", () => {
  let goldAccount;

  beforeEach(() => {
    goldAccount = new GoldAccount();
  });

  afterEach(() => {
    goldAccount.destroy();
  });

  test("verificar se instancia de GoldAccount é feita corretamente", () => {
    expect(goldAccount instanceof GoldAccount).toBe(true);
  });

  test("deposito com valor de 100 reais", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    goldAccount.deposit(100);

    expect(goldAccount.getBalance()).toBe(1100);
  });

  test("deposito com valor de -100", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(() => goldAccount.deposit(-100))..toBeLessThanOrEqual(0);
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("deposito com valor não númérico", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(() => goldAccount.deposit("")).toThrowError("Não é possível depositar valores não numéricos");
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("instaciar conta com valores válidos", () => {
    goldAccount.createAccount('12345', '0001', 1000, 6000);
    expect(goldAccount.getBalance()).toBe(1000);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
  });

  test("criar conta com dados válidos e renda compatível", () => {
    expect(goldAccount.createAccount("12345", "0001", 500, 6000)).toBe("Conta criada com sucesso");
    expect(goldAccount.getBalance()).toBe(500);
    expect(goldAccount.getAccountNumber()).toBe('12345');
    expect(goldAccount.getAgency()).toBe('0001');
  });

  test("criar conta com dados válidos e renda incompatível", () => {
    expect(() => goldAccount.createAccount("12345", "0001", 500, 4000)).toThrow("Renda incompatível com o tipo de conta");
  });

  test("criar conta com dados inválidos", () => {
    expect(() => goldAccount.createAccount("1234", "0001", 6000, 7000)).toThrow("Dados inválidos para cadastro");
  });

  test("criar chave pix cpf com sucesso", () => {
    expect(goldAccount.createPixKey("37761514046", "CPF")).toBe("Chave pix cpf criada com sucesso");
    expect(goldAccount.pixKeys.cpf).toBe("37761514046");
  });

  test("criar chave pix email com sucesso", () => {
    expect(goldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe("Chave pix email criada com sucesso");
    expect(goldAccount.pixKeys.email).toBe("teste@reprograma.com.br");
  });

  test("criar chave pix telefone com sucesso", () => {
    expect(goldAccount.createPixKey("11912345678", "TELEFONE")).toBe("Chave pix telefone criada com sucesso");
  });

  test("criar chave pix cpf inválido", () => {
    expect(() => goldAccount.createPixKey("3776", "CPF")).toThrow("Erro, cpf inválido");
  });

  test("sacar 100 reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    goldAccount.withdraw(100);
    expect(goldAccount.getBalance()).toBe(5900);
  });

  test("sacar -100 reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    expect(() => goldAccount.withdraw(-100)).toBeLessThanOrEqual(0);
    expect(goldAccount.getBalance()).toBe(6000);
  });

  test("sacar '-100' reais da conta", () => {
    goldAccount.createAccount('12346', '0001', 6000, 7000);
    expect(() => goldAccount.withdraw('-100')).toBeLessThanOrEqual(0);
    expect(goldAccount.getBalance()).toBe(6000);
  });

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");

    goldAccount.createAccount('12346', '0001', 1000, 7000);
    expect(goldAccount.pix(100, 'teste@reprograma.com.br', 'email')).toBe("Pix feito com sucesso");
    expect(togoldAccount.getBalance()).toBe(6100);
    expect(goldAccount.getBalance()).toBe(900);
  });

  test("fazer pix com valor válido, saldo suficiente, chave válida, ultrapassando o limite", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");

    goldAccount.createAccount('12346', '0001', 5500, 7000);
    expect(() => goldAccount.pix(5500, 'teste@reprograma.com.br', 'email')).toThrow("O seu limite de transação é de 1000 reais");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(5500);
  });

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");

    goldAccount.createAccount('12346', '0001', 1000, 7000);
    expect(() => goldAccount.pix(10, 'teste@admin.com.br', 'email')).toThrow("Chave pix não encontrada");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");

    goldAccount.createAccount('12346', '0001', 4000, 7000);
    expect(() => goldAccount.pix(4100, 'teste@reprograma.com.br', 'email')).toThrow("Você não possui saldo suficiente");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(4000);
  });

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");

    goldAccount.createAccount('12346', '0001', 1000, 7000);
    expect(() => goldAccount.pix(-10, 'teste@reprograma.com.br', 'email')).toThrow("Valor inválido de pix");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);

    goldAccount.createAccount('12346', '0001', 7000, 7000);
    expect(goldAccount.transfer(100, '12345', '0001')).toBe("Transferência feita com sucesso");
    expect(goldAccount.getBalance()).toBe(6900);
    expect(togoldAccount.getBalance()).toBe(6100);
  });

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(() => goldAccount.transfer(100, '12347', '0001')).toThrow("Conta não encontrada");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(7000);
  });

  test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(() => goldAccount.transfer(6000, '12345', '0001')).toThrow("O seu limite de transação é de 1000 reais");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(7000);
  });

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(() => goldAccount.transfer(4500, '12345', '0001')).toThrow("Você não possui saldo suficiente");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(6000);
  });

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const togoldAccount = new GoldAccount();
    togoldAccount.createAccount('12345', '0001', 6000, 7000);

    expect(() => goldAccount.transfer(-100, '12345', '0001')).toThrow("Valor inválido de transferência");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(goldAccount.getBalance()).toBe(6000);
  });
});
