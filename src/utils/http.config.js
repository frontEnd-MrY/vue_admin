import { getToken } from './auth';

export default {
    // 文件存储服务器地址
    SOURCE_URL: 'http://localhost/',


    TIMEOUT: 20000,

    getHeaders() {
        return {
            token: getToken()
        };
    }
};
