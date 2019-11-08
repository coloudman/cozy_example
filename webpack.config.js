const development = process.env.dev === "true" ? true : false;

console.log(development);

const path = require("path");

module.exports = {
    mode: development ? "development" : "production",
    target: 'node',
    entry:{
        index:"./src/index.js"
    },
    output:{
        filename: 'index.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          //exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                /*'@babel/preset-env'*/
                ["@babel/env", {
                  "targets": {
                    "node": "current"
                  }
                }]
              ]
            }
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.html']
    },
    plugins: [],
    externals: [

    ]
};