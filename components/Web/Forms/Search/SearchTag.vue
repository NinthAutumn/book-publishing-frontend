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
        >{{pill.name}}</li>
        <input
          class="search-category__input"
          type="text"
          v-model="query"
          @keyup.delete="keyDeleteHandler"
          placeholder="ジャンル・タグでフィルター"
          @focus="modal=true"
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
    infiniteId: 1,
    modal: false
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
    toggleModal() {
      this.modal = false;
    },
    modalItemClass(item) {
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
    keyUpHandler($e) {
      this.query = this.query.replace(",", "");

      if ($e.key === "," || $e.key === "Enter") {
        // this.query = this.query.substring(0, this.query.length - 1);
        this.tags.push(this.query);
        this.query = "";
      }
    },
    keyDeleteHandler($e) {
      if (this.tags.length < 1) return;
      if (this.query.length < 1) {
        this.query = this.tags[this.tags.length - 1].name;
        this.tags.pop();
        this.$emit("category", this.tags);
      }
    },
    async infiniteHandler($state) {
      const category = await this.fetchCategory({
        search: this.query,
        limit: this.limit,
        page: this.page++
      });
      if (category.length > 0) {
        this.category.push(...category);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  computed: {
    inputHeight() {
      return;
    }
  },
  async mounted() {
    this.category = await this.fetchCategory({
      search: "",
      limit: this.limit,
      page: 1
    });
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
      #{$self}__list {
        max-height: 20rem;
        overflow: auto;
      }
      #{$self}__item {
        font-size: 1.4rem;
        padding: 1rem 0;
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
      font-size: 1.4rem;
      padding: 0.25rem 2.5rem;
      margin-right: 1rem;
      border-radius: 10rem;
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
      // width: 100%;
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
