<template>
<section id="">
    <div id="slogan">Your gateway to cryptocurrency</div>
    <a-row type="flex" justify="center" align="top">
        <a-col :span="24" class="text-center">
            <a-input-group compact size="large">
                <a-input class="web-orange-color" style="width: 300px" :addon-before="$t('indexPage.spend')" suffix="CNY" :value="inpMoney" @input="onInput($event)" />
                <a-input style="width: 100px" :disabled="true" :value="rateMoney" />
                <a-select class="no-left-border" :value="selValue" size="large" @change="changeRate">
                    <a-select-option v-for="op in options" :key="op.type" :value="op.type">
                        {{ op.type }}</a-select-option>
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
                <span id="scrollNotice" @mouseenter="enterScroll" @mouseleave="leaveScroll" @mouseover="overScroll" @mouseout="outScroll" class="notice-body">
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
        <section class="text-center">
            <!-- <p>
                <a-button @click="scrollDirection('left')">左</a-button>
                <a-button @click="scrollDirection('right')">右</a-button>
            </p> -->
            <div id="advWraps" :style="{width: advImgWidth*4 + 'px'}">
                <div class="adv-body">
                    <div id="advScrollBody">
                        <div id="oriAdvs">
                            <div class="gutter-row" v-for="adv in advDatas" :key="adv.id" :style="{width: advImgWidth+'px'}">
                                <img slot="cover" :alt="adv.alt" :src="adv.url" />
                            </div>
                        </div>
                        <div id="copAdvs">
                            <div class="gutter-row" v-for="adv in advDatas" :key="'copy'+ adv.id" :style="{width: advImgWidth+'px'}">
                                <img slot="cover" :alt="adv.alt" :src="adv.url" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div id="homeBg" class="text-center">
        <div>
            <div class="position-middle" style="z-index: 3">
                <i id="fmBtn">
                    <i class="icon">
                        <svg class="svgicon">
                            <use xlink:href="#gt_logo_icon">
                                <svg id="gt_logo_icon" viewBox="0 0 1024 1024">
                                    <path fill="#fff" d="M401.165333 503.920295l-8.891665-8.926406c-6.710346-6.710346-18.284322-2.011275-18.284322 7.551425v127.483777c0 5.850983 4.827061 10.678044 10.751181 10.678044h127.507546c9.498705 0 14.301996-11.515466 7.533141-18.229469-4.157855-4.159683-4.157855-10.910255 0-15.088222l135.633098-135.998785c4.161512-4.159683 4.161512-10.912083 0-15.097365l-12.354716-12.309005c-6.715831-6.704861-1.930824-18.222155 7.551425-18.222155h127.436237c5.893037 0 10.712784 4.785007 10.712784 10.678044v127.49109c0 9.496877-11.572147 14.267256-18.284321 7.553253l-8.606431-8.588146c-4.218193-4.285845-10.932196-4.285845-15.071766 0l-228.647272 228.554022c-4.156026 4.143227-10.908426 4.143227-15.121134 0L223.33202 511.691132a10.665245 10.665245 0 0 1 0-15.143075L610.601268 109.289779c4.145056-4.168825 4.145056-10.970593 0-15.122962L519.538032 3.112723a10.738382 10.738382 0 0 0-15.121134 0L3.115649 504.468825c-4.154198 4.168825-4.154198 10.970593 0 15.121134l501.301249 501.301249c4.156026 4.145056 10.979735 4.145056 15.121134 0L1020.820997 519.589959c4.143227-4.166997 4.143227-10.932196 0-15.088222l-294.922453-294.92611c-4.124943-4.150541-10.910255-4.150541-15.088222 0L416.332178 503.923952a10.65976 10.65976 0 0 1-15.13759 0l-0.003657-0.003657z"></path>
                                </svg>
                            </use>
                        </svg>
                    </i>
                    <div class="home-action">
                        <a-icon v-for="ic in iconActions" :key="ic.icon" :type="ic.icon" @mouseover="changeIconTitle(ic)" @mouseout="changeIconTitle"></a-icon>
                        <span class="icon-title text-center">{{ curIcon || "" }}</span>
                    </div>
                </i>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            advDatas: [],
            advImgWidth: 270,
            options: [{
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
            imgScrEle: "",
            imgTranslateX: 0,
            continueScroll: true,
            timer: null,
            iconActions: [{
                    icon: "alipay-circle",
                    title: "阿里支付"
                },
                {
                    icon: "github",
                    title: "github"
                },
                {
                    icon: "weibo-circle",
                    title: "微博账户"
                },
                {
                    icon: "aliwangwang",
                    title: "阿里旺旺"
                },
                {
                    icon: "phone",
                    title: "联系客服"
                },
            ],
            curIcon: "",
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
            if (this.advDatas.length > 4) {
                this.imgScrEle = document.querySelector("#advScrollBody")
                //this.scrollDirection()
            }
        },
        async getNoticeData() {
            let data = await this.$http("/api/index/notice.json", {});
            this.noticeData = data;
            if (this.noticeData.length > 0) {
                this.$nextTick(() => {
                    this.scrollEle = document.querySelector("#scrollNotice .scroll-body")
                    this.scrollNotice = document.querySelector(
                        "#scrollNotice"
                    ).clientWidth;
                    this.dbScrollWid =
                        document.querySelector("#scrollTxt").clientWidth * 2;
                    this.beginScroll();
                });
            }
        },
        beginScroll(num = 0) {
            if (this.continueScroll) {
                let translateX = num || this.translateX;
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    if (Math.abs(translateX) >= this.dbScrollWid - this.scrollNotice) {
                        translateX = 0;
                    }
                    translateX -= 1;
                    this.scrollEle.style.transform = "translateX(" + translateX + "px)";
                    this.beginScroll(translateX);
                }, 50);
            } else {
                this.translateX = num;
            }
        },
        scrollDirection(flag = 'left') {
            let distance = flag == 'left' ? -(this.advImgWidth * 4) : this.advImgWidth * 4
            this.imgScroll(distance)
        },
        imgScroll(distance) {
            let sum = 0,
                imgTranslateX = this.imgTranslateX || 0,
                disSum = 0;
            console.log(this.imgTranslateX, (this.advImgWidth * 8))
            if (this.imgTranslateX < (-this.advImgWidth * 4)) {
                let scrollInt = setInterval(() => {
                    if ((Math.abs(disSum)) < (this.advImgWidth * 4)) {
                        sum = distance > 0 ? this.advImgWidth : -this.advImgWidth
                        disSum += this.advImgWidth
                        imgTranslateX += sum
                        this.imgScrEle.style.transform = "translateX(" + imgTranslateX + "px)"
                        console.log(imgTranslateX)
                    } else {
                        this.imgTranslateX = imgTranslateX
                        console.log('结束滚动', imgTranslateX)
                        clearInterval(scrollInt)

                    }
                }, 100)
            } else {
                this.imgScrEle.style.transform = "translateX(0px)"
            }

        },
        onInput(e) {
            let {
                value
            } = e.target;
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
        changeIconTitle(ic) {
            this.curIcon = ic.title ? ic.title : ""
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
        this.timer = null;
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

        >span {
            float: left;
        }
    }

    ul {
        float: left;
        margin: 0;
        padding: 0;

        li {
            cursor: pointer;
            margin: 0;
            padding: 0 5px;
            float: left;
            box-sizing: border-box;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            list-style: none;
            &:hover {
                text-decoration: underline;
                color: rgba(255, 255, 255, 1)
            }
        }
    }
}

