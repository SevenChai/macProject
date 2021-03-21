<template>
<div class="trade-content">
    <Index></Index>
</div>
</template>

<script>
import Index from '@/components/trade/Index'
export default {
    components: {
        Index,
    },
}
</script>

<style lang="scss" scoped>
    .trade-content{
        background-color: #fff;
        color: rgba(0,0,0,.85);
    }
</style>
