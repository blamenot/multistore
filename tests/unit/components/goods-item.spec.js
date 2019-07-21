import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuex from "vuex"
import GoodsItem from '@/components/goods-item.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('goods-item.vue', () => {
	//create store dummy for the component
	const cart = {
		mutations: {
			addCartItem: sinon.spy()
		}
	}
	const store = new Vuex.Store({
		modules: {cart}
	})

	//create props dummy for the component
	const propsData = {
		goodsItem: {
			id: 0,
			name: 'test goods item name',
			left: 2,
			price: 88
		}
	}

	it('mounts correctly', () => {
		const wrapper = shallowMount(GoodsItem, {
			localVue,
			propsData,
			store
		})
		expect(wrapper.text()).to.include(propsData.goodsItem.name)
		expect(wrapper.text()).to.include(`(${propsData.goodsItem.left})`)
	})
	it('commits mutation addCartItem', () => {
		const wrapper = shallowMount(GoodsItem, {
			localVue,
			propsData,
			store
		})
		wrapper.find('.goods-item').trigger('click')
		expect(cart.mutations.addCartItem.called).to.be.true
	})
})