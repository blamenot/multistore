<template>
<div>
	<div class="cart">
		<div class="cart-header">
			<div class="cart-item-name">
				<span class="cart-header-name-wide">Наименование товара и описание</span>
				<span class="cart-header-name-narrow">Корзина</span>
			</div>
			<div class="cart-item-quantity">Количество</div>
			<div class="cart-item-price">Цена</div>
			<div class="cart-item-delete"></div>
		</div>
		<transition-group name="cart" tag="div">
			<CartItem v-for="goodsItem in goodsItemsInCart"
					:key="goodsItem.id"
					:goodsItem="goodsItem"/>
		</transition-group>
	</div>
	<div v-if="!goodsItemsInCart.length" class="cart-empty" >
		Корзина пуста
	</div>
	<div class="cart-cost">
		Общая стоимость: <b><Price class="cart-cost-value" :usd="goodsItemsInCartCost"/></b>
	</div>
</div>
</template>
<style scoped>
.cart {
	width: calc(100% - 24px);
	border-radius: 4px;
	overflow: hidden;
	margin: 12px;
	background-color: white;
}
.cart-header {
	display: flex;
	background-color: #356a8e;
	color: white;
	padding: 12px;

}
.cart-header-name-narrow {
	display: none;
}
@media (max-width: 719px) {
	.cart-header-name-wide {
		display: none;
	}
	.cart-header-name-narrow {
		display: inline;
	}
	.cart-item-name {
		text-align: center;
	}
	.cart-item-quantity, .cart-item-price, .cart-item-delete {
		display: none;
	}
}

.cart-item-name {
	flex-grow: 1;
}
.cart-item-quantity {
	width: 5rem;
	text-align: center;
}
.cart-item-price {
	width: 10rem;
	text-align: center;
}
.cart-item-delete {
	width: 5rem;
}
.cart-empty {
	text-align: center;
	color: white;
	padding: 6px 12px;
}
.cart-cost {
	padding: 12px;
	text-align: right;
	color: white;
}
.cart-cost-value {
	color: #f4b350;
}
.cart-enter-active, .cart-leave-active {
  transition: opacity .3s;
}
.cart-enter, .cart-leave-to{
	opacity: 0;
}
</style>
<script>
import { mapGetters, mapState } from 'vuex';
import CartItem from './cart-item.vue'
import Price from './price.vue'
const computed = {
	...mapGetters(['processedGoods', 'cartItemsMap']),
	...mapState({
		cartItems: ({cart}) => cart.cartItems
	}),
	goodsItemsInCart() {
		//find all picked goods items
		return this.cartItems.map(cartItem => {
			return this.processedGoods.filter(goodsItem => cartItem.id === goodsItem.id)[0]
		})
	},
	goodsItemsInCartCost() {
		return this.goodsItemsInCart.reduce((cost, goodsItem) => {
			const quantity = this.cartItemsMap[goodsItem.id]
			return cost + goodsItem.price * quantity
		}, 0)
	}
}
export default {
	components: {
		CartItem,
		Price
	},
	computed
}
</script>

