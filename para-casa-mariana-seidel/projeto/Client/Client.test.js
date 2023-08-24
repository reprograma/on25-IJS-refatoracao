import Account from '../Account/Account.js';
import Client from './Client.js';

describe("Teste da classe Client", () => {
  const client = new Client(),
    account = new Account();

  test("verificar se a instância do Client é feita corretamente", () => {
    expect(client instanceof Client).toBe(true);
  });

  test("cadastrar cliente com dados válidos", () => {
    const clientRegister = client.registerClient("Ana", "1234567908", account, 5000);
    expect(clientRegister).toBe("Cliente cadastrado");
  });

  test("cadastrar cliente com dados inválidos", () => {
    const clientRegister = () => client.registerClient("Ana", "1234567908", "não conta", 5000);
    expect(clientRegister).toThrow("Erro no cadastro, dados inválidos");
  });
});
