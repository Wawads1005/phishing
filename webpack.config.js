// @ts-check

import path from "node:path";
import webpackNodeExternals from "webpack-node-externals";

/**
 * @typedef {import("webpack").Configuration} WebpackConfiguration
 */

/**
 * @type {WebpackConfiguration}
 */
const config = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  entry: path.resolve("./src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve("./build/"),
  },
  module: {
    rules: [{ test: /\.(?:ts)$/, use: [{ loader: "babel-loader" }] }],
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      "@/*": path.resolve("./src/*"),
    },
  },
  target: "node",
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()],
};

export default config;
