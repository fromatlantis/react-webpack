const origin = window.location.origin
export const APPID =
    process.env.CONFIG_ENV === 'development' ? 'HZYYGLPTSFGL0067' : 'HZYYGLPTSFGL0090'
export default {
    origin,
    sso: `${origin}/portal/#/login`,
}
