<template>
  <section id="">
    <div id="slogan">Your gateway to cryptocurrency</div>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="24" class="text-center">
        <a-input-group compact size="large">
          <a-input
            class="web-orange-color"
            style="width: 300px"
            :addon-before="$t('indexPage.spend')"
            suffix="CNY"
            :value="inpMoney"
            @input="onInput($event)"
          />
          <a-input style="width: 100px" :disabled="true" :value="rateMoney" />
          <a-select
            class="no-left-border"
            :value="selValue"
            size="large"
            @change="changeRate"
          >
            <a-select-option
              v-for="op in options"
              :key="op.type"
              :value="op.type"
            >
              {{ op.type }}</a-select-option
            >
          </a-select>
          <a-button type="primary" size="large">
            {{ $t("indexPage.buy") }} BTC
          </a-button>
        </a-input-group>
      </a-col>
      <a-col :span="24" class="text-center" style="margin-top: 10px">
        <a-icon type="sound" />
        <span class="notice-wrap">
          <span> {{ $t("indexPage.notice") }}： </span>
          <span
            id="scrollNotice"
            @mouseenter="enterScroll"
            @mouseleave="leaveScroll"
            @mouseover="overScroll"
            @mouseout="outScroll"
            class="notice-body"
          >
            <span class="scroll-body">
              <span id="scrollTxt">
                <ul>
                  <li v-for="nt in noticeData" :key="nt.id">
                    {{ nt.text }}
                  </li>
                </ul>
              </span>
              <span id="txtEmp">
                <ul>
                  <li v-for="nt in noticeData" :key="nt.id">
                    {{ nt.text }}
                  </li>
                </ul>
              </span>
            </span>
          </span>
        </span>
        <a-button type="link">
          {{ $t("indexPage.more") }}
        </a-button>
      </a-col>
    </a-row>
    <div>
      <a-row type="flex" justify="center" align="top">
        <a-col :span="1"></a-col>
        <a-col :span="22">
          <a-carousel arrows :dots="false">
            <a-row :gutter="16" style="margin: 0px">
              <a-col
                v-for="adv in advDatas"
                :key="adv.id"
                class="gutter-row"
                :span="6"
              >
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
      <div class="position-middle" style="z-index: 3">
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
      options: [
        {
          type: "UTP",
          rate: 0.5,
        },
        {
          type: "USB",
          rate: 0.8,
        },
      ],
      selValue: "",
      inpMoney: "10000",
      rateMoney: "",
      noticeData: [],
      dbScrollWid: 0,
      scrollwrapWid: 0,
      translateX: 0,
      scrollEle: "",
      continueScroll: true,
    };
  },
  created() {
    this.calcuRate();
    this.getAdvData();
    this.getNoticeData();
  },
  methods: {
    calcuRate() {
      this.selValue = this.options[0].type;
      this.rateMoney = parseFloat(this.inpMoney) * this.options[0].rate;
    },
    async getAdvData() {
      let data = await this.$http("/api/advs.json", {});
      this.advDatas = data;
    },
    async getNoticeData() {
      let data = await this.$http("/api/index/notice.json", {});
      this.noticeData = data;
      if (this.noticeData.length > 0) {
        this.$nextTick(() => {
          this.scrollEle = document.querySelector("#scrollNotice .scroll-body");
          this.scrollNotice = document.querySelector(
            "#scrollNotice"
          ).clientWidth;
          this.dbScrollWid =
            document.querySelector("#scrollTxt").clientWidth * 2;
          this.beginScroll();
        });
      }
    },
    beginScroll(num=0) {
      if (this.continueScroll) {
        let translateX = num || this.translateX;
        setTimeout(() => {
          if (Math.abs(translateX) >= this.dbScrollWid - this.scrollNotice) {
            translateX = 0;
          }
          translateX -= 2;
          this.scrollEle.style.transform = "translateX(" + translateX + "px)";
          this.beginScroll(translateX);
        }, 100);
      }else{
        this.translateX = num;
      }
    },
    onInput(e) {
      let { value } = e.target;
      e.target.value = this.formatNum(value);
    },
    formatNum(value) {
      let repVal = "";
      if (!isNaN(value) && parseFloat(value) == 0 && value.indexOf(".") < 0) {
        //输入重复0
        repVal = "0";
      } else {
        let numReg = /[^(\-\d\.)]*/g;
        value = value.replace(numReg, ""); //非数字替换为空

        let fixReg = /\-?[0-9]*\.?[0-9]{0,2}/; //保留2位小数
        repVal = value.match(fixReg);
        repVal ? repVal : "";
      }
      return repVal;
    },
    changeRate(val) {
      let index = this.options.findIndex((op) => op.type == val);
      this.selValue = this.options[index].type;
      this.rateMoney = this.options[index].rate * parseFloat(this.inpMoney);
    },
    enterScroll(e) {
      this.continueScroll = false;
    },
    leaveScroll(e) {
      this.continueScroll = true;
      this.beginScroll(this.translateX);
    },
    overScroll(e) {
      //console.log("over");
    },
    outScroll(e) {
      //console.log("out");
    },
  },
  beforeDestroy() {
    this.continueScroll = false;
    //this.beginScroll = null;
    
    //this.scrollTimer = null;
  },
};
</script>

<style lang="scss" scoped>
/* ------- top section ------- */
.ant-input-group.ant-input-group-compact .ant-input-disabled {
  background-color: #fff;
}
.notice-wrap {
  display: inline-block;
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .notice-body {
    width: 300px;
    overflow: hidden;
  }
  .scroll-body {
    width: 8000%;
    line-height: 30px;
    left: 0px;
    > span {
      float: left;
    }
  }
  ul {
    display: inline;
    float: left;
    margin: 0;
    padding: 0;
    li {
      display: inline;
      margin: 0;
      padding: 0 5px;
      float: left;
      box-sizing: border-box;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
.no-left-border {
  .ant-select-selection {
    border: none;
    box-shadow: none;
  }
}
</style>
