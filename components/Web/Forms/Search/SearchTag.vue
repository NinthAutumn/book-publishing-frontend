<template>
  <div
    class="search-category"
    :class="{'search-category--modal':modal}"
    v-click-outside="toggleModal"
  >
    <div
      class="search-category__wrapper"
      ref="wrapper"
      :class="{'search-category__wrapper--less':tags.length >4}"
    >
      <div class="search-category__container">
        <li
          class="search-category__pill"
          :class="`search-category__pill--${pill.type}`"
          v-for="(pill,index) in tags"
          :key="index"
          @click="pillClickHandler(pill)"
          v-ripple
        >{{pill.name}}</li>
        <input
          class="search-category__input"
          type="text"
          ref="input"
          v-model="query"
          @keyup.delete="keyDeleteHandler"
          @keydown="compositionEndedSafariHandler"
          placeholder="ジャンル・タグでフィルター"
          @focus="toggleModalOn"
        />
      </div>
      <transition name="grow-shrink">
        <div
          class="search-category__modal"
          :style="{paddingTop:`${$refs.wrapper.clientHeight}px`}"
          v-if="modal"
        >
          <div class="search-category__list">
            <div
              class="search-category__item"
              v-for="(item,index) in category"
              @click="selectCategoryHandler({item,index})"
              :class="modalItemClass(item)"
              :key="index"
            >{{`${item.name} (${item.book_count})`}}</div>
            <client-only>
              <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
            </client-only>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    value: Array
  },
  data: () => ({
    query: "",
    tags: [],
    category: [],
    limit: 10,
    page: 2,
    infiniteId: Math.floor(Math.random() * (20000 - 1)) + 1,
    modal: false,
    isComposing: false,
    hasCompositionJustEnded: false
  }),
  watch: {
    query() {
      this.category = [];
      this.page = 1;
      this.infiniteId++;
    }
  },
  methods: {
    ...mapActions({
      fetchCategory: "tag/fetchCategoryList"
    }),
    toggleModal(val) {
      this.modal = false;
      this.$emit("toggleModal", false);
    },
    toggleModalOn() {
      this.modal = true;
      this.$emit("toggleModal", true);
    },
    modalItemClass(item) {
      if (item.selected) {
        return `search-category__item--selected search-category__item--${item.type}`;
      }
      return `search-category__item--${item.type}`;
    },
    selectCategoryHandler({ item, index }) {
      if (item.selected) {
        this.tags = this.tags.filter(val => val.name !== item.name);
        this.category[index].selected = false;
        this.$emit("category", this.tags);
        this.query = "";
        return;
      }
      this.category[index].selected = true;
      this.tags.push(item);
      this.$emit("category", this.tags);
      this.query = "";
    },
    pillClickHandler(pill) {
      this.tags = this.tags.filter(val => val.name !== pill.name);
      this.$emit("category", this.tags);
      this.category = this.category.map(val => {
        if (val.name === pill.name) val.selected = false;
        return val;
      });
    },
    keyDeleteHandler($e) {
      if (this.isComposing || this.hasCompositionJustEnded) {
        // IME composing fires keydown/keyup events
        this.hasCompositionJustEnded = false;
        return;
      }
      if (this.tags.length < 1) return;
      if (this.query.length < 1) {
        this.query = this.tags[this.tags.length - 1].name;
        this.tags.pop();
        this.$emit("category", this.tags);
      }
    },
    checkIfCategoryExists(category) {
      let cat = category;

      cat.forEach((val, index) => {
        this.tags.forEach(tag => {
          if (val.name === tag.name) cat[index].selected = true;
        });
      });

      return cat;
    },
    async infiniteHandler($state) {
      let category = await this.fetchCategory({
        search: this.query,
        limit: this.limit,
        page: this.page++
      });
      if (this.tags.length > 0) category = this.checkIfCategoryExists(category);

      if (category.length > 0) {
        this.category.push(...category);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    compositionStartHandler() {
      this.isComposing = true;
    },
    compositionEndHandler() {
      this.isComposing = false;
      this.hasCompositionJustEnded = true;
    },
    compositionEndedSafariHandler($e) {
      if ($e.which !== 229) {
        this.hasCompositionJustEnded = false;
      }
    }
  },
  beforeDestroy() {
    this.$refs.input.removeEventListener(
      "compositionstart",
      this.compositionStartHandler
    );
    this.$refs.input.removeEventListener(
      "compositionend",
      this.compositionEndHandler
    );
  },
  async mounted() {
    if (this.$route.query.genre && this.$route.query.genre !== "undefined") {
      this.tags.push({
        name: this.$route.query.genre,
        id: this.$route.query.genre,
        type: "genre"
      });
    }
    if (this.$route.query.tag && this.$route.query.tag !== "undefined") {
      this.tags.push({
        name: this.$route.query.tag,
        id: this.$route.query.tag,
        type: "tag"
      });
    }
    this.category = await this.fetchCategory({
      search: "",
      limit: this.limit,
      page: 1
    });
    if (this.tags.length > 0)
      this.category = this.checkIfCategoryExists(this.category);

    this.$refs.input.addEventListener(
      "compositionstart",
      this.compositionStartHandler
    );
    this.$refs.input.addEventListener(
      "compositionend",
      this.compositionEndHandler
    );
  }
};
</script>

<style lang="scss">
.search-category {
  $self: &;

  &__wrapper {
    min-height: 45px;
    z-index: 2;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 #00000012;
    border-radius: 50rem;
    padding: 1rem 0;
    padding-left: 2rem;
    position: relative;
    z-index: 10;
    transition: border-radius 200ms;
    &--less {
      border-radius: 1rem;
      transition: border-radius 200ms;
      #{$self}__modal {
        border-top-left-radius: 1rem !important;
        border-top-right-radius: 1rem !important;
        transition: border-radius 200ms;
      }
    }
    #{$self}__modal {
      padding: 1rem 0;
      padding-left: 2rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 #00000012;
      border-radius: 1rem;
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      transition: border-radius 200ms;
      background-color: #fff;
      #{$self}__list {
        max-height: 20rem;
        overflow: auto;
        background-color: #fff;
      }
      #{$self}__item {
        font-size: 1.4rem;
        padding: 1rem 0;
        &--selected {
          color: black !important;
        }
        &--genre {
          color: $primary;
        }
        &--tag {
          color: $secondary;
        }
        &:hover {
          cursor: pointer;
          color: black;
        }
      }
    }
  }
  &__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: -1rem;
    overflow: hidden;
    #{$self}__pill {
      font-size: 1.3rem;
      padding: 0.1rem 2.5rem;
      margin-right: 1rem;
      border-radius: 10rem;
      &:hover {
        cursor: pointer;
        user-select: none;
      }
      &--tag {
        border: 1px solid $secondary;
        color: $secondary;
      }
      &--genre {
        border: 1px solid $primary;
        color: $primary;
      }

      margin-bottom: 1rem;
      // margin-bottom: 1rem;
    }
    #{$self}__input {
      display: block;
      // width: 100%;
      background-color: white;
      margin-bottom: 1rem;
      flex-grow: 1;

      font-size: 1.6rem;
      padding: 0.5rem 0;
      &:focus,
      &:active {
        outline: none;
      }
    }
  }
}
</style>
