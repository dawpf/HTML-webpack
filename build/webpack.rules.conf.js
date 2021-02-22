const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
		test: /\.(css|scss|sass)$/,
		// 区别开发环境和生成环境
		use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : extractTextPlugin
			.extract({
				fallback: "style-loader",
				use: ["css-loader", "sass-loader", "postcss-loader"],
				// css中的基础路径
				publicPath: "../"
			})
	},
	{
		test: /\.js$/,
		use: [{
			loader: "babel-loader"
		}],
		// 不检查node_modules下的js文件
		// exclude: "/node_modules/"
	}, {
		test: /\.(png|jpg|gif)$/,
		use: [{
			// 需要下载url-loader
			loader: "url-loader?limit=100&outputPath=./static/images&name=[name].[ext]",
			//新版本的url-loader的limit属性有时无效,故隐藏下方属性
			// options: {
			//   limit: 5000 , //小于这个时将会已base64位图片打包处理
			//   // 图片文件输出的文件夹
			//   publicPath: "./",
			//   outputPath: "./static/images"
			// }
		}]
	},
	{
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		use: [{
			// 需要下载url-loader
			loader: 'file-loader?limit=100&outputPath=./static/audio&name=[name].[ext]&publicPath=./static/audio',
		}]

	},
	{
		test: /\.html$/,
		// html中的img标签
		use: {
			loader: 'html-loader',
			options: {
				attrs: ['img:src', 'img:data-src', 'audio:src'],
				minimize: true
			}
		}
	},
	// {
	//         test: /\.mp3$/i,
	// 		use: 'file-loader'
	//       },
];
module.exports = rules;
