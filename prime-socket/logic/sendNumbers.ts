import type { DefaultEventsMap, Socket } from "socket.io";
import ConnectionTypes from "../enum";

const sendNumbers = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,a:number,b:number,c:number,userId:string) => {
    socket.emit(ConnectionTypes.SEND_NUMBERS,{
        id:userId,
        numbers : {a,b,c}
    })
}

export default sendNumbers