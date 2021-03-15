<template>
<a-layout-header id="header">
    <div class="logo">
        <img src="https://www.gateio.tv/images/logo/open_sesame_night.png"/>
    </div>
    <div class="left-panel">
        <span v-for="mu in menus" :key="mu.id">
            <span v-if="mu.more">
                <a-popover>
                    <template slot="content">
                        <p>Content</p>
                        <p>Content</p>
                    </template>
                    <a-button type="link">
                        {{ mu.text }}
                        <a-icon type="down" />
                    </a-button>
                </a-popover>
            </span>
            <span v-else>
                <a-button type="link">
                    {{ mu.text }}
                </a-button>
            </span>
        </span>
    </div>
    <div class="right-panel">
        <span>
            <a-icon type="phone" />
        </span>
        <span>
            <a-icon type="qrcode" />
        </span>
        <span>
            <a-icon type="user" />
        </span>
    </div>
</a-layout-header>
</template>

<script>
export default {
    data() {
        return {
            menus: []
        }
    },
    created() {
        this.getMenuData();
    },
    methods: {
        async getMenuData() {
            /*this.$http('./api/menu.json',{}).then(data=>{
                console.log(data)
            })*/
            let data = await this.$http('./api/menu.json', {})
            this.menus = data
        },
    },
}
</script>

<style lang="scss" scoped>
/* ------------ Header.vue ------------ */
#header{
    color: red;
}
</style>
