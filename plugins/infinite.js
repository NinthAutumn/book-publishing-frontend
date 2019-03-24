import InfiniteLoading from 'vue-infinite-loading';
import Vue from 'vue'

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'リストはこれで終わり :(', // you can pass a string value
    noResults: 'リストはこれ以上ないよ :('
  },
})
