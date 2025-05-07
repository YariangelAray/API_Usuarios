use api_bd;

drop table if exists ciudades;
create table ciudades(
id int auto_increment primary key,
ciudad varchar(30));

drop table if exists generos;
create table generos(
id int auto_increment primary key,
genero varchar(20));

drop table if exists lenguajes;
create table lenguajes(
id int auto_increment primary key,
lenguaje varchar(30));

drop table if exists usuarios;
create table usuarios(
id int auto_increment primary key,
nombre varchar(50),
apellido varchar(50),
telefono bigint,
id_ciudad int,
id_genero int,
no_documento bigint,
usuario varchar(50),
contrasena varchar(50),
foreign key (id_ciudad) references ciudades(id),
foreign key (id_genero) references generos(id));

drop table if exists lenguajes_usuarios;
create table lenguajes_usuarios(
id_usuario int,
id_lenguaje int,
foreign key (id_usuario) references usuarios(id),
foreign key (id_lenguaje) references lenguajes(id));

insert into ciudades(ciudad) values ("Bucaramanga"), ("Girón"), ("Floridablanca");

insert into generos(genero) values ("Femenino"), ("Masculino");

insert into lenguajes(lenguaje) values("HTML"), ("JavaScript"), ("CSS"), ("Java"), ("PHP"), ("SQL"), ("C#");