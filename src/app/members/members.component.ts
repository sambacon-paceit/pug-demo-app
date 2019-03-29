import { Component, OnInit } from "@angular/core";
import { MembersService } from "../shared/member/members.service";
import { IMember } from "../shared/member/member";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
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
        private routerExtensions: RouterExtensions,
        private membersService: MembersService
    ) {}

    ngOnInit() {
        this._isLoading = true;

        this.membersService.load()
        .then((members: Array<IMember>) => {
            this._members = new ObservableArray(members);
            this._isLoading = false;
        });
    }

    get members(): ObservableArray<IMember> {
        return this._members;
    }

    onMemberTap(args: ListViewEventData): void {
        const id = args.view.bindingContext._id;
        this.routerExtensions.navigate(["member"], {
            queryParams: {
                memberId: id
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
