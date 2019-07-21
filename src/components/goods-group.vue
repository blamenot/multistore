<template>
<div class="goods-group-wrapper">
	<div class="goods-group">
		<div class="goods-group-header"
				@click="collapsed = !collapsed">
			<span>{{goodsGroupName}}</span>
			<span class="goods-group-header-tik" :class="{collapsed: collapsed}">
				&#10094;
			</span>
		</div>
		<transition name="slide">
			<div class="goods-items" v-show="!collapsed">
				<GoodsItem v-for="goodsItem in goodsItems" 
							:key="goodsItem.id"
							:goodsItem="goodsItem"/>
			</div>
		</transition>
	</div>
</div>
</template>

<style scoped>
.goods-group-wrapper {
	box-sizing: border-box;
	vertical-align: top;
	padding: 12px;
	width: 100%;
	page-break-inside: avoid;
    break-inside: avoid-column;
}
.goods-group {
	overflow: hidden;
	border-radius: 4px;
}
.goods-group-header {
	display: flex;
	justify-content: space-between;
	background-color: #4981a7;
	transition: background-color .3s ease;
	color: white;
	padding: 12px;
	cursor: pointer;
}
.goods-group-header:hover {
	background-color: #356a8e;
}
.goods-group-header-tik {
	display: inline-block;
	transform: rotate(-90deg);
	transition: transform .3s;
}
.goods-group-header-tik.collapsed {
	transform: rotate(0)
}
.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>

<script>
import GoodsItem from './goods-item.vue'
const data = () => ({
	collapsed: false
})
export default {
	data,
	components: {
		GoodsItem
	},
	props: ['goodsGroupName','goodsItems']
}
</script>
