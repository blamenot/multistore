import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuex from "vuex"
import Cart from '@/components/cart.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('cart.vue', () => {
	//items for cart and goods list that would be in cart
	const firstItem = {
		id: 0,
		quantity: 2,
		name: 'test goods item zero',
		price: 77.7
	}
	const secondItem = {
		id: 1,
		quantity: 3,
		name: 'test goods item one',
		price: 88.8
	}

	//create store dummy for the component
	const cart = {
		state: {
			cartItems: [
				{
					id: firstItem.id,
					quantity: firstItem.quantity
				},
				{
					id: secondItem.id,
					quantity: secondItem.quantity
				}
			]
		},
		getters: {
			cartItemsMap: () => ({
				[firstItem.id]: firstItem.quantity,
				[secondItem.id]: secondItem.quantity 
			})
		}
	}

	const showcase = {
		getters: {
			processedGoods: () => [
				{
					id: firstItem.id,
					name: firstItem.name,
					price: firstItem.price
				},
				{
					id: secondItem.id,
					name: secondItem.name,
					price: secondItem.price
				}
			]
		}
	}
	const store = new Vuex.Store({
		modules: {cart, showcase}
	})
	
	it('mounts correctly', () => {
		const wrapper = shallowMount(Cart, {
			localVue,
			store
		})
		const inCartCost = firstItem.price * firstItem.quantity 
			+ secondItem.price * secondItem.quantity
		expect(wrapper.contains('.cart')).to.be.true
		expect(wrapper.vm.goodsItemsInCartCost).to.equal(inCartCost)
	})
})