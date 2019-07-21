<template>
<div class="showcase">
	<GoodsGroup v-for="(goodsItems, goodsGroupName) in goodsGroups"
				:key="goodsGroupName"
				:goodsGroupName="goodsGroupName"
				:goodsItems="goodsItems"/>
</div>
</template>
<style scoped>
@media (min-width: 720px) {
	.showcase {
	column-count: 2;
}
}
.showcase:after {
	content:"";
	display:block;
	clear:both;
}
</style>

<script>
import GoodsGroup from './goods-group.vue'
import {mapState, mapGetters} from 'vuex'
import { setInterval } from 'timers';
function created() {
	const update = () => {
		this.$store.dispatch('randomizeRate', {min:20, max:80})
		this.$store.dispatch('fetchGoods')
	}
	update()
	this._updateTimerId = setInterval(update, 15000)
}
function destroyed() {
	clearInterval(this._updateTimerId)
}
const computed = {
	...mapState({
		loading: ({showcase}) => showcase.loading,
		error: ({showcase}) => showcase.error
	}),
	...mapGetters(['goodsGroups'])
}
export default {
	components: {
		GoodsGroup
	},
	created,
	destroyed,
	computed
}
</script>
