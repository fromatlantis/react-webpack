import qs from 'qs'
import CryptoJS from 'crypto-js'
import config from '../config'
const getBase64 = file =>
    new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = evt => resolve(evt.target.result)
        reader.readAsDataURL(file)
    })
// 重定向到登陆页面
const redirectLogin = ({ type = 0, storeurl = false }) => {
    let fromUrl = window.location.href
    if (storeurl) {
        window.location.href = `${config.sso}?fromurl=${fromUrl}&type=${type}`
    } else {
        window.location.href = `${config.sso}`
    }
}
// 获取地址栏参数
// 获取地址栏参数
const getUrlParam = param => {
    let searchParams = new URLSearchParams(window.location.href.split('?')[1])
    return searchParams.get(param)
}
/**
 * 加解密
 */
export const DES = CryptoJS.DES
/**
 * DES解密
 * @param {string} cipherText 待解密密文
 * @param {string} key 密钥
 */
const DESDecrypt = (cipherText, key = 'TUSMART_HOUZAI') => {
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    // direct decrypt ciphertext
    const decrypted = CryptoJS.DES.decrypt(
        {
            ciphertext: CryptoJS.enc.Base64.parse(cipherText),
        },
        keyHex,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        },
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
}
/**
 * DES加密
 * @param {string} message 明文
 * @param {string} key 密钥
 */
const DESEncrypt = (message, key = 'TUSMART_HOUZAI') => {
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}
export { getBase64, redirectLogin, getUrlParam, DESEncrypt, DESDecrypt }
