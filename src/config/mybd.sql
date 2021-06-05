CREATE DATABASE sistema_tickets;

USE sistema_tickets;

CREATE TABLE categorias(id int not null auto_increment, nombre varchar(50) not null,
primary key(id));

CREATE TABLE personal(id int not null auto_increment, nombre varchar(50) not null,
apellidos varchar(80) not null, telefono varchar(10) null, direccion varchar(150) null,
primary key(id));

CREATE TABLE tickets(id int not null auto_increment, nombre varchar(50) not null,
descripcion varchar(100) null, prioridad varchar(1) not null, reportero int not null, 
categoria int not null, estatus varchar(3) not null,
primary key(id), foreign key(reportero) references personal(id),
foreign key(categoria) references categorias(id));