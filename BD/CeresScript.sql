CREATE DATABASE dbCeres;
USE dbCeres;

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
fkArmazem INT,
FOREIGN KEY (fkArmazem) REFERENCES Armazem (idArmazem),
fkSemente INT,
FOREIGN KEY (fkSemente) REFERENCES Semente (idSemente),
sacas INT,
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

INSERT INTO Armazem VALUES
(NULL, 45, NULL, NULL);

INSERT INTO Sensor VALUES
(1, "DHT11");

INSERT INTO Metrica VALUES
(NULL, "2022-11-01 12:00:00", 20, 19, 1, 1),
(NULL, "2022-10-01 13:00:00", 27, 21, 1, 1),
(NULL, "2022-09-01 14:00:00", 17, 20, 1, 1),
(NULL, "2022-08-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-07-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-06-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-05-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-04-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-03-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-02-01 15:00:00", 12, 18, 1, 1),
(NULL, "2022-01-01 16:00:00", 19, 21, 1, 1);

INSERT INTO Semente VALUES
(null, "Coffea", "Café"),
(null, "Araucaria angustifolia", "Araucária"),
(null, "Theobroma cacao", "Cacau");

INSERT INTO SementeArmazenada VALUES
(1, 1, 100, "2022-07-19"),
(1, 2, 300, "2022-07-19"),
(1, 3, 650, "2022-07-19");

-- SELECTS
SELECT * FROM usuario;
SELECT * FROM endereco;
SELECT * FROM Metrica;
SELECT * FROM Armazem;

SELECT (SELECT MAX(Temperatura) FROM metrica) AS TempMax, (SELECT MAX(Umidade) FROM metrica) AS UmiMax,
temperatura, umidade, horario, DATE_FORMAT(Horario,'%H:%i:%s') AS horario_grafico 
FROM metrica WHERE fkArmazem = 1
ORDER bY idMetrica DESC lIMIT 7;

SELECT nome, SUM(sacas) Sacas FROM Armazem
JOIN SementeArmazenada ON  fkArmazem = idArmazem
JOIN Semente ON fkSemente = idSemente
WHERE fkArmazem = 1
GROUP BY nome;

    
    

