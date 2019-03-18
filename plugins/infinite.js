import InfiniteLoading from 'vue-infinite-loading';
import Vue from 'vue'

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'リストはこれで終わりです T=T', // you can pass a string value

  },
})
