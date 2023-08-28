import express from "express";
import conn from "../db.js";
// import multer from "multer";
// import path from "path"

const router = express.Router();


// CREATE
router.post("/", async (req, res) => {
    try {
      const prepare = await conn.prepare(
        "INSERT INTO alumnis (gambar, nama, angkatan, prodi, noHp, alamat, totalInfak, keterangan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      await prepare.execute([
        req.body.gambar,
        req.body.nama,
        req.body.angkatan,
        req.body.prodi,
        req.body.noHp,
        req.body.alamat,
        req.body.totalInfak,
        req.body.keterangan
      ]);
      res.send("Succes Create Data");
    } catch (error) {
      console.error("Error:", error);
      res.status(500);
      res.send(error);
    }
  });



//GET ALL
router.get("/", async (_req, res) => {
  const alumnis = await conn.query("SELECT * FROM alumnis");
  res.json(alumnis);
});

//GET BY ID
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM alumnis WHERE id = ?");
  const alumni = (await prepare.execute([req.params.id]))[0];
  res.json(alumni);
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare(
      "UPDATE alumnis SET gambar = ?, nama = ?, angkatan = ?, prodi = ?, noHp = ?, alamat = ?, keterangan= ? WHERE id = ?"
    );
    await prepare.execute([
      req.body.gambar,
      req.body.nama,
      req.body.angkatan,
      req.body.prodi,
      req.body.noHp,
      req.body.alamat,
      req.body.keterangan,
      req.params.id,
    ]);
    res.send("Success Update Data");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

//DELETE BY ID
router.delete("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare("DELETE FROM alumnis WHERE id = ?");
    await prepare.execute([req.params.id]);
    res.send("Success Delete Data");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

export default router;