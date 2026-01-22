Drop Database if exists PASTELERIA;
Create Database PASTELERIA;
Use PASTELERIA;

Create Table CLIENTE (
    ID_CLIENTE INT NOT NULL AUTO_INCREMENT COMMENT 'Identificar del Cliente',
    USUARIO VARCHAR(20) NOT NULL COMMENT 'Nombre del usuario del Cliente',
    CONTRASEÑA VARCHAR(20) NOT NULL COMMENT 'Contraseña del usuario del Cliente',
    CONSTRAINT PK_ID_CLIENTE PRIMARY KEY (ID_CLIENTE)
);

CREATE TABLE INGREDIENTE(
    ID_INGREDIENTE INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Ingrediente',
    NOMBRE VARCHAR(20) NOT NULL COMMENT 'Nombre del Ingrediente',
    STOCK INT NOT NULL COMMENT 'Stock del Ingrediente',
    PROVEEDOR VARCHAR(20) NOT NULL COMMENT 'Proveedor del Cliente'
);