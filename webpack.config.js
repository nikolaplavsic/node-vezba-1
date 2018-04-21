
var path = require('path');
appEntryPath = path.join(__dirname, 'app', 'app.js');
styleEntryPath = path.join(__dirname, 'app', 'sass', 'main.scss');

distPath = path.join(__dirname, 'public', 'dist');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        app: appEntryPath
    },

    output: {
        path: distPath,
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin(
            {
                filename: path.join('css', 'styles.css'),
                // allChunks: true
            }
        )
    ]
};