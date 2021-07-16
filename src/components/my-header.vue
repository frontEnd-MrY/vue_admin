<template>
    <div class="my-header">
        <i v-if="!$store.state.menu.isOpen" @click="changeNav()" class="el-icon-s-fold header-left"></i>
        <i v-if="$store.state.menu.isOpen" @click="changeNav()" class="el-icon-s-unfold header-left"></i>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in routerList" :key="index" :to="index < routerList.length - 1 ? item.path : ''">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img class="logo" src="@/assets/logo.svg"><i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item.command" v-for="(item, index) in dropdownList" :key="index">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import store from '@/store/index';
import { removeToken } from '@/utils/auth';

export default {
    store,
    data() {
        return {
            routerList: [],
            dropdownList: [{ name: '首页', command: 'goHome' }, { name: '退出登陆', command: 'logOut' }]
        };
    },
    methods: {
        changeNav() {
            this.$store.commit('menu/changeNav');
        },
        /**
         * @author: yx
         * @method: 更新顶部 Breadcrumb
         * @Date: 2021-03-17 14:09:52
         */
        updateBreadcrumb() {
            this.routerList = this.$route.matched.filter(item => item.meta && item.meta.title).map(item => { return { meta: item.meta, path: item.path }; });
            if (!this.routerList || this.routerList[0].meta.title != 'Home') {
                this.routerList.unshift({ meta: { title: 'Home' }, path: '/home' });
            }
        },
        /**
         * @author: yx
         * @method: 顶部头像下拉菜单点击事件
         * @param { command: 选择的菜单 }
         * @Date: 2021-03-17 14:31:52
         */
        handleCommand(command) {
            if (command == 'goHome') {
                // 返回首页 (如果当前已是首页不进行跳转)
                if (this.$route.name) return this.$message({ message: '当前页已是首页', type: 'warning' }); ;
                this.$router.push('/home');
            } else if (command == 'logOut') {
                // 退出登陆
                this.$confirm('是否确定登出账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeToken();
                    this.$router.push('/login');
                    this.$message({
                        type: 'success',
                        message: '登出成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消登出'
                    });
                });
            }
        }
    },
    mounted() {
        this.updateBreadcrumb();
    },
    watch: {
        $route() {
            this.updateBreadcrumb();
        }
    }
};
</script>

<style lang="scss" scoped>
.my-header {
    padding: .3rem 0;
    height: 2.083rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f2f3;
    i {
        font-size: 1rem;
        color: #545c64;
        padding: .4rem;
    }
    .el-dropdown{
        margin-left: auto;
        margin-right: .5rem;
        .el-dropdown-link {
            .logo {
                width: 2rem;
                height: 2rem;
            }
            i {
                padding: 0;
                font-size: .6rem;
            }
        }
    }
}
</style>
