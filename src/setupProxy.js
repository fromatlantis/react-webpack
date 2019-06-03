// 修改本文件，需要重启前端服务yarn start
const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    // 接口代理e.g.
    app.use(proxy('/authuser/', { target: 'http://62.234.115.117:8804/houzai' }))
    app.use(proxy('/property/', { target: 'http://62.234.115.117:8804/houzai' }))
}
