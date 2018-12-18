import axios from "axios";
import { message } from "antd";
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
        Promise.reject(error);
    }
);
// 再添加一个返回拦截器
request.interceptors.response.use(
    response => {
        if (response.data && response.data.code !== 1000) {
            message.error(response.data.message);
            return Promise.reject(response.data);
        } else {
            return response;
        }
    },
    error => {
        console.log("err" + error); // for debug
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    // Do something
                    break;
                case 401:
                    window.location.href = "#/login";
                    // Do something
                    break;
                default:
                    // Do something
                    break;
            }
        }
        return Promise.reject(error);
    }
);
/**
 * type: get|post|
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
    return request[type](url, postData, config);
};
