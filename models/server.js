const express = require('express');
const fileUpload = require('express-fileupload');
const cors    = require('cors');

const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.allPath = '/api/';
        this.creaturesRoutePath = '/api/creatures';
        // this.usersRoutePath = '/api/users';
        this.uploadsRoutePath = '/api/uploads';
        this.typesRoutePath = '/api/types';
        this.weaknessRoutePath = '/api/weakness';

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
        this.app.use( this.allPath, require('../routes/all') );
        this.app.use( this.creaturesRoutePath, require('../routes/creatures') );
        // this.app.use( this.usersRoutePath, require('../routes/users') );
        this.app.use( this.uploadsRoutePath, require('../routes/uploads') );
        this.app.use( this.typesRoutePath, require('../routes/groups') );
        this.app.use( this.weaknessRoutePath, require('../routes/weakness') );
    };

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Witcher Bestiary app listening on port ${this.port}`);
        })
    }
};

module.exports = Server;
