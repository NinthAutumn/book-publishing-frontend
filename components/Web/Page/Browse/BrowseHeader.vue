<template>
  <div class="browse-header">
    <div class="browse-header__container">
      <search-book v-model="query" style="margin-bottom:1rem;"></search-book>
      <search-tag
        style="margin-bottom:1rem;"
        @toggleModal="toggleModal"
        @category="categoryUpdateHandler"
      ></search-tag>
      <div
        class="flex-divider flex-row browse-header__selects"
        :class="{'browse-header__selects--modal':tag_modal}"
      >
        <select-swiper
          class="browse-header__swiper browse-header__swiper--types"
          :slidesPerView="4.5"
          :options="types"
          :selected="selected_type"
          @selectedOption="typeSelectHandler"
        ></select-swiper>
        <select-swiper
          class="browse-header__swiper browse-header__swiper--direction"
          :slidesPerView="2"
          :options="direction"
          :selected="selected_direction"
          @selectedOption="directionSelectHandler"
        ></select-swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SearchBook: () => import("@/components/Web/Forms/Search/SearchBook"),
    SearchTag: () => import("@/components/Web/Forms/Search/SearchTag"),
    SelectSwiper: () => import("@/components/Web/Select/Swiper")
  },
  data() {
    return {
      category: [],
      query: "",
      selected_type: this.$route.query.type || 5,
      tag_modal: false,
      selected_direction: 0,
      types: [
        { key: "栞数", value: 1 },
        { key: "話数", value: 2 },
        { key: "字数", value: 3 },
        { key: "評価", value: 4 },
        { key: "視聴回数", value: 5 }
      ],
      direction: [{ key: "上り", value: 1 }, { key: "下り", value: 0 }]
    };
  },
  watch: {
    query(val) {
      this.$emit("selected", { type: "query", value: val });
      this.$emit("refresh");
    }
  },
  methods: {
    categoryUpdateHandler(category) {
      this.category = category;
      this.$emit("selected", { type: "category", value: category });
    },
    directionSelectHandler(option) {
      this.selected_direction = option.value;
      this.$emit("selected", { type: "direction", value: option.value });
    },
    typeSelectHandler(option) {
      this.selected_type = option.value;
      this.$emit("selected", { type: "type", value: option.value });
    },
    toggleModal(val) {
      this.tag_modal = val;
      this.$emit("moveDown", val);
    }
  }
};
</script>

<style lang="scss">
.browse-header {
  $self: &;
  &__container {
    .flex-divider {
      width: 100%;
    }
    #{$self}__selects {
      transform: translateY(0);
      transition: transform 300ms;
      &--modal {
        transform: translateY(21rem) !important;
        transition: transform 300ms;
      }
    }
    #{$self}__swiper {
      &--types {
        width: 75%;
        margin-right: 1rem;
      }
      &--direction {
        width: 25%;
      }
    }
  }
}
</style>
