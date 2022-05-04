const CategoriesController = require('../controllers/categoriesController');

const passport = require('passport');

module.exports =(app) => {
    /**
     * Rutas GET
     */
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);


    /**
     * Rutas post
     */
    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
}