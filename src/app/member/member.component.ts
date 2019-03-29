import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MembersService } from "../shared/member/members.service";
import { IMember } from "../shared/member/member";

@Component({
    moduleId: module.id,
    templateUrl: "./member.component.html",
    styleUrls: ["./member-common.scss"]
})

export class MemberComponent implements OnInit {

    memberId: string = "";
    member: IMember;

    constructor(
        private route: ActivatedRoute,
        private membersService: MembersService
    ) {}

    ngOnInit() {
        // Retrieve member id from route
        this.route.queryParams.subscribe((params) => {
            this.memberId = params.memberId;
        });

        this.member = this.membersService.getMemberById(this.memberId);
    }
}
