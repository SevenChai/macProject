<template>
<div>
    <a-table tableLayout="fixed" class="no-border" :columns="columns" :data-source="markets" :pagination="false" :rowKey="rowKey">
        <span slot="name" slot-scope="name">
            {{ name }}
        </span>
        <span slot="close" slot-scope="close, record" :class="{'increase-color': record.change>0, 'decrease-color': record.change<0 }">
            {{ '$'+ close }}
        </span>
        <span slot="baseVolume" slot-scope="baseVolume, record" :class="{'increase-color': record.change>0, 'decrease-color': record.change<0 }">
            {{ '$'+baseVolume }}
        </span>
        <span slot="change" slot-scope="change" :class="{'increase-color': change>0, 'decrease-color': change<0 }">
            {{ change ? change>0 ? `+${change}%` : change+'%' : '' }}
        </span>
        <div slot="price-flot" slot-scope="text, record">
            <div :id="record.name+'Chart'" class="table-chart"></div>
        </div>
        <div slot="action" slot-scope="text, record">
            <a-button type="default" @click="goToTrade(record.name)">去交易</a-button>
        </div>
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
                //this.setCharts()
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
                scopedSlots: {
                    customRender: 'name'
                },
            },
            {
                title: '价格',
                dataIndex: 'close',
                key: 'close',
                width: 150,
                scopedSlots: {
                    customRender: 'close'
                },
            },
            {
                title: '交易量',
                dataIndex: 'baseVolume',
                key: 'baseVolume',
                width: 200,
                scopedSlots: {
                    customRender: 'baseVolume'
                },
            },
            {
                title: '日涨跌',
                dataIndex: 'change',
                key: 'change',
                scopedSlots: {
                    customRender: 'change'
                },
                width: 100,
            },
            {
                title: '价格趋势(3日)',
                dataIndex: 'period',
                key: 'period',
                align: 'center',
                scopedSlots: {
                    customRender: 'price-flot'
                },
                width: 300,
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
            ticker: ["GT_USDT", "BTC_USDT", "ETH_USDT", "DOT_USDT",  "FIL_USDT", "UNI_USDT"],
            wsData: {},
            charts: [],
            mockDatas: [
                [20, 10, 5, -10, -9, -30, 5, 18, 10, 20],
                [10, 20, 25, -7, -8, -10, 25, 28, 10, -10],
                [20, 10, 5, -8, -7, -20, 5, 8, 20, 19],
                [10, 20, 15, -9, -3, -10, 25, 8, 20, 15],
                [10, 30, 5, -5, -2, -10, 15, 8, 14, 10],
                [20, 50, 15, -4, -1, -20, 15, 8, 13, 10],
            ],
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
        this.websock.close()
        this.clearCharts()
    },
    activated() {
        this.initWebSocket()
    },
    deactivated() {
        console.log('---------- inner market-tabel deactivated ----------');
        // this.websock.close()
        //console.log(this.websock)
        if (this.websock) {
            this.websock.close()
        }
        this.$emit('deactiveEve', "table-deactive")
    },
    methods: {
        rowKey: record => {
            return record.name
        },
        initWebSocket() { //初始化weosocket
            if ('WebSocket' in window) {
                if (!this.websock || this.websock.readyState >= 2) {
                    this.websock = new WebSocket(this.wsUrl);
                    this.websock.onmessage = this.websocketonmessage;
                    this.websock.onopen = this.websocketonopen;
                    this.websock.onerror = this.websocketonerror;
                    this.websock.onclose = this.websocketclose;
                }

            } else {
                console.log('该浏览器不支持websocket')
            }
        },
        websocketonopen() { //连接建立之后执行send方法发送数据
            console.log('连接成功');
            let actions = {
                "id": 9937160,
                "method": this.methods[0],
                "params": this.ticker
            };
            this.websocketsend(JSON.stringify(actions));
            this.initCharts()

        },
        websocketonerror() { //连接建立失败重连
            console.log('连接失败，重新连接');
            this.initWebSocket();
        },
        websocketonmessage(e) { //数据接收
            const data = JSON.parse(e.data);
            if (data.method && (data.method == this.methods[1])) {
                if (data.params && data.params.length > 0) {
                    let trdata = data.params[1];
                    trdata.close = isNaN(parseFloat(trdata.close)) ? '-' : parseFloat(trdata.close).toFixed(2)
                    trdata.baseVolume = isNaN(parseFloat(trdata.baseVolume)) ? '-' : parseFloat(trdata.baseVolume).toFixed(2)
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
        initCharts() {
            if (this.charts.length == 0) {
                this.ticker.forEach(itm => {
                    let chart = this.$echarts.init(document.getElementById(itm + 'Chart'))
                    this.charts.push(chart)
                })
            }
            this.setCharts()
        },
        clearCharts() {
            if (this.charts.length > 0) {
                this.charts.forEach(chart => chart.clear());
                this.charts = [];
            }
        },
        setCharts() {
            setTimeout(() => {
                if (this.charts.length > 0) {
                    this.charts.forEach((chart, index) => {
                        let id = chart.getDom().id.slice(0, -5)
                        let trdata = this.wsData[id]
                        let sdata = [trdata.last, trdata.open, trdata.high, trdata.low, trdata.close]
                        sdata = this.mockDatas[index]
                        let option = {
                            grid: {
                                top: 'middle',
                                left: 'center',
                                width: '100%'
                            },
                            tooltip: {
                                show: false
                            },
                            xAxis: {
                                data: new Array(10),
                                axisLine: {
                                    show: false,
                                },
                                axisTick: {
                                    show: false,
                                },
                            },
                            yAxis: {
                                show: false
                            },
                            series: [{
                                type: 'line',
                                data: sdata,
                                areaStyle: {
                                    opacity: 0.3,
                                },
                                lineStyle: {
                                    width: 0.5,
                                },
                                symbol: 'none',
                                smooth: true,
                                label: {
                                    show: true,
                                }
                            }],
                            visualMap: [{
                                show: false,
                                type: 'piecewise',
                                pieces: [{
                                    gt: 0,
                                    lt: 10000,
                                    color: '#de596b'
                                }, {
                                    gt: -10000,
                                    lt: 0,
                                    color: '#007980'
                                }],
                                outOfRange: {
                                    color: '#999'
                                }
                            }],
                        }
                        chart.setOption(option, false, true)

                    })
                }
            }, 500)
        },
        goToTrade(name){
            this.$router.push('/trade/'+name)
        },
    },
}
</script>

<style lang="scss" scoped>
.increase-color {
    color: #de596b;
}

.decrease-color {
    color: #007980;
}

.table-chart {
    width: 300px;
    height: 50px;
    margin: 0 auto;
}
</style>
