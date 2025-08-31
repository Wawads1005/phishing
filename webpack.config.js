// @ts-check

import path from "node:path";
import nodeExternals from "webpack-node-externals";

process.loadEnvFile();

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.resolve("./src/index.ts"),
  output: {
    filename: "server.js",
    path: path.resolve("./build/"),
    clean: true,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  target: "node",
};

export default config;
