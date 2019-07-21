import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import GoodsGroup from '@/components/goods-group.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('goods-item.vue', () => {
	//create store dummy for the component

	//create props dummy for the component
	const propsData = {
		goodsGroupName: 'test group name',
		goodsItems: {'itemId': 'dummy item'}
	}

	it('mounts correctly', () => {
		const wrapper = shallowMount(GoodsGroup, {
			localVue,
			propsData
		})
		expect(wrapper.text()).to.include(propsData.goodsGroupName)
		expect(wrapper.vm.goodsItems).to.exist
		expect(wrapper.vm.collapsed).to.equal(false)
	})
	it('colapses group items', () => {
		const wrapper = shallowMount(GoodsGroup, {
			localVue,
			propsData
		})
		wrapper.find('.goods-group-header').trigger('click')
		const goodsItemsEl = wrapper.find('.goods-items').element
		expect(goodsItemsEl.style.display).to.equal('none')
	})
})