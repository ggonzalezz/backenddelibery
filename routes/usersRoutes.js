const UserController = require('../controllers/usersController');
//passport para generar el token para
const passport = require('passport');

module.exports = (app, upload) => {
    //traer datos
    app.get('/api/users/getAll', UserController.getAll);
    app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UserController.findById);


    //crear usuario sin imagen
    //app.post('/api/users/create', upload.array('image', 1), UserController.register); 
    //crear usuario con imagen
    app.post('/api/users/create', upload.array('image', 1), UserController.registerWithImage); 

    //login users
     app.post('/api/users/login', UserController.login); 
    //desloguearse
    app.post('/api/users/logout', UserController.logout); 

     //actualizar datos 
     app.put('/api/users/update', passport.authenticate('jwt', {session:false}), upload.array('image', 1), UserController.update); 

}
