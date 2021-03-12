<template>
<section id="topMarkets">
    <div class="text-center trade-title">
        <a-menu mode="horizontal" :defaultSelectedKeys="[1]">
            <a-menu-item v-for="tra in trades" :key="tra.id">
                {{ tra.text }}
            </a-menu-item>
        </a-menu>
    </div>
    <a-table :columns="columns" :data-source="markets" :pagination="false">
        <template v-slot:action>
            <a-button type="default">去交易</a-button>
        </template>
    </a-table>
    <div class="text-center">
        <a-button type="link">查看更多
            <a-icon type="right" />
        </a-button>
    </div>
</section>
</template>

<script>
export default {
    data() {
        const columns = [{
                title: '币种对',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width: 100,
            },
            {
                title: '交易量',
                dataIndex: 'trade',
                key: 'trade',
                width: 150,
            },
            {
                title: '日涨跌',
                dataIndex: 'updn',
                key: 'updn',
            },
            {
                title: '价格趋势(3日)',
                dataIndex: 'price-flot',
                key: 'price-flot',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                scopedSlots: {
                    customRender: 'action'
                },
                width: 100,
                align: 'center',
            },
        ];
        return {
            trades: [],
            columns,
            markets: [],
        }
    },
    created() {
        this.getTradeData()
        this.getMarketData()
    },
    methods: {
        async getTradeData() {
            let data = await this.$http('/api/trade.json', {})
            this.trades = data
        },
        async getMarketData() {
            let data = await this.$http('/api/markets.json', {})
            this.markets = data
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
