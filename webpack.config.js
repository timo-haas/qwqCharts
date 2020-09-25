const path = require("path");

module.exports = {
  entry: {
    bar: "./src/modules/bar-chart/index.ts",
    line: "./src/modules/line-chart/index.ts",
    pie: "./src/modules/pie-chart/index.ts",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
