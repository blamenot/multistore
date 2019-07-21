<template>
  <div id="app">
	  <Showcase />
	  <Cart />
  </div>
</template>

<script>
import Showcase from './components/showcase.vue'
import Cart from './components/cart.vue'

export default {
  name: 'app',
  components: {
	  Showcase,
	  Cart
  }
}
</script>
