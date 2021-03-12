<template>
<div>
    <a-layout>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </a-layout>
</div>
</template>

<script>
import Header from '@/components/Header'
import Content from '@/components/Content'
import Footer from '@/components/Footer'
export default {
    components: {
        Header,
        Content,
        Footer,
    },

}
</script>

<style lang="scss" scoped>

</style>
