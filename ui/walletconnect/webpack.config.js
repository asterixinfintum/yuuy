const path = require('path');

module.exports = {
    entry: './index.js',  // Your main JavaScript file
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: 'bundle.js',  // Output bundle file
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']  // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']  // Transpile to compatible JavaScript
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',  // Use the TypeScript loader
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    devtool: 'source-map',
};