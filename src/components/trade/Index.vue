<template>
<div v-if="ticker">
    <div class="trade-left-panel">
        <TradeList :listdata="wsallData[subscribes[4].method]" @getPairs="getPairs"></TradeList>
    </div>
    <div class="trade-center-panel">
        <Trading :klineData="wsallData[ticker][subscribes[3].method]" @changeInt="changeInt"></Trading>
    </div>
    <div class="trade-right-panel">
        <Dish :wsOfAllData="wsallData[ticker][subscribes[0].method]"></Dish>
        <List :listData="wsallData[ticker][subscribes[1].method]" :showColumns='["fortime", "price", "amount"]' :headers='["时间", "成交价", "成交量"]'></List>
    </div>
</div>
</template>

<script>
import TradeList from '@/components/trade/TradeList'
import Dish from '@/components/trade/Dish'
import List from '@/components/trade/comps/List'
import Trading from '@/components/trade/Trading'
export default {
    data() {
        return {
            wsUrl: 'wss://webws.gateio.live/v3/?v=866968',
            websock: null,
            subscribes: [{
                sub: "depth.subscribe",
                method: "depth.update"
            }, {
                sub: "trades.subscribe",
                method: "trades.update"
            }, {
                sub: "ticker.subscribe",
                method: "ticker.update"
            }, {
                sub: "kline.subscribe",
                method: "kline.update"
            }, {
                sub: "price.subscribe",
                method: "price.update",
            }],
            ticker: "",
            wsallData: {},
            id: 2282122,
            klineInterval: 3600, //1h
            alreadySub: [],
        }
    },
    created() {
        this.ticker = this.$route.params.id || ''
        if (this.ticker) {
            this.$set(this.wsallData, this.ticker, {})
            this.initWebSocket()
        } else {
            //404
        }

    },
    methods: {
        getPairs(pairs) {
            let action = {
                "id": this.id,
                "method": this.subscribes[4].sub,
                "params": pairs
            }
            if (this.websock && !this.alreadySub.includes(action.method)) {
                this.websocketsend(JSON.stringify(action))
                this.alreadySub.push(action.method)
            }
        },
        changeInt(interval) {
            this.klineInterval = interval //interval改变后无效
            let action = {
                "id": this.id,
                "method": this.subscribes[3].sub,
                "params": [this.ticker, this.klineInterval]
            }
            if (this.websock && !this.alreadySub.includes(action.method)) {
                this.websocketsend(JSON.stringify(action))
                this.alreadySub.push(action.method)
            }

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
                id: this.id,
                method: this.subscribes[0].sub,
                params: [this.ticker, 30, "0.0001"]
            }
            let action2 = {
                id: this.id,
                method: this.subscribes[1].sub,
                params: [this.ticker]
            }
            let action3 = {
                "id": this.id,
                "method": this.subscribes[2].sub,
                "params": [this.ticker]
            }
            this.websocketsend(JSON.stringify(actions))
            this.alreadySub.push(this.subscribes[0].sub)
            //this.websocketsend(JSON.stringify(action2))
            this.websocketsend(JSON.stringify(action3))
            this.alreadySub.push(this.subscribes[2].sub)
        },
        websocketonerror() { //连接建立失败重连
            console.log('连接失败，重新连接');
            this.initWebSocket();
        },
        websocketonmessage(e) { //数据接收
            const data = JSON.parse(e.data);
            if (data.method) {
                let method = data.method
                let ticker,
                    ticdata = {}
                switch (data.method) {
                    case this.subscribes[0].method:
                        ticker = data.params[2]
                        ticdata = data.params[1] || {
                            asks: [],
                            bids: []
                        }
                        ticdata.asks && ticdata.asks.forEach(dt => {
                            dt[1] = parseFloat(dt[1]).toFixed(3)
                            dt[2] = parseFloat(dt[0] * dt[1])
                        })
                        ticdata.bids && ticdata.bids.forEach(dt => {
                            dt[1] = parseFloat(dt[1]).toFixed(3)
                            dt[2] = parseFloat(dt[0] * dt[1])
                        })
                        break;
                    case this.subscribes[1].method:
                        //List
                        ticker = data.params[0]
                        ticdata = data.params[1] || []
                        ticdata && ticdata.forEach(dt => {
                            let date = new Date(dt.time * 1000)
                            dt.fortime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                        })
                        break;
                    case this.subscribes[2].method:
                        ticker = data.params[0]
                        ticdata = data.params[1] || []
                        break;
                    case this.subscribes[3].method:
                        let params = data.params[0]
                        ticker = params[7]
                        ticdata = {
                            time: parseInt(params[0] * 1000), //时间点
                            close: params[2],
                            open: params[1],
                            high: params[3],
                            low: params[4],
                            volume: parseFloat(params[5])
                        }
                        break;
                    case this.subscribes[4].method:
                        ticker = data.params[0]
                        ticdata = data.params[1]
                        ticdata.ticker = ticker
                        break;
                }
                if (data.method != this.subscribes[4].method) {
                    //无关ticker
                    ticker && ticdata && this.$set(this.wsallData[ticker], method, {}) && (this.wsallData[ticker][method] = ticdata)
                } else {
                    ticker && ticdata && this.$set(this.wsallData, method, {}) && (this.wsallData[method] = ticdata)
                }
            }
        },
        websocketsend(Data) { //数据发送
            this.websock.send(Data);
        },
        websocketclose(e) { //关闭
            console.log('断开连接', e);
        },
    },
    beforeDestroy() {
        this.websock.close()
        this.alreadySub = []
    },
    components: {
        Dish,
        List,
        Trading,
        TradeList,
    },
}
</script>

<style lang="scss" scoped>
.trade-center-panel {
    float: left;
    width: 740px;
}

.trade-right-panel {
    width: 260px;
    font-size: 12px;
    float: right;
}

.trade-left-panel {
    float: left;
    width: 250px;
}
</style>
