const webpack = require('webpack');
const merge   = require('webpack-merge');
const common  = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: common.externals.paths.dist,
		overlay: {
			warnings: true,
			errors:   true,
		},
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
	],
});
