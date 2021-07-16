import api from '@/api/common';


export default {
    namespaced: true,
    actions: {
    /**
     * @author: yx
     * @method: 登陆
     * @Date: 2021-02-22 09:17:34
     */
        login(store, params) {
            return api.login(params);
        }
    }
};
