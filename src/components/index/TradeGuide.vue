<template>
<section id="tradeGuide">
    <a-row :gutter="32">
        <a-col :span="12">
            <img style="width: 100%; " :src="curImg" />
        </a-col>
        <a-col :span="12">
            <div class="tradeguide-tab">
                <h2>一站式交易服务</h2>
                <a-menu mode="horizontal" @click="changeMenu" :default-selected-keys="['id-1']">
                    <a-menu-item v-for="tgd in tradeguidetabData" :key="tgd.id">{{ tgd.title }}</a-menu-item>
                </a-menu>
                <div style="color: red;">{{ curDesc || "" }}</div>
            </div>
        </a-col>
        <div class="know-more">
            <a>了解更多</a>
        </div>
    </a-row>
</section>
</template>

<script>
export default {
    data() {
        return {
            tradeguidetabData: [],
            curImg: "",
            curIndex: "",
            curDesc: "",
        };
    },
    created() {
        this.getTradeguidetabData()
    },
    methods: {
        async getTradeguidetabData() {
            let data = await this.$http("/api/tradeguidetab.json", {})
            this.tradeguidetabData = data
            this.curImg = data[0].img
            this.curDesc = data[0].desc
        },
        changeMenu(item) {
            let curTra = this.tradeguidetabData.find(itm => itm.id == item.key)
            if (curTra) {
                this.curDesc = curTra.desc
                this.curImg = curTra.img
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ant-row{
    position: relative;
    .know-more{
        position: absolute;
        right: 0px;
        bottom: 0;
        display: inline-block;
        width: 50%;
        padding: 0 16px;
    }
}
</style>
