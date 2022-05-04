const express = require('express');
//npm i express
const app = express();
//npm i http
const http = require('http');
const server = http.createServer(app);
//npm i morgan
const logger = require('morgan');
//npm i cors
const cors = require('cors');
//trabajar archivos
const multer = require('multer');
//admin de firebase
const admin = require('firebase-admin');

// archivo descargado de firebase de  cuentas de servicio para node
const serviceAccount = require('./serviceAccountKey.json');

//trabajar con tokens
const passport = require('passport');

/**
 * Iniciarlizar firebase 
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/**
 * Rutas intancias
 * 
 * */
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

//iniciarlizard passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/**
 * llamando a las rutas
 * */
users(app, upload);
categories(app);
products(app, upload);

server.listen(3000, '192.168.0.103' || 'localhost', function() {
    console.log('Aplicacion de NODEJS ' + port + ' Iniciada');
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});
app.get('/test', (req, res) => {
    res.send('Ruta raiz test');
});


//manejo de errores de
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}