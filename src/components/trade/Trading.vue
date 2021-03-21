<template>
<div>
    <div id="trading-chart" style="width: 740px; height: 400px;"></div>
</div>
</template>

<script>
export default {
    props: {
        klineData: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    watch: {
        klineData: {
            handler(newValue, oldValue) {
                this.updater = true
                console.log(this.chartData[this.chartData.length - 1], newValue)
            },
            deep: true
        },
    },
    created() {
        let changes = this.$route.params.id
        this.ticker = changes
    },
    mounted() {
        if (this.ticker) {
            let changes = this.ticker.split('_')
            this.changeName = changes[0]
            this.symbolName = changes[1]
            console.log(this.changeName)
            //初始化chart
            this.feed = this.createFeed()
            this.initChart()
        }
    },
    data() {
        return {
            ticker: "",
            chart: null,
            feed: null, //提供图表调用的方法，属于数据交互的接口
            updater: false, //数据触发器，数据变化时，通知tradingview渲染
            chartData: [],
            changeName: '',
            symbolName: '',
        }
    },
    methods: {
        createFeed() {
            let Datafeed = {}
            const this_vue = this
            Datafeed.Container = function (updateFrequency) {
                this._configuration = {
                    supports_search: true,
                    supports_group_request: false,
                    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
                    supports_marks: false,
                    supports_timescale_marks: false,
                }

            }
            Datafeed.Container.prototype.onReady = function (callback) {
                console.log('-------- ready ----------')
                if (this._configuration) {
                    setTimeout(() => callback(this._configuration), 0)
                } else {
                    this.on('configuration_ready', () => {
                        callback(that._configuration)
                    })
                }
            }
            Datafeed.Container.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
                console.log('-------- resolveSymbol ----------')
                Promise.resolve().then(() => {
                    function adjustPrice() {
                        return 1000
                    }
                    onSymbolResolvedCallback({
                        "name": this_vue.symbolName,
                        "ticker": this_vue.symbolName,
                        "description": "",
                        "session": "24x7",
                        "type": "crypto",
                        "exchange-traded": this_vue.changeName,
                        "exchange-listed": this_vue.changeName,
                        "has_intraday": true, //商品是否具有日内（分钟）历史数据
                        "intraday_multipliers": ['1', '60'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                        "has_weekly_and_monthly": false,
                        "has_no_volume": false,
                        "regular_session": "24x7",
                        "pricescale": adjustPrice(),
                        "volumn_precision": 8,//小数点位数
                        "data_status": "streaming", //实时
                        "timezone": "Asia/Shanghai",
                        "minmov": 1,
                    })
                })

            }
            Datafeed.Container.prototype.getBars = async function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
                console.log('-------- getBars ----------')

                let res = resolution.match(/[0-9]*/)[0] || 0,
                    resTab = resolution.match(/[a-z]/g) || '';
                switch (resTab.toLowerCase()) {
                    case "d":
                        res *= 86400 //1天
                        break;
                    case "w":
                        res *= 604800
                        break;
                    case "m":
                        res *= 2592000
                        break;
                    default:
                        res *= 60 //1分钟
                }
                //回调给ws
                this_vue.$emit('changeInt', res)
                //异步请求数据
                let qsurl = `?type=tvkline&symbol=gt_usdt&from=${ from }&to=${ to }&interval=${res}`
                let datas = await this_vue.$http('/gate/query/' + qsurl, {
                    contenttype: "text"
                })
                let ndatas = datas && datas.toString().split(/[\s\n]/)
                let bars = []
                ndatas && ndatas.forEach((dt, index) => {
                    let arr = dt.split(',')
                    if (index > 0 && index < ndatas.length - 1) {
                        bars.push({
                            time: parseInt(arr[0]), //时间点
                            close: arr[4],
                            open: arr[1],
                            high: arr[2],
                            low: arr[3],
                            volume: parseFloat(arr[5])
                        })
                    }
                })

                /*
                let jsons = await this_vue.$http('/api/trade/history.json', {})
                bars = []
                bars = jsons.t.map((t, index) => {
                    console.log(t)
                    return {
                        time: t * 1000, //时间点
                        close: jsons.c[index],
                        open: jsons.o[index],
                        high: jsons.h[index],
                        low: jsons.l[index],
                        volume: jsons.v[index]
                    }
                })*/

                this_vue.chartData = bars
                if (bars.length) {
                    onHistoryCallback(bars, {
                        noData: false
                    })
                } else {
                    onHistoryCallback([], {
                        noData: true
                    })
                }
            }
            Datafeed.Container.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
                console.log('------- subscribeBars -------', resolution)
                console.log('=======XXXXXXXXXXXXXXX=========')
                //this_vue.updater = onRealtimeCallback
                setInterval(() => {
                    if (this_vue.updater) {
                        console.log('实时数据修改')
                        this_vue.updater = false
                        if (this_vue.chartData[this_vue.chartData.length - 1].time == this_vue.klineData.time) {
                            this_vue.chartData[this_vue.chartData.length - 1] = this_vue.klineData
                        } else {
                            this_vue.chartData.push(this_vue.chartData)
                        }
                        onRealtimeCallback(this_vue.klineData)
                    }
                    //onRealtimeCallback(this_vue.klineData) && ()
                }, 1 * 1000)

            }
            Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID) {}
            return new Datafeed.Container()
        },
        initChart() {
            this.chart = new TradingView.widget({
                library_path: 'static/custom_scripts/chart_main/', //依赖包的地址
                locale: "zh", //本地化, zh：简体中文
                symbol: this.changeName + ':' + this.symbolName, //商品
                interval: '60', //周期
                timezone: "Asia/Shanghai", //UTC世界标准时间
                container_id: "trading-chart", //图表id
                width: 740,
                height: 460,
                fullscreen: false, //图表是否占用窗口中所有可用的空间
                autosize: false, //图表是否应使用窗格中的所有可用空间,并在调整窗格本身大小时自动调整大小
                symbol_search_request_delay: 1000, //延迟搜索(ms)
                auto_save_delay: 5, //延迟等待
                toolbar_bg: '#fff', //背景板颜色
                custom_css_url: 'css/customer_trading.css', //自定义css
                //图表底部的时间范围选择器
                time_frames: [{
                        text: "1d",
                        resolution: "1d",
                        description: "1天"
                    },
                    {
                        text: "1week",
                        resolution: "1week",
                        description: "1周"
                    },
                    {
                        text: "1m",
                        resolution: "1m",
                        description: "1月"
                    },
                ],
                //load_last_chart: true, //图表加载用户上次保存的图表
                loading_screen: {
                    backgroundColor: "#fff" //加载时的背景颜色
                }, //定制加载进度条
                debug: false,
                charts_storage_api_version: "1.1",
                numeric_formatting: {
                    decimal_sign: "."
                }, //小数点
                customFormatters: {
                    timeFormatter: {
                        format: function (date) {
                            var _format_str = '%h:%m';
                            return _format_str.replace('%h', date.getHours(), 2).replace('%m', date.getMinutes(), 2).replace('%s', date.getSeconds(), 2);
                        }
                    },
                    dateFormatter: {
                        format: function (date) {
                            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
                        }
                    }
                },
                datafeed: this.feed,
                favorites: {
                    //intervals: ["1D", "5D", "3W", "1W", "1M"], //？？？无效
                    //chartTypes: ["Area", "Line"] //工具栏顶部线图，面积图
                },
                client_id: 'test',
                user_id: 'public_user_id',
                theme: "Light",
                overrides: {
                    "paneProperties.background": "#fff", //canvas背景色
                    "paneProperties.vertGridProperties.color": "#fff", //竖线刻度线颜色
                    "paneProperties.horzGridProperties.color": "#fff", //横线刻度颜色
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#555", //时间标签颜色
                    "mainSeriesProperties.candleStyle.wickUpColor": '#007980', //绿色bar的线的颜色
                    "mainSeriesProperties.candleStyle.wickDownColor": '#de596b', //红色bar的线的颜色
                },
                studies_overrides: {
                    "volume.volume.color.0": "#007980", //交易量
                    "volume.volume.color.1": "#de596b",
                    "volume.volume.transparency": 100, //透明度
                    //"volume.show ma": true, //volumn的last n/a
                    //"volume.volume ma.linewidth": 25,
                    "volume.volume ma.color": "#fff",
                    "volume.volume ma.transparency": 10,
                    "bollinger bands.median.color": "#f00", //?
                    "bollinger bands.upper.linewidth": 7, //?
                    // 
                    // 
                },
                disabled_features: [
                    "timeframes_toolbar", //底部栏
                    "header_symbol_search", //搜索框
                    "header_interval_dialog_button", //左上交[三个点]变更周期
                    "header_compare", //平衡称的图标
                    "header_settings",
                    "header_screenshot", //快照
                    "header_undo_redo",
                    "adaptive_logo",
                    "hide_last_na_study_output",
                ],
                enabled_features: [
                    "left_toolbar", //绘图左侧栏
                    "control_bar", //半隐藏向左向右，刷新

                ],
                /*
                disabled_features: [
                    "header_symbol_search", //搜索框
                    "header_interval_dialog_button", //左上交[三个点]变更周期
                    //"study_dialog_search_control", //?
                    //"symbol_info", //?
                    "go_to_date", //底部[前往到]
                    "adaptive_logo",
                    //"show_interval_dialog_on_key_press",//
                    //"border_around_the_chart",

                    //????
                    "symbol_search_hot_key",
                    "display_market_status",
                    "main_series_scale_menu",
                    "star_some_intervals_by_default",
                    "datasource_copypaste",
                    "right_bar_stays_on_scroll",
                    "context_menus",
                    "timezone_menu",
                    //"header_resolutions",//todo: przetestowac
                    //"edit_buttons_in_legend",//todo: przetestowac
                    "remove_library_container_border",

                ],
                enabled_features: [
                    "control_bar",
                    "left_toolbar",//没有
                ],
                */
            });
        },
        loopTicker() {

        }
    },
}
</script>

<style scoped>

</style>
