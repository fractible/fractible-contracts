import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.dark.css';
import App from './App.vue'
import ContractsList from './components/ContractsList.vue'
import Home from './components/Home.vue'
import Settings from './components/Settings.vue'
import FactoriWallet from './components/FactoriWallet.vue'
import whitelist from './components/whitelist.vue'
import nft from './components/nft.vue'
import sales from './components/sales.vue'
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', name: 'SmartContrats', component: ContractsList },
    { path: '/wallet', name: 'FactoriWallet', component: FactoriWallet },
    { path: '/whitelist', name: 'whitelist', component: whitelist },
    { path: '/nft', name: 'nft', component: nft },
    { path: '/sales', name: 'sales', component: sales },
  ]
})
createApp(App).use(Antd).use(router).mount('#app')
