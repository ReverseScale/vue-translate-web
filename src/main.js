import Vue from "vue";
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/index.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI);

import CodeEditor from 'bin-code-editor';
Vue.use(CodeEditor);

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");