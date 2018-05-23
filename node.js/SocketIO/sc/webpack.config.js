var path = require('path');
var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: [
        './index.js',
        'webpack/hot/dev-server',
    ],
  
    output: {
        path: __dirname + '/dist',
        publicPath: '/assets/',
        filename: 'bundle.min.js'
    },

    module: {
        loaders: [
            { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
        ]
    },
  
    resolve: {
		    extensions: ["", ".js", ".jsx", ".scss", ".css", ".html"]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new UnminifiedWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    node: {
        fs: "empty"
    }
};
