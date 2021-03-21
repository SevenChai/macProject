<template>
<div>
    <div class="trade-section">
        <div v-if="title!='bids'" class="trade-header">
            <a-row>
                <a-col :span="8"><span>{{ headers[0] || "" }}</span></a-col>
                <a-col :span="8" class="text-right"><span>{{ headers[1] || "" }}</span></a-col>
                <a-col :span="8" class="text-right"><span>{{ headers[2] || "" }}</span></a-col>
            </a-row>
        </div>
        <div class="trade-body">
            <div class="body-fixed">
                <div class="progress-wrap" v-for="dt in data" :key="dt.id">
                    <div>
                        <span v-if="title" class="progress-bar" :style="{width: (100*parseFloat(dt[2]/sum))+'%' }"></span>
                        <div>
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <span class="trade-num color-num">{{ dt[showColumns[0]] || '' }}</span>
                                </a-col>
                                <a-col :span="8">
                                    <span class="trade-num text-right">{{ dt[showColumns[1]] || '' }}</span>
                                </a-col>
                                <a-col :span="8">
                                    <span class="trade-num text-right">{{ parseFloat(dt[showColumns[2]]).toFixed(3) || '' }}</span>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        listData: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        showColumns: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        headers: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        title: {
            type: String,
            default: ""
        },
    },
    watch: {
        listData: {
            handler(newValue, oldValue) {
                this.handleData()
            },
            //deep: true,
        },
    },
    data() {
        return {
            data: [],
            sum: 0,
        }
    },
    methods: {
        handleData() {
            this.data = this.listData.concat(this.data)
            this.data.length > 20 ? this.data.splice(20) : []
            this.asksSum = 0
            if (this.title == 'asks' || this.title == 'bids') {
                this.sum = this.data.reduce((prev, cur) => parseFloat(cur[0] * cur[1] + prev), 0)
            }
        },
    },
}
</script>

<style lang="scss">
.trade-section {
    width: 100%;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;

    span {
        display: inline-block;
        width: 80px;
        padding-right: 10px;
        font-weight: bold;
    }

    .trade-header {}

    .trade-body {
        height: 260px;
        overflow: hidden;
        border-top: 1px solid #888;
        border-bottom: 1px solid #888;

        .body-fixed {
            height: 260px;
            overflow-y: scroll;

            .progress-wrap {
                position: relative;
                margin-bottom: 5px;

                .progress-bar {
                    display: inline-block;
                    height: 20px;
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
}
</style>
