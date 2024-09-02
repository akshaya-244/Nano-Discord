import { Member, Profile, Server } from "@prisma/client/edge";

export type ServerWithMemebersWithProfile = Server & {
    members: (Member & {
        profile: Profile
    })[];
}