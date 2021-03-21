<template>
<section id="topMarkets">
    <div class="text-center trade-title">
        <a-menu mode="horizontal" :defaultSelectedKeys="[1]" @click="changeMenu">
            <a-menu-item v-for="tra in trades" :key="tra.id">
                {{ tra.text }}
            </a-menu-item>
        </a-menu>
    </div>
    <div v-show="curIndex>-1">
        <MarketIndex :curIndex="curIndex" :info="trades[curIndex]" ></MarketIndex>
    </div>

    <div class="text-center">
        <a-button type="link">查看更多
            <a-icon type="right" />
        </a-button>
    </div>
</section>
</template>

<script>
import MarketIndex from '@/components/home/market/Index'
export default {
    data() {
        return {
            trades: [],
            curIndex: -1,
        }
    },
    created() {
        this.getTradeData()
    },
    methods: {
        async getTradeData() {
            let data = await this.$http('/api/trade.json', {})
            data && (data.length > 0) && (this.trades = data) && (this.curIndex = 0)
        },
        changeMenu(item) {
            this.curIndex = this.trades.findIndex(itm => itm.id == item.key)
        }
    },
    components: {
        MarketIndex,
    },
}
</script>

<style lang="scss" scoped>

</style>
