let http = require('http');
let fs = require('fs');

const URL = 'http://v.juhe.cn/toutiao/index?type=toutiao&key=3a86f36bd3ecac8a51135ded5eebe862'; //这里借用一些某网友的API，如有问题请联系本人删除
const FILEPATH = '/Users/czhou/Desktop/Promise/news.txt';

function saveNews(content) {
	return new Promise(function(reslove, reject) {
		fs.writeFile(FILEPATH, content, {}, function(err) {
			if (err) {
				reject(err);
			} else {
				reslove('Done');
			}
		});
	})
}

new Promise(function(reslove, reject) {
	http.get(URL, function(req, res) {
		let response = '';
		req.on('data', function(data) {
			response += data;
		});
		req.on('end', function() {
			reslove(response);
		});
	})
}).then(function(response) {
	return saveNews(response);
}).then(function(response) {
	console.log(response);
}).catch(function(err) {
	console.log(err);
})