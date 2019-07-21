import Vue from 'vue'
import Vuex from 'vuex'
import showcase from './store-modules/showcase'
import currency from './store-modules/currency'
import cart from './store-modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
	  showcase,
	  currency,
	  cart
  }
})
