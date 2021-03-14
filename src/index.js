console.log("========index.js==========");
import Vue from "vue";
import Antd from 'ant-design-vue';
import VueI18n from 'vue-i18n'
import 'ant-design-vue/dist/antd.css';
import '@/assets/layout.scss';
import App from '@/App.vue';
import http from '@/assets/js/utils'

//antd
Vue.config.productionTip = false;
Vue.use(Antd);

//http
Vue.prototype.$http = http;


//i18n
Vue.use(VueI18n);
const i18n = new VueI18n({
locale: 'zh', // 定义默认语言为中文 
messages: {
    'zh': require('@/assets/languages/zh.json'),
    'en': require('@/assets/languages/en.json')
}
})

let vm = new Vue({
  i18n,
  el: "#app",
  render: h => h(App)
});
Vue.use(vm);
// console.log(vm.data) //undefined
// console.log(vdata === vm.data, vdata === vm.$data ) //false, true
//更改vm.$data
//添加属性
// vm.$data["newPro"] = "newPro"; //直接这样添加新属性会报错
// vm.$set(vdata, "newPro", "newPro"); //避免向一个Vue实例或根的data添加新的属性

//修改属性
vm.$data["username"] = "new-username";

setTimeout(() => {
  //删除属性, 直接删除并不会触发视图的更新
  //delete vm.$data.needDelPro;
  //避免向一个Vue实例或根的data添加新的属性
  //vm.$delete(vm.$data, "needDelPro")
  //console.log(vm.$data);
}, 3000);
