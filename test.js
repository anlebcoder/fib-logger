var test = require('test');
var fs = require("fs");
var coroutine = require("coroutine");
var fibLog = require("./index.js");
var logPath;
test.setup();

function clean() {
	var files = fs.readdir(logPath);
	files.forEach(function(k) {
		fs.unlink(logPath + k);
	});
	fs.rmdir(logPath);


	console.reset();
	console.add({
		type: "console",
		levels: [console.INFO, console.ERROR]
	});
}

function runTest() {
	console.log("access");

	console.warn("warn");

	console.error("error");

	coroutine.sleep(100);
	var files = fs.readdir(logPath);

	assert.equal(files.length, 3);

	assert.ok(files[0].indexOf("access") !== -1);

	assert.ok(files[1].indexOf("error") !== -1);

	assert.ok(files[2].indexOf("warn") !== -1);
}

describe("default setup", function() {
	before(function() {
		logPath = "../logs/";
	});

	after(function() {
		clean();
	});

	it("setup", function() {
		fibLog.setup();
		assert.equal(fibLog.info().logPath, logPath);
	});

	it("log check", runTest);

	it("list", function() {
		var r = fibLog.list("error");
		assert.ok(r.length > 10);
	});
});

describe("config setup", function() {
	before(function() {
		logPath = "./logs2/";
	});

	after(function() {
		clean();
	});

	it("setup", function() {
		fibLog.setup({
			logPath: logPath
		});
		assert.equal(fibLog.info().logPath, logPath);
	});

	it("log check", runTest);
});

describe("config={} setup", function() {
	before(function() {
		logPath = "./logs3/";
	});

	after(function() {});

	it("setup", function() {
		fibLog.setup({
			logPath: logPath,
			logConfig: {
				type: "console",
				levels: [console.INFO, console.ERROR]
			}
		});
		assert.equal(fibLog.info().logPath, logPath);
	});

	it("log check", function() {
		console.log("access");

		console.warn("warn");

		console.error("error");

		coroutine.sleep(100);
		var files = fs.readdir(logPath);

		assert.equal(files.length, 0);

		fs.rmdir(logPath);
	});
});

test.run(console.DEBUG);