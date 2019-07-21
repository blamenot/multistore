const state = {
	suffix: 'руб', //currency abbreveation or symbol, displayd next to value 
	rate: 0, //exchange rate usd to selcected currency
	rateComparer: 0 //flag exposing wether rate increased or reduced, [-1, 0, 1]
}
const mutations = {
	setRate(state, rate) {
		//Compare rate with previous value and preserve the comparison result
		if(state.rate === 0 || state.rate === rate) {
			//case first run or rate did not change
			state.rateComparer = 0
		} else {
			//rate change so compare to previous value
			state.rateComparer = state.rate < rate ? 1 : -1 
		}
		//save new rate
		state.rate = rate
	}
}
const actions = {
	/**
	 * Generates random currency rate within bounds
	 * @param {Object} param0 state
	 * @param {Object} param1 rate max and min rate values
	 */
	randomizeRate({commit},{min, max}) {
		const rate = Math.random() * (max - min) + min
		commit('setRate', rate)
	}
}
export default {
	state,
	mutations,
	actions
}