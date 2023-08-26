import Account from "./Account.js";


import Account from "./Account";


describe("Classe Account", () => {
  let conta;

  beforeEach(() => {
    conta = new Account("12345", "0001", 1000);
  });

  afterEach(() => {
    conta.destroy();
  });

  it("deve criar uma instância de Account", () => {
    expect(conta instanceof Account).toBe(true);
  });

  it("deve obter o saldo", () => {
    expect(conta.getBalance()).toBe(1000);
  });

  it("deve obter a agência", () => {
    expect(conta.getAgency()).toBe("0001");
  });

  it("deve obter o número da conta", () => {
    expect(conta.getAccountNumber()).toBe("12345");
  });

  it("deve definir o número da conta", () => {
    conta.setAccountNumber("54321");
    expect(conta.getAccountNumber()).toBe("54321");
  });

  it("deve definir a agência", () => {
    conta.setAgency("9999");
    expect(conta.getAgency()).toBe("9999");
  });

  it("deve depositar na conta", () => {
    conta.deposit(200);
    expect(conta.getBalance()).toBe(1200);
  });

  it("não deve depositar valor não numérico", () => {
    expect(() => conta.deposit("abc")).toThrow("Cannot deposit non-numeric values");
  });

  it("não deve depositar valor negativo", () => {
    expect(() => conta.deposit(-100)).toThrow("Cannot deposit negative or zero values");
  });

  it("deve criar uma chave pix válida", () => {
    const resultado = conta.createPixKey("12345678901", "cpf");
    expect(resultado).toBe("Pix key cpf created successfully");
    expect(conta.pixKeys.cpf).toBe("12345678901");
  });

  it("não deve criar uma chave pix inválida", () => {
    expect(() => conta.createPixKey("email_invalido", "email")).toThrow("Invalid email for pix key");
  });

  it("deve sacar da conta", () => {
    conta.deposit(500);
    conta.withdraw(200);
    expect(conta.getBalance()).toBe(300);
  });

  it("não deve sacar valor não numérico", () => {
    expect(() => conta.withdraw("abc")).toThrow("Invalid withdrawal value");
  });

  it("não deve sacar valor negativo", () => {
    expect(() => conta.withdraw(-100)).toThrow("Invalid withdrawal value");
  });

});