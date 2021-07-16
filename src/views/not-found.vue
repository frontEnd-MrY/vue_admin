<template>
    <div class="not-found">
        <div class="not-found-body">
            <div class="lost-right">
                <div class="title">抱歉，你访问的页面不存在</div>
                <div class="content">
                    您要找的页面没有找到，请返回
                    <span class="home" @click="goHome">首页</span>继续浏览
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
};
</script>

<style lang="scss" scoped>
.not-found {
    display: flex;
    align-items: center;
    justify-items: center;
    height: calc(100% - 2.683rem - 1px);
    background: #fff;

    .not-found-body {
        display: flex;
        align-items: center;
        margin: 0 auto;
        img {
            min-width: 11.625rem;
            max-width: 11.625rem;
            min-height: 11.625rem;
            max-height: 11.625rem;
        }

        .lost-right {
            .title {
                font-size: 1rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 1.375rem;
            }

            .content {
                margin-top: 1.083rem;
                font-size: 0.583rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 0.833rem;

                .home {
                    cursor: pointer;
                    margin: 0 0.292rem;
                    font-size: 0.583rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(22, 134, 204, 1);
                    line-height: 0.833rem;
                }
            }
        }
    }
}
</style>
