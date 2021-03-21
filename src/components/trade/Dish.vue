<template>
<div>
    <!-- <div v-for="([wsk, wsv], index) in Object.entries(wsData)" :key="wsk+'-section'" :class="[wsk+'-section', 'trade-section']">
        <div v-if="index>0">最新价格：</div>
        <div class="trade-body">
            <div class="body-fixed">
                <div class="progress-wrap" v-for="dt in wsv" :key="wsk+dt[0]">
                    <div>
                        <span class="progress-bar" :style="{width: (100*parseFloat(dt[0]*dt[1]/bidsSum))+'%' }"></span>
                        <div>
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <span class="trade-num color-num">{{ parseFloat(dt[0]).toFixed(4) }}</span>
                                </a-col>
                                <a-col :span="8">
                                    <span class="trade-num text-right">{{ parseFloat(dt[1]).toFixed(3) }}</span>
                                </a-col>
                                <a-col :span="8">
                                    <span class="trade-num text-right">{{ parseFloat(dt[0]*dt[1]).toFixed(3) }}</span>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div v-for="([wsk, wsv]) in Object.entries(wsData)" :key="wsk+'-section'">
        <List 
        :class="[wsk+'-section', 'trade-section']" 
        :title="wsk"
        :listData="wsv" 
        :showColumns='[0, 1, 2]' 
        :headers='["价格", "数量", "总计"]'
        >
        </List>
    </div>

</div>
</template>

<script>
import List from '@/components/trade/comps/List'

function compare(prev, next) {
    return next[0] - prev[0]
}

function isInclude(arr, itm) {
    let narr = arr.map(a => a[0])
    //console.log(narr)
    return narr.includes(itm[0])
}
export default {
    props: {
        wsOfAllData: {
            type: Object,
            required: true,
            default: () => {
                return {
                    asks: [],
                    bids: []
                }
            }
        },
    },
    watch: {
        wsOfAllData: {
            handler(newValue, oldValue) {
                this.handleWsData()
            },
        }
    },
    data() {
        return {
            wsData: {
                asks: [],
                bids: [],
            },
            // asksSum: 0,
            // bidsSum: 0,
        }
    },
    methods: {
        handleWsData() {
            let ticker = '',
                ticdata = {
                    asks: this.wsOfAllData.asks ? this.wsOfAllData.asks : [],
                    bids: this.wsOfAllData.bids ? this.wsOfAllData.bids : [],
                }
            let asks = ticdata.asks.filter(dt => dt[1] > 0).map(dt => {
                dt[0] = parseFloat(dt[0]).toFixed(3)
                dt[1] = parseFloat(dt[1]).toFixed(3)
                return dt
            })
            let bids = ticdata.bids.filter(dt => dt[1] > 0).map(dt => {
                dt[0] = parseFloat(dt[0]).toFixed(3)
                dt[1] = parseFloat(dt[1]).toFixed(3)
                return dt
            })
            let oldasks = this.wsData.asks ? this.wsData.asks : []
            let oldbids = this.wsData.bids ? this.wsData.bids : []
            let nasks = asks.concat(oldasks).reduce((prev, cur) => isInclude(prev, cur) ? prev : [...prev, cur], []).sort(compare)
            let nbids = bids.concat(oldbids).reduce((prev, cur) => isInclude(prev, cur) ? prev : [...prev, cur], []).sort(compare)
            ticdata.asks = nasks
            ticdata.bids = nbids
            this.wsData = ticdata
            // this.asksSum = nasks.reduce((prev, cur) => parseFloat(cur[0] * cur[1] + prev), 0)
            // this.bidsSum = nbids.reduce((prev, cur) => parseFloat(cur[0] * cur[1] + prev), 0)
        },
    },
    components: {
        List,
    },
}
</script>

<style lang="scss" scoped>
.asks-section {
    position: relative;
}

.asks-section {
    .body-fixed {
        position: absolute;
        bottom: 0px;
    }
}
</style>
