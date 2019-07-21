<template>
<div @click="addCartItem(goodsItem.id)" class="goods-item">
	<div class="goods-item-name">{{goodsItem.name}} ({{goodsItem.left}})</div>
	<div class="goods-item-price"><Price :usd="goodsItem.price"/></div>
</div>
</template>

<style scoped>
.goods-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 12px 12px;
	border-top: solid 1px #e2e2e2;
	cursor: pointer;
	background-color: white;
	transition: background-color .5s ease;
	color: #555;
	font-size: .9rem;
}
.goods-item:hover {
	background-color: #e2e2e2;
}
.goods-item:first-of-type {
	border: none;
}
.goods-item-name {
	flex-grow: 1
}
.goods-item-price {
	min-width: 8em;
	text-align: center;
}
</style>

<script>
import {mapMutations} from 'vuex'
import Price from './price.vue'
export default {
	components: {
		Price
	},
	props:['goodsItem'],
	methods: mapMutations(['addCartItem'])
}
</script>
