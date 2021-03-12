<template>
<section id="Features">
    <h1>Gate.io Features</h1>
    <h2>
        <span>安全</span>
        <span>快捷</span>
        <span>稳定</span>
        <span>可靠</span>
    </h2>
    <a-row :gutter="16">
        <a-col :span="6" v-for="fea in features" :key="fea.id">
            <a-card hoverable>
                <div class="feature-box"></div>
                <a-card-meta :title="fea.title">
                    <template slot="description">{{ fea.desc }}</template>
                </a-card-meta>
            </a-card>
        </a-col>
    </a-row>
</section>
</template>

<script>
export default {
    data() {
        return {
            features: [],
        }
    },
    created() {
        this.getFeaData()
    },
    methods: {
        async getFeaData() {
            let data = await this.$http('/api/features.json', {})
            this.features = data
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
