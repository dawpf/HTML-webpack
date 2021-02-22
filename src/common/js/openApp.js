import CallApp from 'callapp-lib';
/**
 * 判断是否为微信浏览器
 * 兼容ios
 * */
function isWeiXin() {
	return /micromessenger/i.test(navigator.userAgent.toLowerCase()) || typeof navigator.wxuserAgent !== 'undefined'
}

/**
 * 判断是否为iphone的Safari浏览器
 * 兼容ios
 * */
function isiPhoneSafari() {
	return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}

/** 
 * 获取 url 携带参数
 * @param name
 * @returns {string|null}
 */
function getQueryString(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	const r = location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}

let scheme = {
	protocol: 'APP协议,URLScheme的scheme字段,就是你要打开的APP的标识',
	host: 'URL Scheme的host字段'
}

const option = {
	scheme: scheme,
	intent: { // 安卓原生谷歌浏览器必须传递Intent协议地址,才能唤起APP。
		package: 'com.xx.xxx.xxxx', // Android包名
		scheme: 'cherry', // 和protocol一样:APP协议,URL Scheme的scheme字段,就是你要打开的APP的标识
	},
	appstore: 'appstore的下载地址',
	yingyongbao: '应用宝的下载地址',
	fallback: '唤端失败后跳转的地址',
	timeout: 3000,
};

const lib = new CallApp(option);

function open() {
	// 打开app前需要判断是否要显示右上角 “在浏览器中打开”

	// 打开app
	lib.open({
		path: '', // 需要打开的页面对应的值,URL Scheme中的path部分,只想要直接打开app,不需要打开特定页面,path传空字符串''就可以。

		param: {}, // 打开APP某个页面,它需要接收的参数

		// 自定义唤端失败回调函数,传递callback会覆盖callapp-lib库中默认的唤端失败处理逻辑
		callback: function () {
			console.log('唤端失败的处理');
		}
	});
}

export default open
