import childProcess from "node:child_process";

const NGROK_API_TUNNEL_URL = "http://127.0.0.1:4040/api/tunnels";
const NGROK_TIMEOUT = 3000;

interface GetTunnelsResponse {
  tunnels: Ngrok.Tunnel[];
  uri: string;
}

async function getNgrokTunnels() {
  try {
    const response = await fetch(NGROK_API_TUNNEL_URL);
    const data: GetTunnelsResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unexpected error occured upon getting ngrok tunnels");
  }
}

interface CreateNgrokProcessOptions {
  port: number;
}

async function createNgrokProcess(opts: CreateNgrokProcessOptions) {
  const ngrokProcess =
    globalThis.ngrokProcess ??
    childProcess.spawn("ngrok", ["http", `${opts.port}`]);

  if (!globalThis.ngrokProcess) {
    globalThis.ngrokProcess = ngrokProcess;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, NGROK_TIMEOUT);
  });

  return ngrokProcess;
}

function deleteNgrokProcess() {
  if (!globalThis.ngrokProcess) {
    return;
  }

  globalThis.ngrokProcess.kill();
  console.log("Ngrok process was successfully killed");
}

export { getNgrokTunnels, createNgrokProcess, deleteNgrokProcess };
