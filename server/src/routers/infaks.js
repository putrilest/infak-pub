import express from "express";
import conn from "../db.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
      const tanggal = new Date(req.body.tanggal);
      const formattedTanggal = tanggal.toISOString().split('T')[0];
      const prepare = await conn.prepare(
        "INSERT INTO infaks (tanggal, idAlumni, idRekening, jumlahInfak) VALUES (?, ?, ?, ?)"
      );
      await prepare.execute([
        formattedTanggal,
        req.body.idAlumni,
        req.body.idRekening,
        req.body.jumlahInfak,
      ]);

      // Update totalInfak di tabel alumni
      const updateAlumni = await conn.prepare(
        "UPDATE alumnis SET totalInfak = totalInfak + 1 WHERE id = ?"
      );
      await updateAlumni.execute([
        req.body.idAlumni,
      ]);

      //Update saldo di tabel rekening
      const updateRekening = await conn.prepare(
        "UPDATE rekenings SET saldo = saldo + ? WHERE id = ?"
      );
      await updateRekening.execute([
        req.body.jumlahInfak,
        req.body.idRekening,
      ]);

      res.send("Succes Create Data");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });



//GET ALL
router.get("/", async (_req, res) => {
  const infaks = await conn.query("SELECT * FROM infaks");
  res.json(infaks);
});

//GET BY ID
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM infaks WHERE id = ?");
  const infak = (await prepare.execute([req.params.id]))[0];
  res.json(infak);
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const prepareInfak = await conn.prepare(
      "SELECT jumlahInfak, idRekening FROM infaks WHERE id = ?"
    );
    const infakResult = await prepareInfak.execute([req.params.id]);
    const oldJumlahInfak = infakResult[0].jumlahInfak;
    const idRekening = infakResult[0].idRekening;

    //mengurangi saldo dengan jumlah infak yang lama
    const prepareUpdateRekening = await conn.prepare(
      "UPDATE rekenings SET saldo = saldo - ? WHERE id = ?"
    );
    await prepareUpdateRekening.execute([
      oldJumlahInfak,
      idRekening
    ]);

    //update
    const prepare = await conn.prepare(
      "UPDATE infaks SET tanggal = ?, idAlumni = ?, idRekening = ?, jumlahInfak = ? WHERE id = ?"
    );
    await prepare.execute([
      req.body.tanggal,
      req.body.idAlumni,
      req.body.idRekening,
      req.body.jumlahInfak,
      req.params.id,
    ]);

    //Update saldo di tabel rekening
    const updateRekening = await conn.prepare(
      "UPDATE rekenings SET saldo = saldo + ? WHERE id = ?"
    );
    await updateRekening.execute([
      req.body.jumlahInfak,
      req.body.idRekening,
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
    const prepareInfak = await conn.prepare(
      "SELECT idAlumni, idRekening, jumlahInfak FROM infaks WHERE id = ?"
    );
    const infakResult = await prepareInfak.execute([req.params.id]);
    const idAlumni = infakResult[0].idAlumni;
    const idRekening = infakResult[0].idRekening;
    const jumlahInfak = infakResult[0].jumlahInfak;

    //DELETE INFAK
    const prepare = await conn.prepare("DELETE FROM infaks WHERE id = ?");
    await prepare.execute([req.params.id]);

    //Update total infak di tabel alumni
    const prepareUpdateAlumni = await conn.prepare(
      "UPDATE alumnis SET totalInfak = totalInfak - 1 WHERE id = ?"
    );
    await prepareUpdateAlumni.execute([idAlumni]);

    //Update total infak di tabel rekening
    const prepareUpdateRekening = await conn.prepare(
      "UPDATE rekenings SET saldo = saldo - ? WHERE id = ?"
    );
    await prepareUpdateRekening.execute([jumlahInfak, idRekening]);

    res.send("Success Delete Data");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

export default router;