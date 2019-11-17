<template>
  <div class="browse-page page-padding">
    <book-page></book-page>
    <!-- <div
      class="browse-page__header flex-row flex--align"
      :class="{'browse-page__header--mobile':$device.isMobile}"
    >
      <header>作品を探す</header>
    </div>

    <div class="flex-divider browse-page__section flex">
      <div class="flex-divider" style="flex-grow:1;">
        <div class="browse-page__sorting-list flex-row">
          <div class="flex-divider flex-row">
            <div class="browse-page__sort-type">
              <Select
                :width="120"
                v-model="type"
                name="詳細条件"
                :object="sort_type"
                transition="grow-shrink"
                def="視聴回数"
                @selected="refresh"
              ></Select>
            </div>
            <div class="browse-page__sort-type browse-page__sort-type--direction">
              <Select
                :width="120"
                v-model="direction"
                name="方向"
                :object="sort_directions"
                transition="grow-shrink"
                def="下り"
                @selected="refresh"
              ></Select>
            </div>
          </div>
          <div class="flex-divider flex-row flex--right" style="width:100%;">
            <div class="browse-page__filter-genre" style="margin-right:1rem;">
              <genre-select @selected="refresh" v-model="selected_genre"></genre-select>
            </div>
            <button
              class="browse-page__open-tags flex-row flex--align flex--center"
              @click="openTag"
            >
              <fa class="browse-page__open-tags__icon" :icon="tag_search?'compress':'expand'"></fa>
              {{tag_search? 'タグをしまう':'タグで探す'}}
            </button>
          </div>
        </div>

        <transition name="grow-shrink">
          <div class="browse-page__filter" v-if="selected_genre.length > 0">
            <transition-group
              tag="ul"
              name="list"
              class="browse-page__filter-list flex flex--align"
            >
              <li
                class="browse-page__filter-list browse-page__filter-list__item flex-row flex--align"
                v-for="(genre) in selected_genre"
                :key="genre"
                v-text="genre.name"
              ></li>
            </transition-group>
          </div>
        </transition>
        <transition name="grow-shrink">
          <div class="browse-page__filter" v-if="tag_list.length > 0">
            <transition-group
              tag="ul"
              name="list"
              class="browse-page__filter-list flex flex--align"
            >
              <li
                class="browse-page__filter-list__item browse-page__filter-list__item--tag flex-row flex--align"
                v-for="(genre) in tag_list"
                :key="genre"
                v-text="genre.name"
              ></li>
            </transition-group>
          </div>
        </transition>
        <TagCreate @selected="refresh" v-if="tag_search" v-model="tag_list"></TagCreate>

        <div class="browse-page__content flex-row">
          <BookList
            :type="type"
            :genres="selected_genre"
            :tags="tag_list"
            :direction="direction"
            :books="books"
          ></BookList>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hydrateWhenIdle, hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  auth: false,
  components: {
    Select: hydrateWhenIdle(() => import("@/components/All/Select")),
    BookList: hydrateWhenVisible(() => import("@/components/Browse/BookList")),
    TagCreate: hydrateWhenIdle(() => import("@/components/Browse/TagCreate")),
    GenreSelect: hydrateWhenIdle(() => import("@/components/Web/Select/Genre")),
    BookPage: () => import("@/components/Web/Page/Browse")
  },
  computed: {
    ...mapGetters({
      books: "book/getBrowseBooks"
    })
  },
  methods: {
    async refresh() {
      this.loading = true;
      const genres = this.selected_genre.map(genre => {
        return genre.id;
      });
      const tags = this.tag_list.map(tag => {
        return tag.id;
      });
      await this.$store.dispatch("book/browseBooks", {
        type: this.type,
        direction: this.direction,
        genres,
        tags,
        page: 1,
        limit: 20
      });
      this.loading = false;
    },
    openTag() {
      this.tag_search = !this.tag_search;
      if (this.tag_search) {
        this.modalDirection = "left";
      } else {
        this.modalDirection = "right";
      }
    }
  },
  created() {
    if (this.$device.isMobile) {
      return this.$router.replace("/browse/mobile");
    }
    if (this.$route.query.genre && this.$route.query.genre !== "undefined") {
      this.selected_genre = [{ name: this.$route.query.genre }];
    }
    if (this.$route.query.tag && this.$route.query.tag !== "undefined") {
      this.tag_list = [{ name: this.$route.query.tag }];
    }
  },
  async fetch({ store, route }) {
    let direction = 0,
      type = 5,
      genres = [],
      tags = [];

    if (route.query.genre && route.query.genre !== "undefined") {
      genres = [route.query.genre];
    }
    if (route.query.tag && route.query.tag !== "undefined") {
      tags.push(route.query.tag);
    }

    await store.dispatch("book/browseBooks", {
      type,
      direction,
      tags,
      genres,
      page: 1,
      limit: 20
    });
  },
  async mounted() {
    this.loading = false;
  },
  data() {
    return {
      type: this.$route.query.type || 5,
      genre: "",
      loading: true,
      genre_list: [],
      direction: this.$route.query.direction || 0,
      modalDirection: "right",
      selected_genre: [],
      sort_type: [
        { key: "栞数", value: 1 },
        { key: "話数", value: 2 },
        { key: "字数", value: 3 },
        { key: "評価", value: 4 },
        { key: "視聴回数", value: 5 }
      ],
      sort_directions: [{ key: "上り", value: 1 }, { key: "下り", value: 0 }],
      tag_list: [],
      tag_search: false
    };
  }
};
</script>

