import Account from "../Account/Account.js";
import Client from "./Client.js";

describe("Teste da classe Client", () => {
  let client;
  let account;
  beforeEach(() => {
    client = new Client();
    account = new Account();
  });
  test("verificar se instancia do Client é feita corretamente", () => {
    expect(client instanceof Client).toBe(true);
  });
  test("cadastrar cliente com dados válidos", () => {
    expect(client.registerClient("Ana", "1234567908", account, 5000)).toBe(
      "Cliente cadastrado"
    );
  });
  test("cadastrar cliente com dados inválidos", () => {
    expect(() =>
      client.registerClient("Ana", "1234567908", "não conta", 5000)
    ).toThrow("Erro no cadastro, dados inválidos");
  });
});
