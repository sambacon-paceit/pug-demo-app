const validator = require("email-validator");

export class User {
  email: string;
  password: string;

  isValidEmail() {
    return validator.validate(this.email);
  }

  isValidPassword() {
    return (this.password === undefined) || (this.password === "")  ? false : true;
  }
}