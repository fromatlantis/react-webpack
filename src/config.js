let frontHost, backHost
// 环境的切换
if (process.env.NODE_ENV === "development") {
    frontHost = 'http://localhost:3000'
    backHost = 'http://localhost:3001'
} else if (process.env.NODE_ENV === "debug") {
    frontHost = 'http://localhost:3000'
    backHost = 'http://localhost:3001'
} else if (process.env.NODE_ENV === "production") {
    frontHost = 'http://62.234.115.117/portal'
    backHost = 'http://62.234.115.117/houzai'
}
export default {
    frontHost,
    backHost
}