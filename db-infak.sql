CREATE DATABASE infakPUB;
USE infakPUB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  passwordd VARCHAR(255) NOT NULL,
  is_admin BOOLEAN
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
  nomorRek VARCHAR(255),
  saldo INT
);


ALTER TABLE infaks ADD CONSTRAINT fk_infaks_alumni FOREIGN KEY (idAlumni) REFERENCES alumnis(id);
ALTER TABLE infaks ADD CONSTRAINT fk_infaks_rekening FOREIGN KEY (idRekening) REFERENCES rekenings(id);


INSERT INTO rekenings (nama, nomorRek, saldo)VALUES
 ('BCA','5140249744',0),
 ('MANDIRI','132-00-1075813-5',0);

INSERT INTO alumnis (gambar, nama, angkatan, prodi, noHp, alamat, totalInfak, keterangan) VALUES
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Amelia Siregar', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Peni Julianti', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/736x/34/f1/28/34f1283cbef767dbf64d67910d9f5750.jpg', 'Dimas Firmansyah', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Kharisma Amalia', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Putri Lestari', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/736x/34/f1/28/34f1283cbef767dbf64d67910d9f5750.jpg', 'Wahyu', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Suci Amanah', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Maulina Inas Nasya', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Melani Putri', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Tri Wulandari', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Naily Rina Pribawa', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Putri Mulyani', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Bunga Sari Hutasuhut', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Aliya Rohaya Siregar', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('https://i.pinimg.com/originals/24/8e/74/248e74a52c9f66645f121c5c3ac5498c.jpg', 'Maypa Dea Fazrin', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja');
 

 
DROP DATABASE infakPUB;

