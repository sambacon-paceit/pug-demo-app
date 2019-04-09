import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "../shared/user/user.model";

@Component({
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.scss"]
})

export class LoginComponent implements OnInit {
    user: User;
    isAuthenticating: boolean = false;

    @ViewChild("password") password: ElementRef;
    
    constructor(
        private page: Page,
        private nav: RouterExtensions
    ) {
        this.user = new User();
    }

    ngOnInit() {
        // Hide action bar
        this.page.actionBarHidden = true;

        // Retrieve kinvey active user
        const activeUser = Kinvey.User.getActiveUser();
        if (activeUser) {
            // Navigate back to members
            this.nav.navigate(["members"],
            {
                clearHistory: true,
                animated: false
            });
        }
    }

    login() {
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

        // Call kinvey login with email and password
        Kinvey.User.login(this.user.email, this.user.password)
        .then((user: Kinvey.User) => {
            // Redirect to members screen if successful
            this.nav.navigate(["members"]);
        })
        .catch((error: Kinvey.BaseError) => {
            this.isAuthenticating = false;
            dialogs.alert({
                title: "Invalid Credentials",
                message: error.message,
                okButtonText: "ok"
            });
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    private isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        
        return true;
    }
}
