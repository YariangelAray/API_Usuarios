use api_bd;

drop table if exists lenguajes_usuarios;
drop table if exists usuarios;
drop table if exists lenguajes;
drop table if exists generos;
drop table if exists ciudades;

create table ciudades(
id int auto_increment primary key,
nombre varchar(30));

create table generos(
id int auto_increment primary key,
nombre varchar(20));

create table lenguajes(
id int auto_increment primary key,
nombre varchar(30));

create table usuarios(
id int auto_increment primary key,
nombre varchar(50),
apellido varchar(50),
telefono bigint,
id_ciudad int,
id_genero int,
documento bigint,
usuario varchar(50),
contrasena varchar(50),
foreign key (id_ciudad) references ciudades(id),
foreign key (id_genero) references generos(id));

create table lenguajes_usuarios(
id int auto_increment primary key,
id_usuario int,
id_lenguaje int,
foreign key (id_usuario) references usuarios(id),
foreign key (id_lenguaje) references lenguajes(id));

insert into ciudades(nombre) values ("Bucaramanga"), ("Girón"), ("Floridablanca");

insert into generos(nombre) values ("Femenino"), ("Masculino");

insert into lenguajes(nombre) values("HTML"), ("JavaScript"), ("CSS"), ("Java"), ("PHP"), ("SQL"), ("C#");

select * from usuarios;