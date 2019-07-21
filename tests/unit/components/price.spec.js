import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import Price from '@/components/price.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('price.vue', () => {
	//create store dummy for the component
	const currency = {
		state: {
			suffix: 'руб',
			rate: 55,
			rateComparer: 1
		}
	}
	const store = new Vuex.Store({
		modules: {currency}
	})

	//create props dummy for the component
	const propsData = {
		usd: 999.999
	}

	it('renders correct price in rubles', () => {
		const wrapper = shallowMount(Price, {
			localVue,
			propsData,
			store
		})
		const expectedPrice = (propsData.usd * currency.state.rate).toFixed(2);
		expect(wrapper.text()).to.include(expectedPrice)
		expect(wrapper.text()).to.include(currency.state.suffix)
  })
})
