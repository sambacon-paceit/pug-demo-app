import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { IMember } from "./member";
import { NgControlStatus } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class MembersService {
    private membersStore = Kinvey.DataStore.collection<any>("members");
    private allMembers = [];

    getMemberById(id: string): IMember {
        if (!id) {
            return;
        }

        return this.allMembers.filter((member) => {
            return member._id === id;
        })[0];
    }

    load(): Promise<any> {
        return Promise.resolve().then(() => {
            return this.membersStore.sync();
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("first_name");
            const stream = this.membersStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((members: Array<IMember>) => {
            members.forEach((member) => {
                // Attempt to get profile image
                const query = new Kinvey.Query();
                query.equalTo("member_id", member._id);
                Kinvey.Files.find(query).then((files: any) => {
                    if (files) {
                        member.image = files[0]._downloadURL;
                    }
                });

                this.allMembers.push(member);
            });

            return this.allMembers;
        });
    }
}
