import Account from "./Account.js";

describe("Teste da classe Account", () => {
  let account;
  let fromAccount;
  let toAccount;

  beforeEach(() => {
    account = new Account(1, 1, 1000);
    fromAccount = new Account("12346", "0001", 1000);
    toAccount = new Account("12345", "0001", 500);
  });
  afterEach(() => {
    account.destroy();
    fromAccount.destroy();
    toAccount.destroy();
  });
  test("verificar se instancia de Account é feita corretamente", () => {
    expect(account instanceof Account).toBe(true);
  });
  test("deposito com valor de 100 reais", () => {
    account.deposit(100);
    expect(account.getBalance()).toBe(1100);
  });
  test("deposito com valor de -100", () => {
    expect(() => account.deposit(-100)).toThrow(
      "Não é possível depositar valores negativos"
    );
    expect(account.getBalance()).toBe(1000);
  });
  test("deposito com valor não númérico", () => {
    expect(() => account.deposit("")).toThrow(
      "Não é possível depositar valores não numéricos"
    );
    expect(account.getBalance()).toBe(1000);
  });
  test("instaciar conta com valores válidos", () => {
    expect(account.getBalance()).toBe(1000);
    expect(account.getAccountNumber()).toBe(1);
    expect(account.getAgency()).toBe(1);
  });
  test("criar conta de com dados válidos", () => {
    expect(account.createAccount("12345", "0001", 500)).toBe(
      "Conta criada com sucesso"
    );
    expect(account.getBalance()).toBe(500);
    expect(account.getAccountNumber()).toBe("12345");
    expect(account.getAgency()).toBe("0001");
  });
  test("criar conta com dados inválidos", () => {
    expect(() => account.createAccount("1234", "0001", 300)).toThrow(
      "Dados inválidos para cadastro"
    );
  });
  test("criar chave pix cpf com sucesso", () => {
    expect(account.createPixKey("37761514046", "CPF")).toBe(
      "Chave pix cpf criada com sucesso"
    );
    expect(account.pixKeys.cpf).toBe("37761514046");
  });
  test("criar chave pix email com sucesso", () => {
    expect(account.createPixKey("teste@reprograma.com.br", "EMAIL")).toBe(
      "Chave pix email criada com sucesso"
    );
    expect(account.pixKeys.email).toBe("teste@reprograma.com.br");
  });
  test("criar chave pix telefone com sucesso", () => {
    expect(account.createPixKey("11912345678", "TELEFONE")).toBe(
      "Chave pix telefone criada com sucesso"
    );
  });
  test("criar chave pix cpf inválido", () => {
    expect(() => account.createPixKey("3776", "CPF")).toThrow(
      "Erro, cpf inválido"
    );
  });
  test("sacar 100 reais da conta", () => {
    account.withdraw(100);
    expect(account.getBalance()).toBe(900);
  });
  test("sacar -100 reais da conta", () => {
    expect(() => account.withdraw(-100)).toThrow("Valor inválido de saque");
    expect(account.getBalance()).toBe(1000);
  });
  test("fazer pix com valor válido, saldo suficiente e chave válida", () => {
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(fromAccount.pix(10, "teste@reprograma.com.br", "email")).toBe(
      "Pix feito com sucesso"
    );
    expect(toAccount.getBalance()).toBe(510);
    expect(fromAccount.getBalance()).toBe(990);
  });
  test("fazer pix com valor válido, saldo suficiente e chave inválida", () => {
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() => fromAccount.pix(10, "teste@admin.com.br", "email")).toThrow(
      "Chave pix não encontrada"
    );
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
  });
  test("fazer pix com valor válido, saldo insuficiente e chave válida", () => {
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromAccount.pix(1300, "teste@reprograma.com.br", "email")
    ).toThrow("Você não possui saldo suficiente");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
  });
  test("fazer pix com valor inválido, saldo suficiente e chave válida", () => {
    toAccount.createPixKey("teste@reprograma.com.br", "EMAIL");
    expect(() =>
      fromAccount.pix(-10, "teste@reprograma.com.br", "email")
    ).toThrow("Valor inválido de pix");
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
  });
  test("fazer transferência com valor válido, saldo suficiente e dados válidos", () => {
    expect(fromAccount.transfer(10, "12345", "0001")).toBe(
      "Transferência feita com sucesso"
    );
    expect(fromAccount.getBalance()).toBe(990);
    expect(toAccount.getBalance()).toBe(510);
  });
  test("fazer transferência com valor válido, saldo suficiente e dados inválidos", () => {
    expect(() => fromAccount.transfer(100, "12347", "0001")).toThrow(
      "Conta não encontrada"
    );
    expect(toAccount.getBalance()).toBe(500);
    expect(fromAccount.getBalance()).toBe(1000);
  });
});
