<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <scroll class="content"
            ref="scroll">
      <cart-list/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll
    },
    computed: {
      /*cartLength() {
        return this.$store.getters.cartLength
      }*/
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
