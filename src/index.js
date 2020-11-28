// JS
import './js/'

// SCSS
// import './assets/scss/main.scss'
// CSS
import './assets/css/main.css';
// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Vue.js
window.Vue = require('vue')

// Vue components (for use in html)
Vue.component('app-component', require('./js/components/App.vue').default)

// Vue init
const app = new Vue({
  el: '#app'
})
