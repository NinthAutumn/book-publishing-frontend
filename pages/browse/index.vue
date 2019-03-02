<template>
  <div class="browse-page">
    <div class="browse-page__header flex flex--align">
      <blob class="header-blob"></blob>
      <header>作品を探す</header>
    </div>
    <div class="browse-page__sorting-list flex">
      <div class="browse-page__sort-type">
        <Select
          :width="100"
          v-model="type"
          :name="'詳細条件'"
          :data="sort_type"
          :transition="'grow-shrink'"
        ></Select>
      </div>
      <div class="browse-page__sort-type browse-page__sort-type--direction">
        <Select
          :width="100"
          v-model="direction"
          :name="'方向'"
          :data="sort_directions"
          :transition="'grow-shrink'"
        ></Select>
      </div>
      <div class="browse-page__filter-genre">
        <Select
          v-model="selected_genre"
          :transition="'grow-shrink'"
          :multiple="true"
          :data="genre_list"
          :name="'ジャンル'"
        ></Select>
        <div class="items" v-for="(item, index) in selected_genre" :key="index" v-text="item"></div>
      </div>
      <div class="browse-page__filter-bookstate"></div>
    </div>
    <div class="browse-page__content"></div>
  </div>
</template>

<script>
import Blob from "@/assets/svg/blob2.svg";
import Select from "@/components/All/Select";
export default {
  auth: false,
  components: {
    Blob,
    Select
  },
  data() {
    return {
      type: "",
      direction: "",
      genre: "",
      selected_genre: [],
      sort_type: ["視聴回数", "評価", "栞数", "字数"],
      sort_directions: ["上り", "下り"],
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
}
</style>
