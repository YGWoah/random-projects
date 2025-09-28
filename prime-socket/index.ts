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
// map socket.id -> userId (client-generated id)
const socketToUser: Record<string, string> = {}

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/client.html");
});

app.get("/ids", (_, res) => {
    res.json(ids)
})

app.get("/count", (_, res) => {
    res.json(count)
})


app.get("/lastPrimes", (_, res) => {
    const lastPrimes = primes.slice(-10);
    res.json(lastPrimes);
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

        if (message.id) {
            // record mapping and dedupe ids array
            socketToUser[socket.id] = message.id
            if (!ids.includes(message.id)) ids.push(message.id)
            // join a room named after the user id so we can target them
            socket.join(message.id)
        }
        sendNumbers(socket, count++, count++, count++, message.id)
    });

    socket.on(ConnectionTypes.DISCONNECT, () => {
        console.log('User disconnected');
        const userId = socketToUser[socket.id]
        if (userId) {
            // remove from ids list
            ids = ids.filter(id => id !== userId)
            delete socketToUser[socket.id]
        }
    });
    socket.on(ConnectionTypes.RESULT, (message: ResultMessage) => {
        // only push unique primes to avoid duplicates
        if (message.result.a[1] && !primes.includes(message.result.a[0])) primes.push(message.result.a[0])
        if (message.result.b[1] && !primes.includes(message.result.b[0])) primes.push(message.result.b[0])
        if (message.result.c[1] && !primes.includes(message.result.c[0])) primes.push(message.result.c[0])
        sendNumbers(socket, count++, count++, count++, message.id)


    });
});

// basic stats endpoint
app.get('/stats', (_, res) => {
    res.json({
        totalClients: ids.length,
        totalPrimes: primes.length,
        lastPrimes: primes.slice(-10)
    })
})

// helper to send a message to a specific user (by client-generated id)
const sendToUser = (userId: string, event: string, payload: any) => {
    // emit to the room with the user's id
    io.to(userId).emit(event, payload)
}

// test endpoint: send a message to a single connected client by their id
app.post('/message/:userId', (req, res) => {
    const { userId } = req.params
    if (!ids.includes(userId)) return res.status(404).json({ error: 'user not connected' })
    sendToUser(userId, ConnectionTypes.NEW_MESSAGE, { from: 'Server', text: `Hello ${userId}`, createdAt: Date.now() })
    res.json({ ok: true })
})


app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});