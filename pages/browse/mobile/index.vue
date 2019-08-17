<template>
  <div class="mobile-browse">
    <div class="mobile-browse__nav">
      <div class="mobile-browse__icon" v-ripple @click="goBack">
        <fa icon="arrow-left"></fa>
      </div>
      <p>検索</p>
    </div>
    <div class="mobile-browse__tab">
      <v-tabs v-model="tab" dark color="#e3e8ee">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item.key">{{ item.value }}</v-tab>
        <v-tabs-items v-touch:swipe.left="swipeTab" v-touch:swipe.right="swipeRight">
          <v-tab-item v-for="item in items" :key="item.key" class="mobile-browse__list">
            <!-- {{popular}} -->
            <nuxt-link :to="`/books/${book.id}`" v-for="(book,index) in  item.list" :key="index">
              <BookCard v-ripple :book="book"></BookCard>
            </nuxt-link>
            <no-ssr>
              <infinite-loading :identifier="infinite[items[tab].key]" @infinite="infiniteHandler"></infinite-loading>
            </no-ssr>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
    <div class="mobile-browse__bottom">
      <div class="mobile-browse__bottom-container" @click.stop="toggleModal">
        <div class="mobile-browse__selected" v-text="selected_filter.key"></div>
        <div class="mobile-browse__icon">
          <fa icon="angle-up"></fa>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <div class="mobile-browse__modal" v-if="modal" v-click-outside="toggleModal">
        <div class="mobile-browse__modal-header" v-touch:swipe.down="toggleModal">
          <div class="mobile-browse__modal-title">フィルター</div>
          <div class="mobile-browse__modal-icon" v-ripple @click="toggleModal">
            <fa icon="angle-down"></fa>
          </div>
        </div>
        <div class="mobile-browse__options" v-for="(filter,key) in filters" :key="filter.title">
          <div class="mobile-browse__option-title" v-text="filter.title"></div>
          <div class="mobile-browse__modal-list">
            <div
              class="mobile-browse__option"
              :class="{'mobile-browse__option--selected': item.selected}"
              v-for="(item,index) in filter.list"
              @click="filterHander(key,index)"
              :key="index"
            >{{item.key}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  auth: false,
  data() {
    return {
      items: [
        { value: "今人気", key: "popular", list: [] },
        { value: "話数", key: "chapter", list: [] },
        { value: "視聴回数", key: "view", list: [] },
        { value: "評価", key: "rating", list: [] },
        { value: "字数", key: "word", list: [] }
      ],
      tab: 0,
      page: {
        popular: 1,
        chapter: 1,
        view: 1,
        rating: 1,
        word: 1
      },
      infinite: {
        popular: 0,
        chapter: 1,
        view: 2,
        rating: 3,
        word: 4
      },
      selected_filter: { key: "全部", value: 0 },
      noMore: false,
      loading: false,
      modal: false,
      filters: {
        genre: {
          title: "ジャンル",
          list: [{ selected: true, key: "全部", value: 0 }]
        },
        type: {
          title: "type",
          list: [{ selected: true, key: "全部" }]
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      genres: "book/getGenres"
    })
  },
  components: {
    BookCard: () => import("@/components/Mobile/Cards/Book/Detailed")
  },
  watch: {
    selected_filter: function(val) {
      this.items.forEach(val => {
        val.list = [];
      });
      Object.keys(this.page).forEach(val => {
        this.page[val] = 1;
      });
      Object.keys(this.infinite).forEach(val => {
        this.infinite[val] += 5;
      });

      // this.items[this.tab].list = [];
    }
  },
  async mounted() {
    await this.$store.dispatch("book/fetchAllGenres");
    this.genres.forEach(genre => {
      if (genre.name === this.$route.query.genre) {
        this.filters["genre"].list.push({
          selected: true,
          key: genre.name,
          value: genre.id
        });
        this.filters["genre"].list[0].selected = false;
        this.selected_filter = {
          key: genre.name,
          value: genre.id
        };
      } else {
        this.filters["genre"].list.push({
          selected: false,
          key: genre.name,
          value: genre.id
        });
      }
    });
    // this.tab = ;
    // await this.$store.dispatch("book/browseMobileBooks", {
    //   type: "popular",
    //   page: 1,
    //   limit: 20,
    //   genre: this.$route.query.genre || null,
    //   tag: this.$route.query.tag || null
    // });
  },
  methods: {
    async infiniteHandler($state) {
      const books = await this.$store.dispatch("book/browseMobileBooks", {
        type: this.items[this.tab].key,
        page: this.page[this.items[this.tab].key]++,
        limit: 20,
        genre: this.selected_filter.key,
        tag: this.$route.query.tag || null,
        // selected_filter:
        infinite: true
      });
      if (books.length > 0) {
        books.forEach(book => {
          this.items[this.tab].list.push(book);
        });
        // for (let i = 0; i < books.length; i++) {

        // }
        // books.forEach(val => {});
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    swipeTab(val) {
      const tab = parseInt(this.tab);
      this.tab = tab < 3 ? tab + 1 : 0;
    },
    swipeRight(val) {
      const tab = parseInt(this.tab);
      this.tab = tab > 0 ? tab - 1 : 3;
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleModal() {
      this.modal = !this.modal;
    },
    filterHander(key, index) {
      this.filters[key].list.forEach((item, i) => {
        if (index === i) {
          item.selected = true;
          this.selected_filter = item;
          // this.$route.query.genre = item.key;
          this.$router.replace({
            path: "/browse/mobile",
            query: { genre: item.key }
          });
        } else {
          item.selected = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mobile-browse {
  $self: &;
  &__nav {
    height: 4.5rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(247, 244, 244);
    z-index: 1000;
    color: black;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-weight: bold;
    #{$self}__icon {
      padding: 0.5rem 1rem;
      font-size: 2rem;
    }
    p {
      font-size: 2rem;
      margin-left: 1rem;
    }
  }
  &__list {
    padding-top: 3rem;
  }
  &__bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1rem;
    #{$self}__bottom-container {
      width: 100%;
      height: 4rem;
      border-radius: 2rem;
      background-color: #e3e8ee;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      justify-content: space-between;
      color: #000000;
      font-weight: bold;
      #{$self}__selected {
        font-size: 1.6rem;
      }
      #{$self}__icon {
        color: #566cd6;
        font-size: 2rem;
      }
    }
  }
  &__modal {
    width: 100%;
    height: 50vh;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
    padding: 1rem;
    #{$self}__modal-list {
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
    }

    #{$self}__modal-header {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
      #{$self}__modal-title {
        font-size: 1.6rem;
      }
      #{$self}__modal-icon {
        height: 4rem;
        width: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: #566cd6;
      }
    }
    #{$self}__option-title {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    #{$self}__option {
      font-size: 1.2rem;
      padding: 0.5rem 2rem;
      background-color: #e3e8ee;
      color: #2e2e2f;
      border-radius: 2rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      transition: 200ms;
      &--selected {
        transition: 200ms;
        background-color: #566cd6;
        color: #fff;
      }
    }
  }
}
.mobile-browse__nav {
}
.v-tabs__item {
  color: black;
  font-weight: bold;
}

.v-tabs__wrapper {
  position: fixed;
  top: 4rem;
  left: 0;
  background-color: rgb(247, 244, 244);
  width: 100%;
  z-index: 1000;
}
.v-tabs__slider {
  background-color: black !important;
}
</style>
