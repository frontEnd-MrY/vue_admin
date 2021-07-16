<template>
    <div class="menu" @click.stop>
        <div v-for="(item, index) in menuList" :key="index">
            <template v-if="item.children && item.children.length > 0">
                <el-submenu :index="item.path">
                    <template>
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <!-- 第一层在收起时需要隐藏 -->
                            <span v-if="item.isFirst && !$store.state.menu.isOpen">{{item.name}}</span>
                            <!-- 非第一层可持续展示 -->
                            <span v-if="!item.isFirst">{{item.name}}</span>
                        </template>
                        <Menu :menuList="item.children"></Menu>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    props: ['menuList']
};
</script>
