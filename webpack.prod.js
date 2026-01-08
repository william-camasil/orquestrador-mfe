// home-app/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ModuleFederationPlugin from webpack
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// import dependencies from package.json, which includes react and react-dom
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/entry.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "orquestor_mfe", // This application named 'Orquestrador'
      // This is where we define the federated modules that we want to consume in this app.
      // Note that we specify "Header" as the internal name
      // so that we can load the components using import("Header/").
      // We also define the location where the remote's module definition is hosted:
      // login_mfe@[http://localhost:3001/remoteEntry.js].
      // This URL provides three important pieces of information: the module's name is "Header", it is hosted on "localhost:3001",
      // and its module definition is "remoteEntry.js".
      remotes: {
        login_mfe:
          "login_mfe@https://s3-mfe-poc.s3.us-east-1.amazonaws.com/login-mfe/remoteEntry.js",
        dashboard_mfe:
          "dashboard_mfe@https://s3-mfe-poc.s3.us-east-1.amazonaws.com/dashboard-mfe/remoteEntry.js",
        cadastro_pessoa_juridica_mfe:
          "cadastro_pessoa_juridica_mfe@https://s3-mfe-poc.s3.us-east-1.amazonaws.com/cadastro-pessoa-juridica-mfe/remoteEntry.js",
        cadastro_pessoa_fisica_mfe:
          "cadastro_pessoa_fisica_mfe@https://s3-mfe-poc.s3.us-east-1.amazonaws.com/cadastro-pessoa-fisica-mfe/remoteEntry.js",
      },
      shared: {
        // and shared
        ...dependencies, // other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
