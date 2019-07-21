import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuex from "vuex"
import Showcase from '@/components/showcase.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('showcase.vue', () => {
	//create store dummy for the component
	const showcase = {
		actions: {
			randomizeRate: sinon.spy(),
			fetchGoods: sinon.spy()
		}
	}
	const store = new Vuex.Store({
		modules: {showcase}
	})

	it('mounts correctly', () => {
		const wrapper = shallowMount(Showcase, {
			localVue,
			store
		})
		expect(wrapper.classes()).to.contain('showcase')
		expect(wrapper.vm._updateTimerId).to.exist
		expect(showcase.actions.randomizeRate.called).to.be.true;
		expect(showcase.actions.fetchGoods.called).to.be.true;
	})
})