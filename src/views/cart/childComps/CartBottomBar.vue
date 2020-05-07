<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isChecked" @click.native="checkButtonClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { debounce } from 'common/utils'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    // activated() {
    //   let judge = this.$store.state.cartList
    //   let a = []
    //   for(let i of judge) {
    //     a.push(i.checked)
    //   }
    //   if(a.indexOf(false) === -1 && judge.length !== 0) {
    //     this.isActive = true
    //   } else {
    //     this.isActive = false
    //   }
    // },
    computed: {
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        let cartItem = this.$store.state.cartList.filter(item => item.checked)
        let count = 0
        for(let item of cartItem) {
          count += item.count
        }
        return count
      },
      isChecked() {
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        if(this.$store.state.cartList.length !== 0) {
          return !(this.$store.state.cartList.find(item => !item.checked))
        }
      }
    },
    methods: {
      checkButtonClick() {
        if(this.isChecked) {
          for(let item of this.$store.state.cartList) {
            item.checked = false
          }
        } else {
          for(let item of this.$store.state.cartList) {
            item.checked = true
          }
        }
      },
      calcClick() {
        if(!this.isChecked) {
          debounce(this.$toast.show('请选择购买的商品', 2000), 200)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    position: relative;
    background-color: #eee;
    display: flex;
    line-height: 40px;
  }

  .check-content {
    display: flex;
    align-items: center;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 24px;
    margin: 0 8px;
  }

  .price {
    margin: 0 0 0 25px;
  }
  .calculate {
    position: absolute;
    right: 0;
    width: 90px;
    text-align: center;
    background-color: #a51400;
    color: white;
    font-weight: bold;
  }
</style>
