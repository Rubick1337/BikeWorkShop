module.exports = class UserDto {
    id;
    name;
    surname;
    email;
    adress;
    role;

    constructor(model) {
        this.name = model.name;
        this.id = model.id;
        this.surname = model.surname;
        this.email = model.email;
        this.adress = model.adress;
        this.role = model.role;
    }
}