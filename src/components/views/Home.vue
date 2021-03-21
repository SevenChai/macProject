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
import TopSection from '@/components/home/TopSection'
import TopMarkets from '@/components/home/TopMarkets'
import Features from '@/components/home/Features'
import TradeGuide from '@/components/home/TradeGuide'

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
