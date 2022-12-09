CREATE DATABASE Ceres;
USE Ceres;

CREATE TABLE Tipo(
idTipo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);

CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
estado CHAR(2),
cidade VARCHAR(65),
CEP CHAR(8),
complemento VARCHAR(45)
);

CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
CNPJ CHAR(14),
ddd CHAR(2),
telefone VARCHAR(9),
email VARCHAR(60), 
username VARCHAR(45),
senha VARCHAR(30),
fkEndereco INT,
FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
fkTipo INT,
FOREIGN KEY (fkTipo) REFERENCES Tipo(idTipo),
CONSTRAINT chkemail CHECK (email LIKE '%@%')
);

delimiter $$
CREATE PROCEDURE SP_cadastro_endereco(
IN estado CHAR(2),
IN cidade VARCHAR(45),
IN CEP CHAR(8),
IN complemento VARCHAR(45)
)
BEGIN
	INSERT INTO Endereco (estado, cidade, CEP, complemento) VALUES (estado, cidade, CEP, complemento);
    SELECT idEndereco FROM endereco ORDER BY idEndereco DESC LIMIT 1;
END $$
delimiter ;

CREATE TABLE Armazem(
idArmazem INT PRIMARY KEY AUTO_INCREMENT,
tamanho INT,
sacas INT,
fkUsuario INT,
FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
fkEndereco INT,
FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE Semente(
idSemente INT PRIMARY KEY AUTO_INCREMENT,
especie VARCHAR(45),
nome VARCHAR(45)
);

CREATE TABLE SementeArmazenada(
fkArmazen INT,
FOREIGN KEY (fkArmazen) REFERENCES Armazem(idArmazem),
fkSemente INT,
FOREIGN KEY (fkSemente) REFERENCES Semente(idSemente),
dtArmazenamento DATETIME
);

CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);

CREATE TABLE Metrica(
idMetrica INT AUTO_INCREMENT,
horario DATETIME,
temperatura DOUBLE,
umidade DOUBLE,
fkSensor INT,
PRIMARY KEY (idMetrica, fkSensor),
FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
fkArmazem INT,
FOREIGN KEY (fkArmazem) REFERENCES Armazem (idArmazem)
);

-- INSERTS
INSERT INTO Tipo VALUES
(NULL, 'Produtor Autônomo'),
(NULL, 'Empresa');

-- SELECTS
SELECT * FROM usuario;
SELECT * FROM endereco;
SELECT * FROM Metrica;
SELECT * FROM Armazem;
    
    

