const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, 'assets', 'js'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/react'],
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};
