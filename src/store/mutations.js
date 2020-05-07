/**
 * Created by  on 2020/4/13.
 */
export default {
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
