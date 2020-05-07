/**
 * Created by  on 2020/4/14.
 */
import {promised} from "q";

export default {
  addCart(context, payload) {
    // 查找之前商品中是否有该数组
    /*let oldProduct = null;
    for(let item of state.cartList) {
      if(item.iid === payload.iid) {
        oldProduct = item
      }
    }*/
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      // 判断oldProduct
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}
