import { Member, Profile, Server } from "@prisma/client/edge";
import { NextApiResponse } from "next";
import {Server as NetServer, Socket} from "net"
import {Server as SocketIOServer} from "socket.io"

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io : SocketIOServer
        }
    }
}

export type ServerWithMemebersWithProfile = Server & {
    members: (Member & {
        profile: Profile
    })[];
}