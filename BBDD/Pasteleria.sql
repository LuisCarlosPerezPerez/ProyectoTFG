Drop Database if exists PASTELERIA;
Create Database PASTELERIA;
Use PASTELERIA;

Create Table CLIENTE (
    ID_CLIENTE INT NOT NULL AUTO_INCREMENT COMMENT 'Identificar del Cliente',
    USUARIO VARCHAR(20) NOT NULL COMMENT 'Nombre del usuario del Cliente',
    CONTRASEÑA VARCHAR(20) NOT NULL COMMENT 'Contraseña del usuario del Cliente',
    CONSTRAINT PK_ID_CLIENTE PRIMARY KEY (ID_CLIENTE)
);
