export default {
    namespaced: true,
    state: {
        isOpen: false, // 如果是 false，左侧菜单栏以移动端方式显示， true：左侧菜单栏以PC端方式显示
        nowPath: '/home' // 当前路由
    },
    mutations: {
    /**
     * @author: yx
     * @method: 用于手动更改菜单栏显示模式(手机、电脑)
     * @Date: 2020-08-08 14:38:10
     */
        changeNav(state) {
            state.isOpen = !state.isOpen;
        },
        /**
     * @author: yx
     * @method: 用于第一次加载时根据设备自动设置菜单栏（展开，隐藏）
     * @Date: 2020-08-08 14:38:10
     */
        setOpen(state, data) {
            state.isOpen = data;
        },
        /**
     * @author: yx
     * @method: 更新当前路由
     * @Date: 2020-08-08 14:38:10
     */
        setNowPath(state, data) {
            state.nowPath = data;
        }
    },
    actions: {
    }
};
