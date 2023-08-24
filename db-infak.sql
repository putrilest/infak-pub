CREATE DATABASE infakPUB;
USE infakPUB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  passwordd VARCHAR(255) NOT NULL
);

CREATE TABLE alumnis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gambar VARCHAR(255),
  nama VARCHAR(255),
  angkatan INT,
  prodi VARCHAR(255),
  noHp VARCHAR(20),
  alamat TEXT,
  totalInfak INT,
  keterangan TEXT
);

CREATE TABLE infaks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tanggal DATE,
  idAlumni INT,
  idRekening INT,
  jumlahInfak INT
);

CREATE TABLE rekenings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255),
  saldo INT
);

ALTER TABLE infaks ADD CONSTRAINT fk_infaks_alumni FOREIGN KEY (idAlumni) REFERENCES alumnis(id);
ALTER TABLE infaks ADD CONSTRAINT fk_infaks_rekening FOREIGN KEY (idRekening) REFERENCES rekenings(id);


DROP DATABASE infakPUB;