<style lang="scss">
.browse-page {
  position: relative;
  .library-booklist {
    flex-grow: 1;
  }
  &__section {
    // position: absolute;
    top: 200px;
    width: 100%;
    transition: 300ms;
  }
  &__header {
    height: 100px;
    &--mobile {
      height: 100% !important;
    }
  }
  header {
    font-size: 20px;
  }
  &__open-tags {
    &:active {
      transition: 100ms;
      background-color: rgb(240, 240, 240);
      border: 0px;
      outline: none;
    }
    &:focus {
      // transition: 100ms;
      // background-color: rgb(240, 240, 240);
      border: 0px;
      outline: none;
    }
    transition: 100ms;
    height: 30px;
    width: 120px;
    box-shadow: 1px 1px 5px rgb(236, 236, 236);
    margin-right: 5px;
    user-select: none;
    font-size: 14px;
    color: grey;
    background-color: #fff;
    border: 0px;
    &__icon {
      margin-right: 5px;
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(247, 247, 247);
    }
  }
  .header-blob {
    position: absolute;
    z-index: -1;
    top: -50px;
    left: -5px;
    opacity: 0.5;
    transform: rotate(-20deg);
  }
  &__sort-type {
    // height: 30px;
    // width: 100px;
    &__name {
      font-size: 16px;
    }
    &__modal {
    }
    &__option {
      font-size: 16px;
    }
  }
  &__filter-genre {
    // height: 30px;
    // width: 100px;
    &__name {
      font-size: 16px;
    }
    &__modal {
    }
    &__option {
      font-size: 16px;
      .selected {
      }
    }
  }
  &__filter-title {
    font-size: 16px;
    // height: 50px;
    margin-right: 10px;
  }
  &__filter-list {
    background-color: rgb(252, 252, 252);
    padding: 5px;
    flex-wrap: wrap;
    &__item {
      margin-bottom: 5px;
      margin-top: 5px;
      // height: 35px;
      font-size: 14px;
      margin-right: 5px;
      // background-color: $secondary-light;
      box-shadow: 1px 1px 5px rgb(240, 240, 240);
      color: white;
      padding: 0.2rem 2rem;
      box-sizing: border-box;
      background-color: #f4648a;
      &--tag {
        background-color: $secondary;
      }
      border-radius: 10rem;
      user-select: none;
    }
  }
  &__filter {
  }
}
</style>
