import Vue from 'vue';
import axios from 'axios';
import HTTP_CONFIG from './http.config';
import router from '../router';
import { removeToken } from './auth';
import { append, remove } from './ajaxLoading';

let isRefreshing = false; // 防止多次接口 401

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.VUE_APP_BASEURL : 'http://106.15.177.69:39001',
    timeout: HTTP_CONFIG.TIMEOUT,
    withCredentials: false,
    transformRequest: function (data, headers) {
        headers.Authorization = HTTP_CONFIG.getHeaders().token;
        headers['Content-Type'] = 'application/json;charset=UTF-8';
        if (data instanceof FormData) {
            return data;
        }
        return JSON.stringify(data);
    }
});

// request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const { loading, responseType } = config;

        if (responseType) config.responseType = responseType;

        // 设置id 加loading
        if (loading) {
            const ajaxId = Date.now();
            config.ajaxId = ajaxId;
            append(ajaxId);
        }

        return config;
    },
    (error) => {
        // Do something with request error
        Promise.reject(error);
    }
);

// const checkUserPermisson
axiosInstance.interceptors.response.use(function (response) {
    const { data, config } = response;
    const { responseType, ajaxId, loading } = config;

    loading && remove(ajaxId);

    // 如果响应类型是 blob 直接返回response 用来判断文件类型
    if (responseType === 'blob') {
        return response.data;
    }

    if (response && response.data && response.data.code == 100016) {
        // 无权限拦截
        Vue.prototype.$message.error('无权限访问，请联系管理员!');
        !router.app._route.name != 'notFound' && router.push('/404');
        return Promise.reject(new Error('无权限访问')); ;
    } else if (response && response.data && response.data.code == 500) {
        // 接口报错拦截
        Vue.prototype.$message.error(response.data.msg);
        return Promise.reject(new Error(response.data.msg));
    }

    return data;
}, function (error) {
    const { response = {}, config = {} } = error;
    const { ajaxId, loading } = config;

    // 删除ajaxId 若没有其他接口正在请求 则关闭loading
    loading && remove(ajaxId);

    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
        Vue.prototype.$message.error('服务器无响应或网络异常!');
    } else if (response.status === 401) {
        removeToken();
        if (isRefreshing) return Promise.reject(error);
        Vue.prototype.$message.error('登录失效，请先登录!');
        router.push('/login');
        isRefreshing = true;
        // 3 秒内 禁止重复弹窗 & 跳转登陆页
        setTimeout(() => { isRefreshing = false; }, 3000);
    } else if (response.status === 404) {
        Vue.prototype.$message.error('访问接口不存在!');
    } else if (response.status == 500) {
        Vue.prototype.$message.error(response.data.error || response.statusText);
    }

    return Promise.reject(error);
});

export default axiosInstance;
