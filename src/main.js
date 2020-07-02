import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import 'nprogress/nprogress.css'
import 'popper.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import './css/stylesheet.css';
import './css/animation.css'
import './css/fontello.css'
import 'datatables'
import 'jquery'
import 'bootstrap'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en';
import '@/styles/index.scss' // global css

import CKEditor from '@ckeditor/ckeditor5-vue'
Vue.use(CKEditor)

import Vuelidate from "vuelidate/src";// set element-ui default size
Vue.use(Vuelidate);

// convert date in this formate Feb 2020
import moment from 'moment'
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
    }
})

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Element from 'element-ui'
Vue.use(Element, {
    locale,
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
