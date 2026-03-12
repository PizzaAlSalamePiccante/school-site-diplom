export default class UserDto {
    login;
    id;
    firstName;
    lastName;
    middleName;

    constructor (model) {
        this.login = model.login;
        this.id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.middleName = model.middleName;
    }
}