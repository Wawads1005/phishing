import express from "express";
import cors from "cors";
import path from "node:path";
import { appRouter } from "@/routes";
import {
  getNgrokTunnels,
  deleteNgrokProcess,
  createNgrokProcess,
} from "@/lib/ngrok";
import {
  DEFAULT_HOSTNAME,
  DEFAULT_PORT,
  DEFAULT_STATIC_PATH,
} from "@/constants";

process.loadEnvFile();

const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
const domain = process.env.DOMAIN || DEFAULT_HOSTNAME;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(DEFAULT_STATIC_PATH)));

app.use(cors({ credentials: true, origin: ["*"] }));

app.use("/", appRouter);

app.listen(port, domain, async (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Server running on port:${process.env.PORT}`);

  const ngrokProcess = await createNgrokProcess({ port });
  const ngrokTunnels = await getNgrokTunnels();

  const foundTunnel = ngrokTunnels.tunnels.find((tunnel) => tunnel.public_url);

  if (!foundTunnel) {
    console.log("Unexpected error occured, there's no tunnel was open");
    return;
  }

  console.log(`Tunneled into ${foundTunnel.public_url}`);
});

process.on("exit", () => {
  deleteNgrokProcess();
});

process.on("SIGINT", () => {
  deleteNgrokProcess();
  process.exit();
});

process.on("SIGTERM", () => {
  deleteNgrokProcess();
  process.exit();
});
