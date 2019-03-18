import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

@Injectable({
    providedIn: "root"
})
export class MembersService {
    private membersStore = Kinvey.DataStore.collection<any>("members");
    private allMembers = [];

    load(): Promise<any> {
        return Promise.resolve().then(() => {
            return this.membersStore.sync();
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("first_name");
            const stream = this.membersStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((members: Array<any>) => {
            members.forEach((member) => {
                this.allMembers.push(member);
            });

            return this.allMembers;
        });
    }
}
