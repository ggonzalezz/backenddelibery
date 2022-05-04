const db = require('../config/config');

const Rol = {};

//rol por defecto
Rol.create =(id_user, id_rol) => {
    const sql = `
        INSERT INTO 
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                updated_at
            )
        VALUES($1, $2, $3, $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}

module.exports = Rol;