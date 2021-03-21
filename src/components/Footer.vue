<template>
<a-layout-footer>
    <a-row>
        <a-col :span="6">
            <img style="width: 80%;" src="https://www.gateio.tv/images/logo/open_sesame_light.png"/>
            <p>市场有风险，投资需谨慎</p>
            <p>当前服务器时间：</p>
            <p>gate.io 版权所有 © 2013-2021</p>
        </a-col>
        <a-col :span="15">
            <a-row>
                <a-col :span="6" v-for="dt in footData" :key="dt.name">
                    <p class="title">{{ dt.name }}</p>
                    <p v-for="sd in dt.data" :key="sd">
                        <a>{{ sd }}</a>
                    </p>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="3">
            <p class="title">联系我们</p>
            <p>技术支持：</p>
            <p>support@mail.gate.io</p>
            <div>
                <a-icon type="question-circle" />
                <a-icon type="medium-circle" theme="filled" />
                <a-icon type="twitter-circle" theme="filled" />
                <a-icon type="zhihu-circle" theme="filled" />
                <a-icon type="qq-circle" theme="filled" />
                <a-icon type="dingtalk-circle" theme="filled" />
            </div>
        </a-col>
    </a-row>
    <div class="text-center footer-trade">
        交易量：
    </div>
</a-layout-footer>
</template>

<script>
export default {
    data() {
        return {
            footData: []
        }
    },
    created () {
        this.getFooterData();
    },
    methods: {
        async getFooterData() {
            //https://www.gateio.tv/json_svr/query/?u=302&c=617136
            //循环得到数据
            let data = await this.$http('api/footer.json', {})
            this.footData = data
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
