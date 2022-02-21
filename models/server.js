const express = require('express');
const fileUpload = require('express-fileupload');
const cors    = require('cors');

const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.creaturesRoutePath = '/api/creatures';
        this.usersRoutePath = '/api/users';
        this.uploadsRoutePath = '/api/uploads';

        // Database connection
        this.connectingDB();

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();
    }

    async connectingDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );
        // Body Parser
        this.app.use( express.json() );
        // File uploader
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use( this.creaturesRoutePath, require('../routes/creatures') );
        this.app.use( this.usersRoutePath, require('../routes/users') );
        this.app.use( this.uploadsRoutePath, require('../routes/uploads') );
    };

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Witcher Bestiary app listening on port ${this.port}`);
        })
    }
};

module.exports = Server;
