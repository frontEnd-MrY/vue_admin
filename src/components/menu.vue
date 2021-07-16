<template>
    <div class="menu">
        <el-menu
            style="border-right: 0"
            :default-active="defaultActive"
            router
            class="el-menu-vertical-demo"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :collapse="$store.state.menu.isOpen"
        >
            <MenuChildre :menuList="menuList" />
        </el-menu>
    </div>
</template>

<script>
import store from '@/store/index';
import variables from '@/assets/style/variables.scss';
import MenuChildre from './menu-children';

export default {
    store,
    components: {
        MenuChildre
    },
    data() {
        return {
            menuList: []
        };
    },
    methods: {
        /**
         * @author: yx
         * @method: 获取菜单
         * @Date: 2021-03-17 14:53:53
         */
        getMenu() {
            this.menuList = [
                { name: 'Home', path: '/home', icon: 'el-icon-menu', isFirst: true },
                {
                    name: 'Account',
                    path: '/account',
                    icon: 'el-icon-location',
                    isFirst: true,
                    children: [
                        { name: 'List', path: '/account/list' },
                        { name: 'Detail', path: '/account/detail' }
                    ]
                },
                { name: '导航三', path: '/test', isFirst: true, icon: 'el-icon-document' },
                { name: '导航四', path: '/test2', isFirst: true, icon: 'el-icon-setting' }
            ];
        }
    },
    mounted() {
        this.getMenu();
    },
    computed: {
        variables() {
            return variables;
        },
        // 当前路由
        defaultActive() {
            return this.$store.state.menu.nowPath;
        }
    }
};
</script>

<style lang="scss" scoped>
.menu {
    ul {
        height: 100%;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    overflow: auto;
    height: 100%;
    width: 200px;
}

/* 滚动条样式 */

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}
</style>
