<template>
    <a-layout-header id="header">
      <div class="logo">
        <img :src="Logo" />
      </div>
      <div class="left-panel">
        <a-popover>
          <template slot="content">
            <PopPanel type="icon-inline" :data="siteData"></PopPanel>
          </template>
          <a-icon id="homeIcon" type="appstore" class="big-icon" />
        </a-popover>
        <span v-for="mu in menus" :key="mu.id">
          <span v-if="mu.more">
            <a-popover>
              <template slot="content">
                <a-row :gutter="16">
                  <a-col :span="8" v-for="mc in mu.children" :key="mc.name">
                    <h3 class="title">{{ mc.name }}</h3>
                    <PopPanel :data="mc.data"></PopPanel>
                  </a-col>
                </a-row>
              </template>
              <a-button type="link" :ghost="true">
                {{ mu.text }}
                <a-icon type="down" />
              </a-button>
            </a-popover>
          </span>
          <span v-else>
            <a-button type="link" :ghost="true">
              {{ mu.text }}
            </a-button>
          </span>
        </span>
      </div>
      <div class="right-panel">
        <keep-alive>
          <span v-if="isLogin">
            <a-icon type="user" class="big-icon" />
          </span>
          <span v-else>
            <a-button type="link" :ghost="true">登录</a-button>
            <a-button :ghost="true">注册</a-button>
          </span>
        </keep-alive>
        <span>
          <a-icon type="phone" class="big-icon" />
        </span>
        <span>
          <a-icon type="qrcode" class="big-icon" />
        </span>
        <span>
          <a-select
            label-in-value
            :default-value="{ key: 'cn' }"
            show-search
            placeholder="input"
            style="width: 80px"
            @change="changeLocale"
          >
            <a-select-option key="cn" value="cn"> 中文 </a-select-option>
            <a-select-option key="en" value="en"> English </a-select-option>
          </a-select>
        </span>
      </div>
    </a-layout-header>
</template>

<script>
import Logo from "@/assets/imgs/logo.png";
import PopPanel from "@/components/home/PopPanel";
export default {
  data() {
    return {
      menus: [],
      Logo,
      siteData: [],
      moreData: {},
      isLogin: false,
    };
  },
  created() {
    this.getMenuData();
    this.getSiteData();
  },
  methods: {
    async getMenuData() {
      /*this.$http('./api/menu.json',{}).then(data=>{
                console.log(data)
            })*/
      let data = await this.$http("./api/index/menu.json", {});
      this.menus = data;
    },
    async getSiteData() {
      let data = await this.$http("./api/index/site.json", {});
      this.siteData = data;
    },
    changeLocale(option) {
      this.$emit('changeLocale', option.key)
    },
  },
  components: {
    PopPanel,
  },
};
</script>

<style lang="scss" scoped>

@mixin nav-item {
  display: inline-block;
  padding: 0px 10px;
  margin: 0px 10px;
}
#header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: content-box;
  .logo {
    width: 120px;
    height: 31px;
    line-height: 31px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .ant-menu-horizontal {
    line-height: 64px;
  }
  .left-panel {
    float: left;
    > span {
      @include nav-item;
    }
  }
  .right-panel {
    float: right;
    > span {
      @include nav-item;
    }
  }
  #homeIcon {
    cursor: pointer;
    &:hover {
      color: #1890ff;
      transform: rotateZ(180deg);
      transition: all 0.5s;
    }
  }
}
</style>
