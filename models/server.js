const express = require('express');
const cors    = require('cors');

const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.creaturesRoutePath = '/api/creatures';

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
        this.app.use(cors());
        // Body Parser
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.creaturesRoutePath, require('../routes/creatures') );
    };

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Witcher Bestiary app listening on port ${this.port}`);
        })
    }
};

module.exports = Server;
