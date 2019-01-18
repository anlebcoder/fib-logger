var fs = require("fs");
var util = require("util");
var logPath = '../logs/';
var logConfig;

function init() {
	if (!fs.exists(logPath)) fs.mkdir(logPath);

	logConfig = logConfig || [{
		type: "console",
		levels: [console.FATAL, console.ALERT, console.CRIT, console.ERROR, console.WARN, console.NOTICE, console.INFO],
	}, {
		type: "file",
		levels: [console.FATAL, console.ALERT, console.CRIT, console.ERROR],
		path: logPath + "error.log",
		split: "hour",
		count: 128
	}, {
		type: "file",
		levels: [console.WARN],
		path: logPath + "warn.log",
		split: "hour",
		count: 128
	}, {
		type: "file",
		levels: [console.NOTICE, console.INFO],
		path: logPath + "access.log",
		split: "hour",
		count: 128
	}];

	console.reset();

	console.add(logConfig);
}

module.exports = {
	setup: function(d) {
		d = d || {};
		var _logConfig = d.logConfig,
			_logPath = d.logPath;

		if (_logConfig && !util.isObject(_logConfig)) throw new Error("logConfig is not object");


		logConfig = _logConfig;

		if (_logPath) logPath = _logPath;

		init();
	},
	list: function(type) {
		if (!type) return {
			error: "type is null"
		};

		var s = "";
		var files = fs.readdir(logPath).filter(function(k) {
			return k.indexOf(type) !== -1;
		}).forEach(function(k) {
			s = s + fs.readTextFile(logPath + k);
		});

		return s;
	},
	info: function() {
		return {
			logPath: logPath,
			logConfig: logConfig
		}
	}
}