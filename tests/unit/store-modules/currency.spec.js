import { expect } from 'chai'
import sinon from 'sinon'
import currency from "@/store-modules/currency"

describe('currency store module', () => {
	const commit = sinon.spy()
	it('commits mutation setRate', () => {
		const state = {
			suffix: 'руб',
			rate: 25.1, 
			rateComparer: 0
		}
		currency.mutations.setRate(state, 26.1)
		expect(state.rate).to.equal(26.1)
		expect(state.rateComparer).to.equal(1)
		currency.mutations.setRate(state, 22.1)
		expect(state.rateComparer).to.equal(-1)
	})
	it('runs action randomizeRate', () => {
		currency.actions.randomizeRate({commit}, {min:1, max:1.1})
		expect(commit.lastCall.args[0]).to.equal('setRate')
		expect(commit.lastCall.args[1]).to.be.above(1)
		expect(commit.lastCall.args[1]).to.be.lessThan(1.1)
	})
})