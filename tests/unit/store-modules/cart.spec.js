import { expect } from 'chai'
import cart from "@/store-modules/cart"

describe('cart store module', () => {
	const firstItemId = 0
	const secondItemId = 1

	const getDummyCartItems = () => [
		{
			id: firstItemId,
			quantity: 1
		},
		{ 
			id: secondItemId,
			quantity: 2
		}
	] 

	it('commits mutation addCartItem', () => {
		const state = {
			cartItems: []
		}
		cart.mutations.addCartItem(state, firstItemId)
		cart.mutations.addCartItem(state, secondItemId)
		cart.mutations.addCartItem(state, secondItemId)
		expect(state.cartItems).to.deep.equal(getDummyCartItems())
	})
	it('commits mutation setCartItemQuantity', () => {
		const state = {
			cartItems: getDummyCartItems()
		}
		cart.mutations.setCartItemQuantity(state, {goodsItemId: firstItemId, quantity: 99})
		expect(state.cartItems).to.deep.equal([
			{
				id: firstItemId,
				quantity: 99
			},
			{ 
				id: secondItemId,
				quantity: 2
			}
		])
	})
	it('commits mutation deleteCartItem', () => {
		const state = {
			cartItems: getDummyCartItems()
		}
		cart.mutations.deleteCartItem(state, secondItemId)
		expect(state.cartItems).to.deep.equal([
			{
				id: firstItemId,
				quantity: 1
			}
		])
	}),
	it('evaluates getter cartItemsMap', () => {
		const state = {
			cartItems: getDummyCartItems()
		}
		const cartItemsMap = cart.getters.cartItemsMap(state)
		expect(cartItemsMap).to.deep.equal({[firstItemId]: 1, [secondItemId]: 2})
	})
})