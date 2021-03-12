<template>
<a-layout-content style="position: relative; ">
    <TopSection></TopSection>
    <section class="content">
        <div>
            <TopMarkets></TopMarkets>
            <Features></Features>
            <TradeGuide></TradeGuide>
        </div>
    </section>
</a-layout-content>
</template>

<script>
import TopSection from '@/components/index/TopSection'
import TopMarkets from '@/components/index/TopMarkets'
import Features from '@/components/index/Features'
import TradeGuide from '@/components/index/TradeGuide'

export default {
    components: {
        TopSection,
        TopMarkets,
        Features,
        TradeGuide,
    },
}
</script>

<style lang="scss" scoped>

</style>
