<template>
  <div class="mobile-browse">
    <div class="mobile-browse__nav">
      <div class="mobile-browse__icon" v-ripple @click="goBack">
        <fa icon="arrow-left"></fa>
      </div>
      <p>検索</p>
    </div>
    <div class="mobile-browse__list">
      <div class="mobile-browse__pills"></div>
      <nuxt-link tag="div" :to="`/books/${book.id}`" v-for="book in items" :key="book.id">
        <book-card v-ripple :book="book"></book-card>
      </nuxt-link>
      <client-only>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
      </client-only>
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
        <div class="mobile-browse__options-container">
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
      items: [],
      tab: 0,
      infiniteId: Math.floor(Math.random() * (20000 - 1)) + 1,
      page: 1,
      selected_type: "popular",
      selected_filter: { key: "全部", value: 0 },
      selected_state: { key: "全部", value: "all" },
      noMore: false,
      loading: false,
      modal: false,
      filters: {
        genre: {
          title: "ジャンル",
          list: [{ selected: true, key: "全部", value: 0 }]
        },
        state: {
          title: "状態",
          list: [
            { selected: true, key: "全部", value: "all" },
            { selected: false, key: "連載中", value: "ongoing" },
            { selected: false, key: "完結", value: "completed" }
          ]
        }
        // state;
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
  watch: {},
  async mounted() {
    await this.$store.dispatch("book/fetchAllGenres");
    this.genres.forEach(this.mountedHandler);
    // this.items = await this.$store.dispatch("book/browseMobileBooks", {
    //   type: this.selected_type,
    //   page: this.page++,
    //   limit: 20,
    //   genre: this.selected_filter.key,
    //   tag: this.$route.query.tag || null,
    //   state: this.selected_state.value,
    //   infinite: true
    // });
  },
  methods: {
    mountedHandler(genre) {
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
    },
    async infiniteHandler($state) {
      const books = await this.$store.dispatch("book/browseMobileBooks", {
        type: this.selected_type,
        page: this.page++,
        limit: 20,
        genre: this.selected_filter.key,
        tag: this.$route.query.tag || null,
        state: this.selected_state.value,
        infinite: true
      });
      if (books.length > 0) {
        this.items.push(...books);
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    goBack() {
      this.$router.go(-1);
    },
    toggleModal() {
      this.modal = !this.modal;
    },
    filterHander(key, index) {
      if (key === "genre") {
        this.filters[key].list.forEach((item, i) => {
          if (index === i) {
            item.selected = true;
            this.selected_filter = item;
            this.$router.replace({
              path: "/browse/mobile",
              query: { genre: item.key }
            });
          } else {
            item.selected = false;
          }
        });
      } else if (key === "state") {
        this.filters[key].list.forEach((item, i) => {
          if (index === i) {
            item.selected = true;
            this.selected_state = item;
          } else {
            item.selected = false;
          }
        });
      }
      this.items = [];
      this.page = 1;
      this.infiniteId += 5;
    }
  },
  layout: "browse"
};
</script>

<style lang="scss">
.mobile-browse {
  $self: &;
  height: 100%;
  width: 100%;
  &__nav {
    height: 4rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(247, 244, 244);
    z-index: 1000;
    color: black;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-weight: bold;
    #{$self}__icon {
      padding: 0.5rem 1rem;
      font-size: 1.4rem;
    }
    p {
      font-size: 1.4rem;
      margin-left: 1rem;
    }
  }
  &__list {
    padding-top: 4rem;
    padding-bottom: 6.5rem;
    height: 100%;
    min-height: 100vh;
    width: 100%;
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
      // font-weight: bold;
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
    // overflow: auto;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    padding: 1rem;
    #{$self}__modal-list {
      display: flex;
      flex-wrap: wrap;
    }
    #{$self}__options-container {
      overflow: auto;
      height: 87%;
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
      font-size: 1.1rem;
      padding: 0.3rem 1.8rem;
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
</style>
