import axios from "axios";
import { message } from "antd";
import {store} from '../index'
import { replace } from 'connected-react-router'

// 状态码错误信息
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

let baseURL;

// 环境的切换
if (process.env.NODE_ENV === "development") {
    baseURL = "/";
} else if (process.env.NODE_ENV === "debug") {
    baseURL = "/";
} else if (process.env.NODE_ENV === "production") {
    baseURL = "/";
}

// create an axios instance
const request = axios.create({
    baseURL,
    timeout: 15000
});
const token = "";
// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在请求发送之前做一些事
        if (token) {
            config.headers.Authorization = "Bearer " + token; // 让每个请求携带token
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);
// 再添加一个返回拦截器
request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
/**
 * type: get|post|
 * get方式推荐使用RESTful，参数从路由匹配
 * contentType:
 */
export default ({
    type = "get",
    url,
    data = {},
    contentType = "application/json"
}) => {
    type = type.toLocaleLowerCase();
    let postData = {},
        config = {
            headers: { "Content-Type": contentType }
        };
    // 数据格式化，传过来的data均为json
    if (type === "post") {
        postData.params = data;
    }
    if (contentType === "multipart/form-data") {
        let formData = new FormData();
        for (let k in data) {
            formData.append(k, data[k]);
        }
        postData = formData;
    }
    return request[type](url, postData, config).then(response => {
        if (response.data && response.data.code !== 1000) {
            message.error(response.data.message);
        }
        return response.data || {};
    }).catch(error => {
        const {status,statusText} = error.response;
        const errortext = codeMessage[status] || statusText;
        const { dispatch } = store;
        if (status === 401) {
            dispatch(replace('/login'));
        }
        return { code: status, message: codeMessage[errortext] }
    })
};
