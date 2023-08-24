import GoldAccount from "./GoldAccount.js";
describe("Teste da classe GoldAccount", () => {
  let goldAccount;

  beforeEach(() => {
    goldAccount = new GoldAccount();
    goldAccount.createAccount("12345", "0001", 1000, 6000);
    goldAccount.createPixKey("37761514046", "CPF")
  });
  afterEach(() => {
    goldAccount.destroy();
  });
  test("verificar se instancia de GoldAccount é feita corretamente", () => {
    expect(goldAccount instanceof GoldAccount).toBe(true);
  });
  test("deposito com valor de 100 reais", () => {
    goldAccount.deposit(100);
    expect(goldAccount.getBalance()).toBe(1100);
  });
  test("deposito com valor de -100", () => {
    expect(() => goldAccount.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(goldAccount.getBalance()).toBe(1000);
  });
  test("deposito com valor não númérico", () => {
    expect(() => goldAccount.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(goldAccount.getBalance()).toBe(1000);
  });
  test("instaciar conta com valores válidos", () => {
    expect(goldAccount.getBalance()).toBe(1000);
    expect(goldAccount.getAccountNumber()).toBe("12345");
    expect(goldAccount.getAgency()).toBe("0001");
  });
  test("criar conta de com dados válidos e renda compatível", () => {
    expect(goldAccount.createAccount("12345", "0001", 500, 6000)).toBe(
      "Conta criada com sucesso"
    );
    expect(goldAccount.getBalance()).toBe(500);
    expect(goldAccount.getAccountNumber()).toBe("12345");
    expect(goldAccount.getAgency()).toBe("0001");
  });
  test("criar conta de com dados válidos e renda incompatível", () => {
    expect(() => goldAccount.createAccount("12345", "0001", 500, 4000)).toThrow(
      "Renda incompatível com o tipo de conta"
    );
  });
  test("criar conta com dados inválidos", () => {
    expect(() => goldAccount.createAccount("1234", "0001", 6000, 7000)).toThrow(
      "Dados inválidos para cadastro"
    );
  });
  test("criar chave pix cpf com sucesso", () => {
    expect(goldAccount.pixKeys.cpf).toBe("37761514046");
  });
  test("criar chave pix email com sucesso", () => {
    expect(goldAccount.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(goldAccount.pixKeys.email).toBe("teste@reprograma.com.br");
  });
  test("criar chave pix telefone com sucesso", () => {
    expect(goldAccount.createPixKey("11912345678", "TELEFONE")).toBe(
      "Chave pix telefone criada com sucesso"
    );
  });
  test("criar chave pix cpf inválido", () => {
    expect(() => goldAccount.createPixKey("3776", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
  });
  test("sacar 100 reais da conta", () => {
    goldAccount.withdraw(100);
    expect(goldAccount.getBalance()).toBe(900);
  });
  test("sacar -100 reais da conta", () => {
    expect(() => goldAccount.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(goldAccount.getBalance()).toBe(1000);
  });
  test("sacar '-100' reais da conta", () => {
    expect(() => goldAccount.withdraw("-100")).toThrow(
      "Valor inválido de saque"
    );
    expect(goldAccount.getBalance()).toBe(1000);
  });

  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 1000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(fromgoldAccount.pix(100, "teste@reprograma.com.br", "email")).toBe(
      "Pix feito com sucesso"
    );
    expect(togoldAccount.getBalance()).toBe(6100);
    expect(fromgoldAccount.getBalance()).toBe(900);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer pix com valor válido, saldo suficiente, chave válida porém ultrapassando o limite", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 5500, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromgoldAccount.pix(5500, "teste@reprograma.com.br", "email")
    ).toThrow("O seu limite de transação é de 1000 reais");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(5500);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 1000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromgoldAccount.pix(10, "teste@admin.com.br", "email")
    ).toThrow("Chave pix não encontrada");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 4000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromgoldAccount.pix(4100, "teste@reprograma.com.br", "email")
    ).toThrow("Você não possui saldo suficiente");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 1000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    //criar chave pix para a conta de destino
    togoldAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromgoldAccount.pix(-10, "teste@reprograma.com.br", "email")
    ).toThrow("Valor inválido de pix");
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 7000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    expect(fromgoldAccount.transfer(100, "12345", "0001")).toBe(
      "Transferência feita com sucesso"
    );
    expect(fromgoldAccount.getBalance()).toBe(6900);
    expect(togoldAccount.getBalance()).toBe(6100);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 7000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    expect(() => fromgoldAccount.transfer(100, "12347", "0001")).toThrow(
      "Conta não encontrada"
    );
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(7000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo suficiente, dados válidos porém ultrapassando o limite", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 7000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    expect(() => fromgoldAccount.transfer(6000, "12345", "0001")).toThrow(
      "O seu limite de transação é de 1000 reais"
    );
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(7000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer transferência com valor válido, saldo insuficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 4000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    expect(() => fromgoldAccount.transfer(4500, "12345", "0001")).toThrow(
      "Você não possui saldo suficiente"
    );
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(4000);

    // remover da lista de instâncias
    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });

  test("fazer transferência com valor inválido, saldo suficiente e dados válidos", () => {
    const fromgoldAccount = new GoldAccount();
    const togoldAccount = new GoldAccount();

    // criar as contas
    fromgoldAccount.createAccount("12346", "0001", 1000, 7000);
    togoldAccount.createAccount("12345", "0001", 6000, 7000);

    expect(() => fromgoldAccount.transfer(-100, "12345", "0001")).toThrow(
      "Valor inválido de transferência"
    );
    expect(togoldAccount.getBalance()).toBe(6000);
    expect(fromgoldAccount.getBalance()).toBe(1000);

    fromgoldAccount.destroy();
    togoldAccount.destroy();
  });
});