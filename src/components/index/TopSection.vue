<template>
<section id="">
    <div id="slogan">Your gateway to cryptocurrency</div>
    <a-row type="flex" justify="center" align="top">
        <a-col :span="24" class="text-center">
            <a-input-group compact size="large">
                <a-input style="width: 300px; " addon-before="花费" suffix="RMB" default-value="" />
                <a-select default-value="1" size="large">
                    <a-select-option value="1">
                        UTP
                    </a-select-option>
                    <a-select-option value="2">
                        USB
                    </a-select-option>
                </a-select>
                <a-button type="primary" size="large">
                    一键够买 BTC
                </a-button>
            </a-input-group>
        </a-col>
        <a-col :span="24" class="text-center" style="margin-top: 10px;">
            <a-icon type="sound" />
            <span>公告：Gate.io 上线 Venus (XVS) 杠杆交易和币币理财服务</span>
            <a-button type="link">
                more
            </a-button>
        </a-col>
    </a-row>
    <div>
        <a-row type="flex" justify="center" align="top">
            <a-col :span="1"></a-col>
            <a-col :span="22">
                <a-carousel arrows :dots="false">
                    <a-row :gutter="16" style="margin: 0px;">
                        <a-col v-for="adv in advDatas" :key="adv.id" class="gutter-row" :span="6">
                            <p>{{ adv.url }}</p>
                            <div class="gutter-box">
                                <a-card hoverable>
                                    <img slot="cover" :alt="adv.alt" :src="adv.url" />
                                </a-card>
                            </div>
                        </a-col>
                    </a-row>
                </a-carousel>
            </a-col>
            <a-col :span="1"></a-col>
        </a-row>
    </div>
    <div id="homeBg" class="text-center">
        <div class="position-middle" style="z-index: 3;">
            <i id="fmBtn">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#gt_logo_icon"></use>
                </svg>
            </i>
        </div>
        <div class="position-middle">
            <div class="home-action"></div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            advDatas: [],
            options: ['UTP'],
        }
    },
    created() {
        this.getAdvData()
    },
    methods: {
        async getAdvData() {
            let data = await this.$http('/api/advs.json', {})
            this.advDatas = data
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
