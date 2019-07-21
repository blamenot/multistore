import { expect } from 'chai'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import showcase from "@/store-modules/showcase"

describe('showcase store module', () => {
	const commit = sinon.spy()
	const dispatch = sinon.spy()
	const goodsItem = {
		id: 0,
		name: 'test item name',
		price: 158,
		left: 3,
		groupId: 1
	}
	const groupName = 'test group name'
	const dummyGoods = {
		"Error": "",
		"Id": 0,
		"Success": true,
		"Value": {
			"Goods": [
				{
					"B": false,
					"C": goodsItem.price,
					"CV": null,
					"G": goodsItem.groupId,
					"P": goodsItem.left,
					"Pl": null,
					"T": goodsItem.id
				}
			]
		}
	}
	window.store = {
		[goodsItem.groupId]: {
			"G": groupName,
			"B": {
				[goodsItem.id]: {
					"N": goodsItem.name,
					"T": 2
				}
			}
		}
	}

	it('runs action fetchGoods', async () => {
		fetchMock.get('/data.json', dummyGoods)
		await showcase.actions.fetchGoods({dispatch, commit})
		expect(commit.secondCall.args[0]).to.equal('setGoods')
		expect(commit.secondCall.args[1]).to.deep.equal(dummyGoods.Value.Goods)
		commit.resetHistory()
		fetchMock.restore()
	})
	it('evaluates getter processedGoods', () => {
		const processedGoods = showcase.getters.processedGoods({goods: dummyGoods.Value.Goods})
		expect(processedGoods).to.deep.equal([goodsItem])
	})
	it('evaluates getter goodsGroups', () => {
		const goodsGroups = showcase.getters.goodsGroups(null, {processedGoods:[goodsItem]})
		expect(goodsGroups).to.deep.equal({
			[groupName]: [goodsItem]
		})
	})
})