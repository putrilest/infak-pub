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

INSERT INTO users (username,passwordd) VALUES
 ('putri','12345');

INSERT INTO rekenings (nama, nomorRek, saldo)VALUES
 ('BCA','5140249744',0),
 ('MANDIRI','132-00-1075813-5',0);

INSERT INTO alumnis (gambar, nama, angkatan, prodi, noHp, alamat, totalInfak, keterangan) VALUES
 ('gambar1.jpg', 'Amelia Siregar', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar2.jpg', 'Peni Julianti', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar3.jpg', 'Dimas Firmansyah', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar4.jpg', 'Kharisma Amalia', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar5.jpg', 'Putri Lestari', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar6.jpg', 'Wahyu', 20, 'S1 Akuntansi', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar7.jpg', 'Suci Amanah', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar8.jpg', 'Maulina Inas Nasya', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar9.jpg', 'Melani Putri', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar10.jpg', 'Tri Wulandari', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar11.jpg', 'Naily Rina Pribawa', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar12.jpg', 'Putri Mulyani', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar10.jpg', 'Bunga Sari Hutasuhut', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar11.jpg', 'Aliya Rohaya Siregar', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja'),
 ('gambar12.jpg', 'Maypa Dea Fazrin', 20, 'D3 MI', '081234567890', 'Jl. Dakota No 8A, Sukaraja, Cicendo, Kota Bandung', 0,'Belum Bekerja');
 
 INSERT INTO infaks (tanggal, idAlumni, idRekening, jumlahInfak) VALUES
  ('2023-02-01',1,1,100000),
  ('2023-02-02',1,2,100000),
  ('2023-02-03',1,2,100000);

 
DROP DATABASE infakPUB;

