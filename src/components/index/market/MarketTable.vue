<template>
<div>
    <p>{{ title }}</p>
    <a-table :columns="columns" :data-source="markets" :pagination="false" :rowKey="rowKey">
        <template v-slot:action>
            <a-button type="default">去交易</a-button>
        </template>
    </a-table>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
    },
    watch: {
        data(newValue, oldValue) {
            this.title = newValue.title || ""
            this.markets = newValue.data || []
        }
    },
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
            title: "",
            columns,
            markets: [],
        }
    },
    created() {
        console.log('---------- inner market-tabel created ----------');
    },
    mounted() {
        console.log('---------- inner market-tabel mounted ----------');
    },
    beforeDestroy() {
        console.log('---------- inner market-tabel beforeDestroy ----------');
    },
    deactivated(){
        this.$emit('deactiveEve', "table-deactive")
        console.log('---------- inner market-tabel deactivated ----------');
    },
    methods: {
        rowKey: record => {
            return record.name+record.key
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
