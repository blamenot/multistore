<template>
<div class="cart-item">
	<div class="cart-item-name">{{goodsItem.name}}</div>
	<div class="cart-item-attributes">
		<div class="cart-item-quantity">
			<input type="number" v-model.number="itemQuantity">
			<span  v-if="outOfStock" class="cart-warning">Товар заканчивается</span>
		</div>
		<div class="cart-item-price"><Price :usd="goodsItem.price"/> /шт</div>
		<div class="cart-item-delete"><button @click="deleteCartItem(goodsItem.id)">удалить</button></div>
	</div>
</div>
</template>

<style scoped>
.cart-item {
	display: block;
	width: 100%;
	position: relative;
	border-bottom: 1px solid #e2e2e2;
	color: #555;
	font-size: .9rem;
}
@media (min-width: 720px) {
	.cart-item {
		display: flex;
		align-items: center;
	}
	.cart-item-attributes {
		flex-shrink: 0;
	}
}
.cart-item:last-of-type {
	border: none;
}
.cart-item-name {
	flex-grow: 2;
	padding: 12px;
}
.cart-item-attributes {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
}
.cart-item-quantity {
	width: 5rem;
	flex-shrink: 0;
	text-align: center;
}
.cart-item-quantity input{
	width: 100%;
	box-sizing: border-box
}
.cart-item-price {
	width: 10rem;
	flex-shrink: 0;
	text-align: center;
}
.cart-item-delete {
	width: 5rem;
	flex-shrink: 0;
	text-align: right;	
}
.cart-warning {
	position: absolute;
	color: red;
	left: 36px;
	bottom: 0px;
	white-space: nowrap;
}
</style>


<script>
import Price from './price.vue'
import { mapMutations, mapState, mapGetters } from 'vuex';
const data = () => ({
	outOfStock: false
})
const methods = {
	...mapMutations(['deleteCartItem', 'setCartItemQuantity'])
}
const computed = {
	...mapGetters(['cartItemsMap']),
	/**
	 * Two way binding with the vuex value.
	 */
	itemQuantity: {
		get() {
			return this.cartItemsMap[this.goodsItem.id]
		},
		set(quantity) { // can not set to 0, use delete instead
			if(quantity){
				this.setCartItemQuantity({
					goodsItemId: this.goodsItem.id,
					quantity
				})
			}
		}
	}
}
const watch = {
	/**
	 * Limits maximum selected quantity
	 * Toggles outOfStock warning
	 * @param {Number} itemQuantity
	 */
	itemQuantity(itemQuantity) {
		if(itemQuantity > this.goodsItem.left) {
			this.itemQuantity = this.goodsItem.left
			this.outOfStock = true
		} else if(itemQuantity < this.goodsItem.left) {
			this.outOfStock = false
		}
	}
}
export default {
	components: {
		Price
	},
	props:['goodsItem'],
	data,
	methods,
	computed,
	watch
}
</script>
