<template>
<div class="trade-list">
    <ul>
        <li v-for="pair in pairs" :key="pair" v-show="pairData[pair]">
            {{ pairData[pair] }}
            <!-- <a-row>
                <a-col v-for="(key, value) in  Object.entries(pairData[pair])" :key="pair+key">
                    {{ value }}
                </a-col>
            </a-row> -->
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        listdata: {
            type: Object,
            default: () => {
                return {}
            },
            required: true,
        },
    },
    watch: {
        listdata: {
            handler(newValue, oldValue) {
                if (newValue) {
                    newValue.ticker && (this.pairData[newValue.ticker] = newValue)
                }

            },
            deep: true
        }
    },
    data() {
        return {
            pairs: [],
            pairData: {},
        }
    },
    created() {
        this.getAllPairs()
    },
    methods: {
        async getAllPairs() {
            let data = await this.$https.post('/gate/query?u=23', {
                type: 'get_all_market_pairs'
            })
            if (data.data && data.data.contract) {
                let allPairs = []
                this.pairs = []
                data.data.contract && data.data.contract.forEach(pair => {
                    allPairs.push(pair.pair)
                    this.$set(this.pairData, pair.pair, null)
                })
                this.pairs = allPairs
                this.$emit('getPairs', allPairs)
            }

        },
    },
}
</script>

<style lang="scss" scoped>
.trade-list {
    height: 900px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 10px;

}
</style>
