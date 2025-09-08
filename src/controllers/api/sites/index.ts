import path from "node:path";
import fs from "node:fs";
import express from "express";

function getSite(siteId: string) {
  return async (_: express.Request, res: express.Response) => {
    try {
      const filePath = path.join(
        path.resolve("./views/sites"),
        siteId,
        "index.html"
      );

      const foundFile = fs.existsSync(filePath);

      if (!foundFile) {
        // [TODO]: Send a not found page
        res.status(404).json({ message: "NOT FOUND" });
      }

      res.status(200).sendFile(filePath);
    } catch (error) {
      // [TODO]: Send a not found page
      res.status(404).json({ message: "NOT FOUND" });
    }
  };
}

export { getSite };
