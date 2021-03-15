<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <Header @changeLocale="changeLocal"></Header>
      <Content></Content>
      <Footer></Footer>
    </a-layout>
  </a-config-provider>
</template>

<script>
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
//国际化
import zhCN from "ant-design-vue/es/locale-provider/zh_CN";
export default {
  components: {
    Header,
    Content,
    Footer,
  },
  data() {
    return {
      locale: zhCN,
    };
  },
  methods: {
    changeLocal(loc) {
      switch (loc) {
        case "cn":
          this.locale = zhCN;
          this.$i18n.locale = "zh";
          break;
        default:
          this.locale = null;
          this.$i18n.locale = "en";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
