const state = {
	cartItems: [] //Goods map that user has aded to cart, key - goods item id, value - quantity 
}
const mutations = {
	addCartItem({cartItems}, goodsItemId) {
		let quantity = 0, i = 0;
		//find index of cartItem and its current quantity
		while(i < cartItems.length) {
			if(cartItems[i].id === goodsItemId) {
				quantity = cartItems[i].quantity
				break;
			}
			i++;
		}
		//if not found index equals length of array, so item will be added to the end of array
		cartItems.splice(i, 1, {id: goodsItemId, quantity: quantity + 1})
	},
	deleteCartItem(state, goodsItemId) {
		state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== goodsItemId)
	},
	setCartItemQuantity(state, {goodsItemId, quantity}) {
		state.cartItems = state.cartItems.map((cartItem) => {
			if(cartItem.id == goodsItemId) {
				return {id: goodsItemId, quantity}
			} else {
				return cartItem
			}
		})
	}
}
const getters = {
	cartItemsMap({cartItems}) {
		 return cartItems.reduce((cartItemsMap, item) => {
			cartItemsMap[item.id] = item.quantity
			return cartItemsMap
		}, {}) 
	}
}
export default {
	state,
	mutations,
	getters
}