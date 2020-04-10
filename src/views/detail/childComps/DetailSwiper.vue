<template>
  <swiper class="detail-swiper-wrap">
    <swiper-item v-for="item in topImg">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImg: {
        type: Array,
        default() {
          return[]
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>
