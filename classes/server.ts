import express from 'express';
import { SERVER_PORT } from '../global/environment';


export default class Server {
    public app: express.Application;
    public port:Number;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(calllback: Function){
        this.app.listen(this.port, calllback); 
    }
}