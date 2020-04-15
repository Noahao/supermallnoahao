<template>
  <div class="cart-list">
    <ul>
      <li v-for="item in cartList">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    computed: {
      ...mapGetters([
        'cartList'
      ])
    }
  }
</script>

<style scoped>

</style>
