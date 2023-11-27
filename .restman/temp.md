# [POST] http://localhost:8000/auth/me

## request

```json
{
  "method": "POST",
  "url": "http://localhost:8000/auth/me",
  "baseURL": "http://localhost:3000",
  "headers": {}
}
```

## response

```json
{
  "message": "Request failed with status code 403",
  "name": "Error",
  "stack": "Error: Request failed with status code 403\n\tat e.exports (c:\\Users\\Hassan\\.vscode-oss\\extensions\\crossjs.vscode-restman-0.0.14-universal\\out\\extension.js:8:36469)\n\tat e.exports (c:\\Users\\Hassan\\.vscode-oss\\extensions\\crossjs.vscode-restman-0.0.14-universal\\out\\extension.js:8:38860)\n\tat IncomingMessage.<anonymous> (c:\\Users\\Hassan\\.vscode-oss\\extensions\\crossjs.vscode-restman-0.0.14-universal\\out\\extension.js:8:31465)\n\tat IncomingMessage.emit (node:events:525:35)\n\tat endReadableNT (node:internal/streams/readable:1359:12)\n\tat process.processTicksAndRejections (node:internal/process/task_queues:82:21)",
  "config": {
    "url": "http://localhost:8000/auth/me",
    "method": "post",
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "axios/0.21.1"
    },
    "baseURL": "http://localhost:3000",
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1
  }
}
```
