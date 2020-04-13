<template>
  <div id="Detail">
    <detail-nav-bar class="detail-nav"
                    @titlesClick="titlesClick"
                    ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-img="topImg"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>


<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import { debounce } from 'common/utils'
  import { itemListenerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    destroyed() {
      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    mounted() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // console.log(this.iid);

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的轮播图片
        this.topImg = res.result.itemInfo.topImages
        const data = res.result
        // console.log(data)

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.b保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论信息
        if(data.rate.list != 0) {
          this.commentInfo = data.rate.list[0]
        }

      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        // console.log(res);
      })

      // 4.图片加载完成的事件监听
      const newRefresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('detailItemImgLoad', () => {
        newRefresh()
      })
    },
    updated() {

    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()

        // 获取每一个分类的offsetTop
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },
      titlesClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y

        // 2.positionY与主题中的y值进行对比
        // [0, 7938, 9120, 9452, umber.MAX_VALUE ]
        // positionY 在7938 和9120之间，index = 0
        // positionY 在7938 和9120之间，index = 1
        // positionY 在9120 和9452之间，index = 2
        // positionY 在9452 和非常大的值之间，index = 2
        let length = this.themeTopYs.length

        // positionY 超过9120值，index = 3
        /*for(let i = 0; i < length; i ++) {
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i;
            // console.log(this.currentIndex, i);
            // console.log(this.$refs.nav);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/
        for(let i = 0; i < length; i ++) {
          if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            // console.log(this.currentIndex, i);
            // console.log(this.$refs.nav);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImg[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //
      }
    }
  }
</script>

<style scoped>
  #Detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
  }
</style>
