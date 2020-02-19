let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');

    //Connection with mongo database
    mongoose.Promise = global.Promise;
    mongoose.connect(dbConfig.db, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Database successfully connected')
    },
    error => {
        console.log('Database could not be connected: ' + error)
    }
    )

    // Setting up port with express
    const userRoute = require('../backend/routes/user.route')
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'dist/angular-mean')));
    app.use('/', express.static(path.join(__dirname, 'dist/angular-mean')));
    app.use('/api', userRoute)

    //Port creation
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
        console.log('Connected to port ' + port);
    })

    //Find 404 and hand it to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    //Error handler
    app.use(function (err, req, res, next) {
        console.error(err.message);
        if (!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    })

    //