<template>
    <div class="my-home" style="height: 100%;">
        <Menu />
        <div class="right-content">
            <myHeader />
            <router-view />
        </div>
    </div>
</template>

<script>
import myHeader from '@/components/my-header';
import Menu from '@/components/menu';

export default {
    components: { myHeader, Menu },
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((positoin) => {
                console.log('positoin--->', positoin);
            }, (error) => {
                switch (error.code) {
                case error.TIMEOUT:
                    console.log('A timeout occured! Please try again!');
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log('We can\'t detect your location. Sorry!');
                    break;
                case error.PERMISSION_DENIED:
                    console.log('Please allow geolocation access for this to work.');
                    break;
                case error.UNKNOWN_ERROR:
                    console.log('An unknown error occured!');
                    break;
                default:
                    console.log('Location failed, please turn on the GPS location of your phone');
                }
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }

        // 校验设备类型
        const os = (() => {
            const ua = navigator.userAgent;
            const isWindowsPhone = /(?:Windows Phone)/.test(ua);
            const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
            const isAndroid = /(?:Android)/.test(ua);
            const isFireFox = /(?:Firefox)/.test(ua);
            const isTablet =
                    /(?:iPad|PlayBook)/.test(ua) ||
                    (isAndroid && !/(?:Mobile)/.test(ua)) ||
                    (isFireFox && /(?:Tablet)/.test(ua));
            const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
            const isPc = !isPhone && !isAndroid && !isSymbian;
            return {
                isTablet: isTablet,
                isPhone: isPhone,
                isAndroid: isAndroid,
                isPc: isPc
            };
        })();

        if (os.isAndroid || os.isPhone) {
            // 手机
            this.$store.commit('menu/setOpen', true);
        } else if (os.isTablet) {
            // 平板
            this.$store.commit('menu/setOpen', true);
        } else if (os.isPc) {
            // 电脑
            this.$store.commit('menu/setOpen', false);
        }
    }
};
</script>

<style lang="scss" scoped>
.my-home {
    display: flex;
    .right-content {
        width: 100%;
    }
}
</style>
