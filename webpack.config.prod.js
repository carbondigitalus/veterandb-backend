const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [new CleanPlugin.CleanWebpackPlugin()]
};