.gutter-row {
    display: inline-block;
    margin: 0;
    padding: 0 10px;
    width: 270px;
}

#advWraps {
    margin: 0 auto;
    overflow: hidden;

    .adv-body {
        width: 8000%;

        #advScrollBody {
            transform: translateX(0);

            &,
            #oriAdvs,
            #copAdvs {
                float: left;
            }
        }
    }
}

.gutter-row img {
    width: 100%;
    //width: 100px;
    height: 140px;
    position: relative;
    margin-top: 40px;
    cursor: pointer;

    &:hover {
        animation: mymove 0.5s forwards;
        -webkit-animation: mymove 0.5s forwards;
        /*Safari and Chrome*/
    }
}

#homeBg {
    width: 100%;
    position: relative;
    border-radius: 20px;
    margin-top: 60px;

    .position-middle {
        position: absolute;
        top: -40px;
        left: 0px;
        right: 0px;
        z-index: 2;
    }

    #fmBtn {
        position: relative;
        display: inline-block;
        height: 80px;
        width: 80px;
        margin: 0 auto 0;
        cursor: pointer;
        border-radius: 50%;

        .icon {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;

            .svgicon {
                display: inline-block;
                content: "";
                height: 100%;
                width: 100%;
                background: #26999e;
                color: #fff;
                border-radius: 50%;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                background-image: linear-gradient(45deg, #ff6db6, #ff8100);
            }
        }

        &:hover .icon .svgicon {
            transform: rotateZ(360deg);
            transition: all 0.5s;
        }

        .home-action {
            display: none;
            width: 400px;
            height: 180px;
            border-radius: 180px 180px 0px 0px;
            background: rgba(0, 0, 0, 0.5);
            bottom: 50%;
            left: 50%;
            position: absolute;
            margin-left: -200px;

            i {
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 40px;

                &:hover {
                    color: #26999e;
                }

                &:nth-child(2) {
                    left: 56px;
                    bottom: 100px;
                }

                &:nth-child(3) {
                    left: 175px;
                    bottom: 140px;
                }

                &:nth-child(4) {
                    left: 308px;
                    bottom: 100px;
                }

                &:nth-child(5) {
                    left: 357px;
                }
            }

            .icon-title {
                position: absolute;
                top: 50%;
                font-style: normal;
                left: 0;
                right: 0;
            }

        }

        &:hover .home-action {
            display: inline-block;
        }
    }
}
</style><style lang="scss">
.no-left-border {
    .ant-select-selection {
        border: none;
        box-shadow: none;
    }
}

@keyframes mymove {
    from {
        top: 0px;
    }

    to {
        top: -15px;
    }
}

@-webkit-keyframes mymove

/*Safari and Chrome*/
    {
    from {
        top: 0px;
    }

    to {
        top: -15px;
    }
}
</style>
