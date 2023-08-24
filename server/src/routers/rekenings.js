import express from "express";
import conn from "../db.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
      const prepare = await conn.prepare(
        "INSERT INTO rekenings (nama, saldo) VALUES (?,?)"
      );
      await prepare.execute([
        req.body.nama,
        req.body.saldo
      ]);

      res.send("Success Create Data");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });



//GET ALL
router.get("/", async (_req, res) => {
  const rekenings = await conn.query("SELECT * FROM rekenings");
  res.json(rekenings);
});

//GET BY ID
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM rekenings WHERE id = ?");
  const rekening = (await prepare.execute([req.params.id]))[0];
  res.json(rekening);
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare(
      "UPDATE rekenings SET nama = ? WHERE id = ?"
    );
    await prepare.execute([
      req.body.nama,
      req.params.id,
    ]);
    res.send("Success Update Data");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// //DELETE BY ID
router.delete("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare("DELETE FROM rekenings WHERE id = ?");
    await prepare.execute([req.params.id]);
    res.send("Success Delete Data");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

export default router;