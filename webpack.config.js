const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const before = function before(app) {
    app.get('/src/*', (req, res) => {
        const filename = path.join(__dirname, '/', req.path);
        res.sendFile(filename);
    });
};

module.exports = {
    // context: __dirname,
    mode: 'development',
    entry: [
        './src/index.js',
        'webpack-dev-server/client/index.js?http://localhost:8080/',
    ],
    resolve: {
        extensions: ['.js', '.css'],
        modules: [path.join(__dirname, 'node_modules')],
    },

    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        // hot: true,
        // hotOnly: true,
        inline: true,
        noInfo: false,
        disableHostCheck:true,
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        //
        // 开启webpack全局热更新
        // new webpack.HotModuleReplacementPlugin(),

    ],

    output: {
        filename: 'bundle.js',
        path: path.dirname(__dirname, 'dist'),
        publicPath: '/'
    },
};
