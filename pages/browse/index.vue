<template>
  <div class="browse-page">
    <div class="browse-page__header flex flex--align">
      <blob class="header-blob"></blob>
      <header>作品を探す</header>
    </div>
    <div class="flex-divider browse-page__section flex">
      <div class="flex-divider" style="flex-grow:1;">
        <div class="browse-page__sorting-list flex">
          <div class="flex-divider flex">
            <div class="browse-page__sort-type">
              <Select
                :width="100"
                v-model="type"
                :name="'詳細条件'"
                :object="sort_type"
                :transition="'grow-shrink'"
                def="視聴回数"
              ></Select>
            </div>
            <div class="browse-page__sort-type browse-page__sort-type--direction">
              <Select
                :width="100"
                v-model="direction"
                :name="'方向'"
                :object="sort_directions"
                :transition="'grow-shrink'"
                def="下り"
              ></Select>
            </div>
          </div>
          <div class="flex-divider flex flex--right" style="width:100%;">
            <div class="browse-page__filter-genre">
              <Select
                v-model="selected_genre"
                :transition="'grow-shrink'"
                :multiple="true"
                :data="genre_list"
                :name="'ジャンル'"
              ></Select>
            </div>
          </div>

          <div class="browse-page__filter-tag"></div>
          <div class="browse-page__filter-bookstate"></div>
        </div>
        <transition name="grow-shrink">
          <div class="browse-page__filter" v-if="selected_genre.length > 0">
            <transition-group
              tag="ul"
              name="list"
              class="browse-page__filter-list flex flex--align"
            >
              <li
                class="browse-page__filter-list browse-page__filter-list__item flex flex--align"
                v-for="(genre, index) in selected_genre"
                :key="index"
                v-text="genre"
              ></li>
            </transition-group>
          </div>
        </transition>
        <div class="browse-page__content flex">
          <BookList :books="books"></BookList>
        </div>
      </div>
      <TagList></TagList>
    </div>
  </div>
</template>

<script>
import Blob from "@/assets/svg/blob2.svg";
import Select from "@/components/All/Select";
import BookList from "@/components/Browse/BookList";
import TagList from "@/components/Browse/TagList";

export default {
  auth: false,
  components: {
    Blob,
    Select,
    BookList,
    TagList
  },
  computed: {
    books() {
      return this.$store.state.book.browse;
    }
  },
  methods: {
    async refresh() {
      await this.$store.dispatch("book/browseBooks", {
        type: this.type,
        direction: this.direction,
        genres: this.selected_genre,
        page: 1
      });
    }
  },
  created() {},
  watch: {
    selected_genre: function(val) {
      this.refresh();
    },
    type: function(val) {
      this.refresh();
    },
    direction: function(val) {
      this.refresh();
    }
  },
  async fetch({ store }) {
    await store.dispatch("book/browseBooks", {
      type: 4,
      direction: "desc",
      genres: [],
      page: 1
    });
  },
  data() {
    return {
      type: "",
      direction: "",
      genre: "",
      selected_genre: [],
      sort_type: [
        { key: "視聴回数", value: 0 },
        { key: "栞数", value: 1 },
        { key: "話数", value: 2 },
        { key: "字数", value: 3 },
        { key: "評価", value: 4 }
      ],
      sort_directions: [
        { key: "上り", value: "asc" },
        { key: "下り", value: "desc" }
      ],
      tag_list: [],
      genre_list: [
        "ファンタジー",
        "恋愛",
        "文学",
        "異世界",
        "空想科学",
        "SF",
        "武術",
        "ミステリー",
        "サスペンス",
        "冒険",
        "アクション",
        "ノンフィクション",
        "ホラー",
        "オカルト",
        "時代",
        "歴史",
        "コメディ",
        "政治",
        "スポーツ",
        "武俠",
        "経済",
        "推理",
        "青春",
        "学園",
        "ボーイズラブ",
        "少女愛",
        "メカ",
        "少年",
        "青年",
        "音楽",
        "日常",
        "ゲーム"
      ]
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
  }
  header {
    font-size: 20px;
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
      height: 35px;
      font-size: 14px;
      margin-right: 5px;
      // background-color: $secondary-light;
      box-shadow: 1px 1px 5px rgb(240, 240, 240);
      color: white;
      padding: 5px;
      box-sizing: border-box;
      background-color: #f4648a;
    }
  }
  &__filter {
  }
}
</style>
