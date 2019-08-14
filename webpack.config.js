const path = require('path'); // deals with absolute paths.
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {

    return {
        entry: {
            // A single file that starts the game.
            app: [
                'babel-polyfill',
                path.resolve(__dirname, 'src/index.js')
            ]
        },

        output: {
            // The bundled output destination.
            path: path.resolve(__dirname, 'www'),
            filename: 'js/[name].[hash].bundle.js'
        },

        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 0
            }
        },

        // Now, tell webpack to run the babel-loader through the source code
        module: {
            rules: [
                /*{
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: [
                        /node_modules/,
                        path.resolve(__dirname, 'src/libs/')
                    ],
                    loader: 'eslint-loader',
                    options: {
                        formatter: require("eslint-friendly-formatter"),
                        fix: true,
                        emitError: false,
                    }
                },*/

                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'src', '**', '*'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                },
                //Reminder: Update this in webversion, then pull to desktop version
                {
                    test: /\.(png|jpg|gif)$/,
                    exclude: /node_modules/,
                    loader: "file-loader?mimetype=image/*"
                },
               
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader?limit=1024&name=assets/fonts/[name].[ext]'
                    }
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.join(__dirname, 'sass'),
                    use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            debug: true,

                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }]
                }
            ]
        },

        plugins: [

            new CleanWebpackPlugin(['www']),

            // This plugin will copy the index.html from the root to the www folder.
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'assets', '**', '*'),
                    to: path.resolve(__dirname, 'www')
                }
            ]),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'src/index.html'),
                minify: {
                    removeAttributeQuotes: false,
                    collapseWhitespace: false,
                    html5: false,
                    minifyCSS: false,
                    minifyJS: false,
                    minifyURLs: false,
                    removeComments: false,
                    removeEmptyAttributes: false
                },
                hash: false
            }),

           
            new CspHtmlWebpackPlugin( //blocking uploading of images
                {
                    'script-src': ["'self'", "https://connect.facebook.net/en_US/sdk.js"],
                    'style-src': ["'self'", "'unsafe-inline'", "https://use.fontawesome.com"],
                    'font-src': ["'self'","https://use.fontawesome.com"],
                    'img-src': ["'self'", "data: ", "blob: "],
                    'default-src': ["'self'", "https://parseapi.back4app.com", "https://staticxx.facebook.com"]
                },

                {
                    enabled: true,
                    hashingMethod: 'sha256',
                    hashEnabled: {
                        'script-src': true,
                        'style-src': true
                    },
                    nonceEnabled: {
                        'script-src': true,
                        'style-src': false
                    }

                }
            ),

            // defines the Phaser renderer, in this case: Canvas.
            new webpack.DefinePlugin({
                'typeof CANVAS_RENDERER': JSON.stringify(true),
                'typeof WEBGL_RENDERER': JSON.stringify(false),
            }),
        ],

        // Webpack Dev Server that will be live reloading the page when changes are done.
        devServer: {
            contentBase: path.resolve(__dirname, 'www')
        },

        devtool: env.production ? 'none' : 'source-map'
    }
};