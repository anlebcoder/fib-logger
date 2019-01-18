# fib-log
统一服务端日志规范，把日志规范成 

console.log 业务日志  文件名：access.log

console.error 错误日志 文件名: error.log

console.warn 告警日志	  文件名：warn.log

# Install

```bash
$ npm install fib-log
```

# Usage

## 使用方式

```
var log = require("fib-log");
log.setup({
	logPath: "../logs/" 默认"../logs/",
	logConfig:{
		type:"console",
		levels: [console.INFO, console.ERROR] // 默认所有输出到控制台，另外log error warn按file形式存储
	}
})
```

# Api
```
log.setup(); //初始化目录以及设置console

log.info(); //查看配置信息，如：logPath和logConfig

log.list(type); //type:access、error、warn 按这3种把文件内容输出，主要用于查看服务端的错误日志
```

