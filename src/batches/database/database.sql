/* AUTHENTICATION */

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    token_recuperacion VARCHAR(255) DEFAULT NULL UNIQUE,
    momento_recuperacion DATETIME DEFAULT NULL
);
CREATE TABLE usuarios_no_registrados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    token_confirmacion VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE sesiones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    momento_creacion DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

