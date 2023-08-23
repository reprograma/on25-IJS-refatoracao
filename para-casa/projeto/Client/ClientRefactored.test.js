import AccountRefactored from '../Account/AccountRefactored';
import ClientRefactored from './ClientRefactored';

let account, client;

beforeEach(() => {
    account = new AccountRefactored();
    client = new ClientRefactored("Nome do Cliente", "12345678901", account, 5000);
});

describe("Teste da classe Client", () => {
  test("verificar se instancia do Client é feita corretamente", () => {
    expect(client instanceof ClientRefactored).toBe(true);
  });

  test("cadastrar cliente com dados válidos", () => {
    expect(client.getConfirmationMessage()).toBe("Cliente cadastrado");
  });

  test("cadastrar cliente com dados inválidos", () => {
    expect(() => {
        new ClientRefactored("Ana", "1234567908", "não conta", 5000);
    }).toThrowError("Erro no cadastro, dados inválidos");
  });
});
