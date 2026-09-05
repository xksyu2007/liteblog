import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["https://xksyu.cn", 'https://www.xksyu.cn'],
        methods: ["GET", "POST"]
    }
});

const admiaoNsp = io.of('/admiao')
admiaoNsp.on('connection', (socket) => {

});

server.listen(3000)