import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { User } from "../shared/user/user.model";
@Component({
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.css"]
})

export class LoginComponent {
    public user: User;
    public isAuthenticating: boolean = false;
    
    constructor(
        private nav: RouterExtensions
    ) {
        this.user = new User();
    }

    public login() {
        if (this.isEmpty(this.user)) {
            return alert("Please enter your email address and password.");
        }

        if (this.user.isValidEmail() === false) {
            return alert("Please enter a valid email address.");
        }

        if (this.user.isValidPassword() === false) {
            return alert("Please enter a valid password.");
        }

        this.isAuthenticating = true;
        Kinvey.User.login(this.user.email, this.user.password)
        .then((user: Kinvey.User) => {
            this.nav.navigate(['']);
        })
        .catch((error: Kinvey.BaseError) => {
            this.isAuthenticating = false;
            alert(error);
        });
    }

    private isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
