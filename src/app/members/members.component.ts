import { Component, OnInit } from "@angular/core";
import { MembersService } from "./members.service";
import { Member } from "./member";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./members.component.html",
    styleUrls: ["./members-common.scss"]
})

export class MembersComponent implements OnInit {
    _isLoading: boolean = false;
    private _members: ObservableArray<any> = new ObservableArray<any>([]);

    constructor(
        private membersService: MembersService
    ) {}

    ngOnInit() {
        this._isLoading = true;

        this.membersService.load()
        .then((members: Array<Member>) => {
            this._members = new ObservableArray(members);
            this._isLoading = false;
        });
    }

    get members(): ObservableArray<Member> {
        return this._members;
    }

    onMemberTap() {
        console.log("Tapped member");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
