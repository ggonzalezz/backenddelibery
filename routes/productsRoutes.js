const ProductsController = require('../controllers/productsController');

const passport = require('passport');

module.exports =(app, upload) => {
  /**
   * Rutas get
   *
   * @var {[type]}
   */
  app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session:false}), ProductsController.findByCategory); 
      
  
  /**
     * Rutas post
     */
     app.post('/api/products/create', passport.authenticate('jwt', {session:false}), upload.array('image', 3), ProductsController.create); 

   }