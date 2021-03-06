var path = require('path');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	module:{
		loaders:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query:{
					presets: ['es2015', 'react']
				}
			}
		]
	}
}