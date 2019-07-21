const state = {
	loading: true,
	error: '',
	goods: []
}
const mutations = {
	loading(state) {
		state.loading = true;
	},
	loaded(state) {
		state.loading = false;
	},
	setError(state, error) {
		state.error = error
	},
	setGoods(state, goods) {
		state.goods = goods;
	}
}
const actions = {
	/**
	 * Fetching data from server.
	 * @param {Object} param0 state
	 */
	async fetchGoods({dispatch, commit}) {
		commit('loading');
		try {
			const response = await fetch('/data.json')
			const data = await response.json()
			if(data.Error) {
				throw Error(data.Error)
			}
			commit('setGoods', data.Value.Goods)
		} catch(e) {
			commit('setError', e.toString())
		}
		commit('loaded')
	}
}
const getters = {
	/**
	 * Filters nescessary props and adds name to fetched goods items
	 * @param {Object} param0 state
	 * @return {Array} processed goods
	 */
	processedGoods({goods}) {
		return goods.map(item => ({
			id: item.T,
			name: window.store[item.G].B[item.T].N,
			price: item.C,
			left: item.P,
			groupId: item.G
		}))
	},
	/**
	 * Groups items into group.
	 * @param {Object} state 
	 * @param {Object} param1 getters
	 * @return {Object} map of goods groups
	 */
	goodsGroups(state, {processedGoods}) {
		const goodsGroups = {}
		processedGoods.forEach(item => {
			const group = window.store[item.groupId].G
			if(!goodsGroups[group]) {
				goodsGroups[group] = [item]
			} else {
				goodsGroups[group].push(item)
			}
		})
		return goodsGroups
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}