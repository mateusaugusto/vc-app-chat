import * as express from 'express';
import * as http from 'http';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as socket from 'socket.io';
import * as mongoose from 'mongoose';
import * as redis from 'socket.io-redis';

import {RoomSocket, ControlSocket, UserSocket } from './socket';
import userRouter = require("./src/routes/user.route");
import roomRouter = require("./src/routes/room.route");
import messageRouter = require("./src/routes/message.route");
import unreadRouter = require("./src/routes/unread.route");
import * as fs from "fs";

var jwt = require('express-jwt');
var bodyParser = require('body-parser');

declare var process, __dirname;

//var publicKey = fs.readFileSync(process.env.PATH_PUBLIC_KEY);

export class Server {

    private app: express.Application;
    private server: any;
    private io: any;
    private mongo: mongoose.MongooseThenable;
    private port: number;

    constructor() {

        // Create expressjs application
        this.app = express();

        this.app.use(bodyParser.json()); // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

        this.app.enable('view cache');

        // Setup routes
        this.routes();

        // Create server
        this.server = http.createServer(this.app);

        // Create database connections
        this.databases();

        // Handle websockets
        this.sockets();
    }

    // Configure routes
    private routes(): void {

        // Setup router
        let router: express.Router;
        router = express.Router();

        // Root path
        const root = path.join(path.resolve(__dirname, '../../target'));

        // Static assets
        this.app.use('/assets', serveStatic(path.resolve(root, 'assets')));

        //Enable oauth 2 security
        //this.app.use(jwt({ secret: publicKey, credentialsRequired: true }));

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(root, '/index.html'));
        });

        this.app.use('/api', userRouter);
        this.app.use('/api', roomRouter);
        this.app.use('/api', messageRouter);
        this.app.use('/api', unreadRouter);

        // Set app to use router as the default route
        this.app.use('*', router);

    }

    // Configure databases
    private databases(): void {
        // MongoDB URL
        const MONGODB_URI = 'mongodb://localhost/chat';
        //const MONGODB_URI = process.env.MONGODB_URI;

        // Get MongoDB handle
        this.mongo = mongoose.connect(MONGODB_URI);
        (<any>mongoose).Promise = global.Promise;
    }

    // Configure sockets
    private sockets(): void {
        // Get socket.io handle
        this.io = socket(this.server);

        // Set Redis adapter
        const REDIS_URL =  'redis://localhost:6379';
        //const REDIS_URL = process.env.REDIS_URL;

        this.io.adapter(redis(REDIS_URL));

        // Set room socket
        let roomSocket = new RoomSocket(this.io);
        let userSocket = new UserSocket(this.io);
        let control = new ControlSocket(this.io);
    }

    public listen(): void {
        // Get port
        const port =  5000;
        //const port = process.env.VC_APP_CHAT_PORT;

        // Start listening
        this.server.listen(port);

        // add error handler
        this.server.on('error', error => {
            console.log('ERROR', error);
        });

        // start listening on port
        this.server.on('listening', () => {
            console.log(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        });
    }
}
