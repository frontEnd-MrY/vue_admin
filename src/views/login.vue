<template>
    <div class="login">
        <div class="login-form">
            <img class="logo" src="@/assets/logo.svg">
            <div class="line">
                <el-input placeholder="请输入帐号" v-model="user.account" clearable @keyup.enter.native="login"></el-input>
            </div>
            <div class="line">
                <el-input placeholder="请输入密码" v-model="user.password" show-password @keyup.enter.native="login"></el-input>
            </div>
            <div class="line">
                <el-button type="primary" @click="login" :loading="loading" :disabled="loading">登入</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import lg from '../utils/login';
export default {
    data() {
        return {
            loading: false,
            user: {}
        };
    },
    methods: {
        login() {
            if (!this.user.account || !this.user.password) return this.$message.warning('请输入有效的帐号与密码');

            // 登陆
            // this.$store.dispatch('common/login', {}).then((res) => {});

            this.loading = true;
            if (this.user.account != 'admin') {
                this.loading = false;
                return this.$message.warning('帐号不存在');
            } else if (this.user.password != 'admin') {
                this.loading = false;
                return this.$message.warning('密码错误');
            } else {
                this.$message.success('登录成功');
                setTimeout(() => {
                    this.$router.replace('/home');
                }, 600);
            }
        }
    },
    mounted() {
        lg();
    },
    destroyed() {
        const dom = document.getElementsByClassName('my_canvas')[0];
        dom.remove();
    }
};
</script>

<style lang="scss" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: no-repeat;
    background-size: 100% 100%;
    background-image: url('../assets/lg_bg.jpg');
    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        z-index: 999999;
        .logo {
            display: block;
            margin: 0 auto;
            width: 5rem;
            -webkit-user-drag: none;
        }
        .line {
            margin: .8rem 0;
            min-width: 16rem;
            display: flex;
            align-items: center;
            justify-items: center;
            opacity: .9;
            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
