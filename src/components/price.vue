<template>
<transition :name="transitionName" mode="out-in">
	<span :key="rate">{{priceInCurrency}}</span>
</transition>	
</template>

<style scoped>
@keyframes pulse-red {
	0% {
		background-color: none;
	}
	10% {
		background-color: #ffdddd;
	}
	100% {
		background-color: none;
	}
}
@keyframes pulse-green {
	0% {
		background-color: none;
	}
	10% {
		background-color: #ddffdd;
	}
	100% {
		background-color: none;
	}
}
.pulse-red-enter-active {
	animation: pulse-red 10s;
}
.pulse-green-enter-active {
	animation: pulse-green 10s;
}
</style>

<script>
import {mapState} from 'vuex'
const props = {
	usd: Number
}
const computed = {
	...mapState({
		rate: ({currency}) => currency.rate,
		suffix: ({currency}) => currency.suffix,
		rateComparer: ({currency}) => currency.rateComparer
	}),
	priceInCurrency() {
		return (this.usd * this.rate).toFixed(2) + ' ' + this.suffix
	},
	transitionName() {
		return this.rateComparer > 0 ? 'pulse-red' : 'pulse-green'
	}
}

export default {
	props,
	computed
}
</script>
