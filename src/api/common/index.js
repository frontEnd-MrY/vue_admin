import axiosInstance from '@/utils/axios';

export default {
    /**
     * @author: yx
     * @method: 登陆
     * @Date: 2021-02-22 09:25:36
     */
    login(params) {
        return axiosInstance.post('/login', params, { noToken: true });
    }
};
