declare namespace Ngrok {
  interface Tunnel {
    name: string;
    ID: string;
    uri: string;
    public_url: string;
    proto: string;
    config: {
      addr: string;
      inspect: boolean;
    };
    metrics: Record<string, unknown>;
  }
}
