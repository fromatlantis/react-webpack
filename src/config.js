let frontHost, backHost
// 环境的切换
if (process.env.NODE_ENV === "development") {
    frontHost = 'http://localhost:3000'
    backHost = 'http://localhost:3001'
} else if (process.env.NODE_ENV === "debug") {
    frontHost = 'http://localhost:3000'
    backHost = 'http://localhost:3001'
} else if (process.env.NODE_ENV === "production") {
    frontHost = 'http://www.shangzw.xyz/portal'
    backHost = 'http://bg.shangzw.xyz/houzai'
}
export default {
    frontHost,
    backHost
}