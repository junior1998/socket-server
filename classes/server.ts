import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';


export default class Server {
    public static _intance: Server;

    public app: express.Application;
    public port:Number;

    public io: socketIO.Server;
    private httpServer: http.Server;

   private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private escucharSockets() {
    
        console.log(`Escuchando conexiones - sockets`);
        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente(cliente);

            // Escuchar usuario
            socket.usuario(cliente, this.io);

            //Mensajes
            socket.mensaje(cliente, this.io);
           //Desconectar
           socket.desconectar(cliente, this.io);
           // lista de usuarios
           socket.usuarios(cliente, this.io);
        })
    }

    start(calllback: Function){
        this.httpServer.listen(this.port, calllback); 
    }
}