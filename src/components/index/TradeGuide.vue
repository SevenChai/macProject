<template>
<section id="tradeGuide">
    <a-row :gutter="32">
        <a-col :span="12">
            <img style="width: 100%; " src="https://www.gateio.tv/images/home/tradeguide/1.png" />
        </a-col>
        <a-col :span="12">
            <div class="tradeguide-tab">
                <h2>一站式交易服务</h2>
                <a-menu mode="horizontal" :defaultSelectedKeys="['1']">
                    <a-menu-item v-for="tgd in tradeguidetabData" :key="tgd.id">
                        {{ tgd.title }}
                    </a-menu-item>
                </a-menu>
                <div style="color: red;">
                    <div v-for="tgd in tradeguidetabData" :key="tgd.id">
                        {{ tgd.desc }}
                    </div>
                </div>

            </div>
        </a-col>
    </a-row>
</section>
</template>

<script>
export default {
    data() {
        return {
            tradeguidetabData: []
        }
    },
    created() {
        this.getTradeguidetabData()
    },
    methods: {
        async getTradeguidetabData() {
            let data = await this.$http('/api/tradeguidetab.json', {})
            this.tradeguidetabData = data
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
