let frontHost, backHost
// 环境的切换
if (process.env.NODE_ENV === 'development') {
    frontHost = 'http://localhost:3000'
    backHost = 'http://localhost:3001'
} else if (process.env.NODE_ENV === 'test') {
} else if (process.env.NODE_ENV === 'production') {
    if (process.env.CONFIG_ENV === 'test') {
        frontHost = 'http://www.shangzw.xyz/portal'
        backHost = 'http://bg.shangzw.xyz/houzai'
    } else {
        frontHost = 'http://www.hzpark.com/portal'
        backHost = 'http://bg.hzpark.com/houzai'
    }
}
export default {
    frontHost,
    backHost,
}
