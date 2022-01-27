const express = require('express');
const cors    = require('cors');

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.creaturesRoutePath = '/api/creatures';

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();
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
