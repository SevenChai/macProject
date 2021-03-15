<template>
<keep-alive>
    <MarketTable v-if="curIndex < 3" :data="data" @deactiveEve="deactiveEve"></MarketTable>
    <MarketList v-else :data="data" @deactiveEve="deactiveEve"></MarketList>
</keep-alive>
</template>

<script>
import MarketTable from '@/components/index/market/MarketTable'
import MarketList from '@/components/index/market/MarketList'
export default {
    props: {
        curIndex: {
            required: true,
            type: Number,
            default: -1,
        },
        info: {
            required: true,
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    watch: {
        curIndex(newValue, oldValue) {
            //console.log('新index: ' + newValue)
        },
        info(newValue, oldValue) {
            console.log('新info: ' + JSON.stringify(newValue))
            this.getData(newValue)
        }
    },
    data() {
        return {
            data: {}
        }
    },
    created() {
        console.log('---------- inner market-index created ----------');
    },
    mounted() {
        console.log('---------- inner market-index mounted ----------');
    },
    beforeDestroy() {
        console.log('---------- inner market-index beforeDestroy ----------');
    },
    methods: {
        async getData(info) {
            if(info && info.url){
                let data = await this.$http(info.url, {})
                this.data = {data: data, title: this.info.text }
            }
        },
        deactiveEve(compname){
            console.log('market在切换', compname);
        }
    },
    components: {
        MarketTable,
        MarketList,
    },
}
</script>

<style lang="scss" scoped>

</style>
