<template>
<div>
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
        data: {
            handler(newValue, oldValue) {
                this.title = newValue.title || ""
                this.wsUrl = newValue.wsUrl || []
            },
            immediate: true,
        },
        wsData: {
            handler(newValue, oldValue) {
                this.markets = [];
                this.ticker.forEach(itm => {
                    this.wsData[itm].name = itm
                    this.markets.push(this.wsData[itm])
                })
            },
            deep: true
        },
    },
    data() {
        const columns = [{
                title: '币种对',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: '价格',
                dataIndex: 'last',
                key: 'last',
                width: 150,
            },
            {
                title: '交易量',
                dataIndex: 'baseVolume',
                key: 'baseVolume',
                width: 250,
            },
            {
                title: '日涨跌',
                dataIndex: 'change',
                key: 'change',
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
            wsUrl: '',
            websock: null,
            methods: ["ticker.subscribe", "ticker.update"],
            ticker: ["BTC_USDT", "DOT_USDT", "ETH_USDT", "FIL_USDT", "GT_USDT", "LTC_USDT"],
            wsData: {},
        }
    },
    created() {
        console.log('---------- inner market-tabel created ----------');
        this.ticker.forEach(itm => this.$set(this.wsData, itm, {}))
        this.initWebSocket()
    },
    mounted() {
        console.log('---------- inner market-tabel mounted ----------');
    },
    beforeDestroy() {
        console.log('---------- inner market-tabel beforeDestroy ----------');
    },
    deactivated() {
        console.log('---------- inner market-tabel deactivated ----------');
       // this.websock.close()
        this.$emit('deactiveEve', "table-deactive")
    },
    methods: {
        rowKey: record => {
            return record.name
        },
        initWebSocket() { //初始化weosocket
            if ('WebSocket' in window) {
                this.websock = new WebSocket(this.wsUrl);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            } else {
                console.log('该浏览器不支持websocket')
            }
        },
        websocketonopen() { //连接建立之后执行send方法发送数据
            console.log('连接成功');
            let actions = {
                "id": 3428501,
                "method": this.methods[0],
                "params": this.ticker
            };
            this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror() { //连接建立失败重连
            console.log('连接失败，重新连接');
            this.initWebSocket();
        },
        websocketonmessage(e) { //数据接收
            const data = JSON.parse(e.data);
            if (data.method && (data.method == this.methods[1])) {
                if (data.params && data.params.length > 0) {
                    this.wsData[data.params[0]] = data.params[1]
                }
            }

        },
        websocketsend(Data) { //数据发送
            this.websock.send(Data);
        },
        websocketclose(e) { //关闭
            console.log('断开连接', e);
        },
        beforeDestroy() {
            this.websock.close()
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
