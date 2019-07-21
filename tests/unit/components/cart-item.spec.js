import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuex from "vuex"
import CartItem from '@/components/cart-item.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('cart-item.vue', () => {
	//create store dummy for the component
	const cart = {
		mutations: {
			setCartItemQuantity: sinon.spy(),
			deleteCartItem: sinon.spy()
		},
		getters: {
			cartItemsMap: () => ({'0': 2})
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
			left: 5,
			price: 88
		}
	}

	it('mounts correctly', () => {
		const wrapper = shallowMount(CartItem, {
			localVue,
			propsData,
			store
		})
		expect(wrapper.text()).to.include(propsData.goodsItem.name)
		expect(wrapper.find('input').element.value).to.equal(String(cart.getters.cartItemsMap()[propsData.goodsItem.id]))
		expect(wrapper.vm.goodsItem.price).to.equal(propsData.goodsItem.price)
	})
	it('sets cart item quantity', () => {
		const wrapper = shallowMount(CartItem, {
			localVue,
			propsData,
			store
		})
		const quantityInput = wrapper.find('input')
		quantityInput.element.value = '1'
		quantityInput.trigger('input')
		expect(cart.mutations.setCartItemQuantity.lastCall.args[1])
			.to.deep.include({goodsItemId: propsData.goodsItem.id, quantity: 1})
	})
	it('limits cart item max quantity', (done) => {
		const wrapper = shallowMount(CartItem, {
			localVue,
			propsData,
			store
		})
		const quantityInput = wrapper.find('input')
		quantityInput.element.value = propsData.goodsItem.left + 1;
		quantityInput.trigger('input')
		quantityInput.trigger('change')
		setTimeout(() => {
			expect(cart.mutations.setCartItemQuantity.lastCall.args[1])
				.to.deep.include({goodsItemId: propsData.goodsItem.id, quantity: propsData.goodsItem.left+1})
			done();
		},0)
	})
	it('deletes cart item', () => {
		const wrapper = shallowMount(CartItem, {
			localVue,
			propsData,
			store
		})
		wrapper.find('button').trigger('click')
		expect(cart.mutations.deleteCartItem.lastCall.args[1]).to.equal(propsData.goodsItem.id)
	})
})
