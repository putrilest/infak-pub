import express from "express";
import cors from "cors";
import conn from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import alumnisRouter from "./routers/alumnis.js";
import infaksRouter from "./routers/infaks.js";
import rekeningsRouter from "./routers/rekenings.js";

//Middlewares
export const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); 
app.use(express.static('./public/images'));


//Membuat route (dengan objek Router)
const router = express.Router();

//CREATE
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.passwordd, 10);
    const prepare = await conn.prepare(
      "INSERT INTO users (username, passwordd) VALUES (?, ?)"
    );
    await prepare.execute([
      req.body.username,
      hashedPassword,
    ]);
    res.send("Succes Create Account");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM users WHERE username = ?");
  const user = (await prepare.execute([req.body.username]))[0];
  if (user) {
    const passworddMatch = await bcrypt.compare(req.body.passwordd, user.passwordd);
    if (passworddMatch) {
      res.json({
        token: jwt.sign(user, process.env.SECRET_KEY),
        user,
      });
    } else {
      res.status(401);
      res.send("Wrong Password");
    }
  } else {
    res.status(401);
    res.send("User Not Found");
  }
});

// Middleware otentikasi
router.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
      next();
      } catch {
      res.status(401);
      res.json({ error: 'Token invalid' });
    }
  } else {
    res.status(403);
    res.json({ error: 'Empty Token' });
  }
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/alumni", alumnisRouter);
router.use("/infak", infaksRouter)
router.use("/rekening", rekeningsRouter)
app.use("/api", router);

app.listen(3000, () => console.log("Succes Running Server in port 3000."));