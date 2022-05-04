const Category = require('../models/category');

module.exports = {

    async getAll(req, res, next) {
        try{
            const data = await Category.getAll();
            console.log(`Categorias ${JSON.stringify(data)}`);
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }
    },

 

    async create(req, res, next) {
        try{
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            //crear los datos en la base de datos 
            const data = await Category.create(category);

            return res.status(201).json({ 
                message: 'Categoría creada exitosamente',
                success: true,
                data: data.id
            });

        }catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la categoría',
                success: false,
                error: error
            });
        }
    }
}