# Creación del usuario
create user 'Yari04'@'localhost' identified by '0421';

# Creación de la base de datos
create database api_bd;

grant all on api_bd.* to Yari04@localhost;

flush privileges;