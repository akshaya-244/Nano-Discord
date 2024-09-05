import {Server as NetServer} from "http"
import {Server as ServerIO} from "socket.io"
import {NextApiRequest} from "next"
import {NextApiResponseServerIo} from "../../../types"

// : This disables the built-in body parsing in Next.js, which is required because the socket.io
//  communication doesn’t involve standard HTTP requests with body data but rather WebSocket connections
export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if(! res.socket.server.io){

        // path: "/api/socket/io": Defines the endpoint where the WebSocket connection should happen.
// addTrailingSlash: false: Ensures that the trailing slash is not added to the path.
        const path= "/api/socket/io"
        const httpServer: NetServer = res.socket.server as any;

        // ServerIO is the WebSocket server, and it is linked to the existing HTTP server (res.socket.server) to handle WebSocket traffic.
// res.end(): Ends the response since this route is not sending back data in the traditional HTTP way (like JSON or HTML), but rather initializing a WebSocket server.
        const io=new ServerIO(httpServer,{
            path: path,
            addTrailingSlash: false
        });
        res.socket.server.io=io;
    }
    res.end()
}

export default ioHandler