const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
	src:    path.join(__dirname, 'src'),
	dist:   path.join(__dirname, 'dist'),
	assets: 'assets/',
};

module.exports = {
	externals: {
		paths: PATHS,
	},
	entry: {
		index: PATHS.src,
	},
	output: {
		filename:   `${PATHS.assets}js/[name].[hash].js`,
		path:       PATHS.dist,
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test:   /[\\/]node_modules[\\/]/,
					name:   'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module:       {
		rules: [
			{// --------------------JS----------------------
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use:     {
					loader:  'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			},
			{// ------------------STYLES--------------------
				test: /\.(sa|sc|c)ss$/,
				include: PATHS.src,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: {} },
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			{// -----------------IMAGES---------------------
				test: /\.(png|svg|jpg|gif)$/,
				include: PATHS.src,
				use: {
					loader: 'file-loader',
					options: {
						name:       '[name].[hash].[ext]',
						outputPath: `${PATHS.assets}media/`,
					},
				},
			},
			{// -------------------FONTS------------------
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				include: PATHS.src,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:       '[name].[hash].[ext]',
							outputPath: `${PATHS.assets}media/`,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: `${PATHS.dist}/index.html`,
		}),
		new webpack.HashedModuleIdsPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`,
		}),
	],
};
