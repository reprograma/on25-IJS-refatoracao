import Account from '../Account/Account.js';
import Client from './Client.js';

describe("Teste da classe Client", () => {
  test("verificar se instancia do Client é feita corretamente", () => {
    const client = new Client();
    expect(client instanceof Client).toBe(true);
  });

  test("cadastrar cliente com dados válidos", () => {
    const client = new Client();
    const account = new Account();
    account.createAccount("25420", "2025", 5000);
    client.registerClient("Elvira", "20335370802", account, 5000);
    expect(client.getName()).toBe("Elvira");
    expect(client.getCPF()).toBe("20335370802");
    expect(client.getAccount()).toBe(account);
    expect(client.getIncome()).toBe(5000);
  });

  test("cadastrar cliente com dados inválidos", () => {
    const client = new Client();
    expect(() => client.registerClient("Elvira", "20335370802", "não conta", 5000)).toThrow("Erro no cadastro, dados inválidos");
  });
});
