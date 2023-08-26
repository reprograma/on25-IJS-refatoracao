
export class Client {
    name;
    #cpf;
    #email;
    #phone;

    constructor(name, cpf, email, phone) {
        this.name = name;
        this.#cpf = cpf;
        this.#email = email;
        this.#phone = phone;
    };

    get cpf() {
        return this.#cpf;
    };

    get email() {
        return this.#email;
    };

    set email(newEmail) {
        this.#email = newEmail;
    };
 
    get phone() {
        return this.#phone;
    };

    set phone(newPhone) {
        this.#phone = newPhone;
    };
};
