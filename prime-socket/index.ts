import express, { type ErrorRequestHandler, type NextFunction } from 'express';
import http from 'http'
import { Server } from 'socket.io'
import type { ResultMessage, UserMessage } from './type';
import ConnectionTypes from './enum';
import sendNumbers from './logic/sendNumbers';
import { log } from 'console';
import errorHandler from './logic/errorHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", }
});
const port = process.env.PORT || 3000;

let ids: string[] = [];

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/client.html");
});

app.get("/ids", (_, res) => {
    res.json(ids)
})

app.get("/count", (_, res) => {
    res.json(count)
})

app.get("/primes", (_, res) => {
    res.json(primes)
})
let count = 0;
let primes: number[] = []

io.on(ConnectionTypes.CONNECTION, (socket) => {
    socket.emit(ConnectionTypes.NEW_MESSAGE, { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    socket.on(ConnectionTypes.FIRST_CONNECTION, (message: UserMessage) => {
        console.log(message);
        
        if (message.id)
            ids.push(message.id);
        sendNumbers(socket, count++, count++, count++, message.id)
    });

    socket.on(ConnectionTypes.DISCONNECT, () => {
        console.log('User disconnected');
    });
    socket.on(ConnectionTypes.RESULT, (message: ResultMessage) => {
        log("result")
        if(message.result.a[1])primes.push(message.result.a[0])
        if(message.result.b[1])primes.push(message.result.b[0])
        if(message.result.c[1])primes.push(message.result.c[0])
        console.log(message);
        sendNumbers(socket, count++, count++, count++, message.id)


    });
});


app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});