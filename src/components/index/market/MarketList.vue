<template>
  <div>
    <a-list size="small" bordered :data-source="listData">
      <a-list-item slot="renderItem" slot-scope="item">
        {{ item }}
      </a-list-item>
      <div slot="header">Header</div>
      <div slot="footer">Footer</div>
    </a-list>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue, oldValue) {
        this.title = newValue.title || "";
        this.listData = newValue.data || [];
      },
    },
  },
  data() {
    return {
      title: "",
      listData: [],
    };
  },
  created() {
    console.log("---------- inner market-list created ----------");
  },
  mounted() {
    console.log("---------- inner market-list mounted ----------");
  },
  beforeDestroy() {
    console.log("---------- inner market-list beforeDestroy ----------");
  },
  deactivated() {
    this.$emit("deactiveEve", "list-deactive");
    console.log("---------- inner market-list deactivated ----------");
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
