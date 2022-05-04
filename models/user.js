const db = require('../config/config');
//npm i crypto
const crypto = require('crypto');
const User ={};

User.getAll = () => {
    const sql = `
        select 
            * 
        from 
            users`;
    return db.manyOrNone(sql);
}
//login
User.findById = (id, callback) => {
    const sql = `
    select 
	    id,
	    email,
	    name,
	    lastname,
	    image,
	    phone,
	    password,
	    session_token
    from
	    users
    where
        id = $1;
    `;

    return db.oneOrNone(sql, id).then(user => { callback(null, user); });
}

User.findByEmail = (email)=> {
    const sql = `
    select 
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
        json_agg(
            json_build_object(
                'id', r.id, 
                'name', r.name, 
                'image', r.image, 
                'route', r.route 
            )
        ) AS roles
    from
        users AS u 
    inner join 
        user_has_roles AS uhr
    on 
        uhr.id_user = u.id
    inner join
        roles AS r
    on r.id = uhr.id_rol
    where
        u.email = $1
    group by 
        u.id`;
    return db.oneOrNone(sql, email);
}



User.create = (user) => {
    //contrseña encripatad
    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
        insert into
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
            values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id 
            `;
    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}
//funcion para actualizar 
User.update = (user) => {
    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        updated_at = $6
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
}

//funcion para actualizar el token de sesion 
User.updateToken = (id,token) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}


User.findByUserId = (id)=> {
    const sql = `
    select 
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
        json_agg(
            json_build_object(
                'id', r.id, 
                'name', r.name, 
                'image', r.image, 
                'route', r.route 
            )
        ) AS roles
    from
        users AS u 
    inner join 
        user_has_roles AS uhr
    on 
        uhr.id_user = u.id
    inner join
        roles AS r
    on r.id = uhr.id_rol
    where
        u.id = $1
    group by 
        u.id`;
    return db.oneOrNone(sql, id);
}



//funcion para compara el password encripatado
User.isPasswordMatch = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(myPasswordHashed === hash) {
        return true;
    }
    return false;
}


module.exports = User;


