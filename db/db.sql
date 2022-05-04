
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL primary key,
	name varchar(200) UNIQUE NOT NULL,
	image varchar(255) null,
	route varchar(255) null,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null

);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
values (
	'CLIENTE',
	'client/products/list',
	'2022-03-03',
	'2022-03-03'
);
INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
values (
	'RESTAURANTE',
	'restaurant/orders/list',
	'2022-03-03',
	'2022-03-03'
);
INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
values (
	'REPARTIDOR',
	'delivery/orders/list',
	'2022-03-03',
	'2022-03-03'
);


DROP TABLE IF EXISTS users CASCADE;
create table users(
	id BIGSERIAL PRIMARY KEY,
	email varchar(255) not null unique,
	name varchar(255) not null,
	lastname varchar(255) not null,
	phone varchar(80) not null unique,
	image varchar(255) null,
	password varchar(255) not null,
	is_avalible boolean null,
	session_token varchar(255) null,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user bigserial NOT NULL,
	id_rol  bigserial NOT NULL,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null,
	foreign key(id_user) references users(id) on update cascade on delete cascade,
	foreign key(id_rol) references roles(id) on update cascade on delete cascade,
	primary key(id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(255) NOT NULL,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null
);
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null,
	FOREIGN KEY (id_category) REFERENCES categories(id) on update cascade on delete cascade;
);