<template>
<keep-alive>
    <component v-bind:is="curcomponent" :data="data" @deactiveEve="deactiveEve"></component>
    <!--
    <MarketTable v-if="curIndex < 3" :data="data" @deactiveEve="deactiveEve"></MarketTable>
    <MarketList v-else :data="data" @deactiveEve="deactiveEve"></MarketList>
    -->
</keep-alive>
</template>

<script>
import MarketTable from "@/components/index/market/MarketTable";
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
                return {};
            },
        },
    },
    watch: {
        curIndex(newValue, oldValue) {
            //console.log('新index: ' + newValue)
        },
        info(newValue, oldValue) {
            //console.log('新info: ' + JSON.stringify(newValue))
            this.getData(newValue);
        },
    },
    computed: {
        curcomponent() {
            if (this.curIndex == 0) return this.compNames[0];
            return this.compNames[1];
        },
    },
    data() {
        return {
            data: {},
            compNames: ["MarketTable", "MarketList"],
        };
    },
    methods: {
        async getData(info) {
            if (info && info.url) {
                if (this.curcomponent == this.compNames[0]) {
                    this.data = {
                        wsUrl: info.url,
                        title: this.info.text
                    }
                } else {
                    let data = await this.$http(info.url, {});
                    data && (this.data = {
                        data: data,
                        title: this.info.text
                    });
                }

            }
        },
        deactiveEve(compnasme) {
            if (this.curcomponent != this.compNames[0]) {
                this.data = {};
            }

        },
    },
    components: {
        MarketTable,
        MarketList: () => import("@/components/index/market/MarketList"),
    },
};
</script>

<style lang="scss" scoped>
</style>
