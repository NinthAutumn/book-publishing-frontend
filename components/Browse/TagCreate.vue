<template>
  <div class="browse-create">
    <div class="browse-create__header">タグで検索</div>
    <div class="browse-create__search flex flex--align">
      <input
        v-model="search"
        placeholder="タグを検索"
        class="browse-create__search__input"
        type="text"
        @change="filterTags"
      />
    </div>
    <transition-group name="list" class="browse-create__list">
      <li
        class="browse-create__item"
        @click="selectTag(index)"
        v-for="(tag,index) in selected"
        :key="tag.key"
        :class="{selected: tag.selected}"
      >{{tag.key}}({{tag.sum}})</li>
    </transition-group>
    <no-ssr>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selected: [],
      object: [],
      page: 2
    };
  },
  watch: {
    search: function(val) {
      this.filterTags();
    }
  },
  computed: {
    tags() {
      return this.$store.getters["book/getTagList"];
    }
  },
  async mounted() {
    const { tags } = await this.$store.dispatch("book/searchTags", {
      page: 1,
      limit: 30,
      search: this.search
    });
    let object = [];
    tags.forEach(item => {
      object.push({ key: item.name, sum: item.books, selected: false });
    });
    this.selected = object;
  },
  methods: {
    async filterTags() {
      await this.$store.dispatch("book/searchTags", {
        page: 1,
        limit: 30,
        search: this.search
      });
      let object = [];
      this.tags.forEach(item => {
        object.push({ key: item.name, sum: item.books, selected: false });
      });
      this.selected = object;
      this.selected.forEach(tag => {
        this.object.forEach(t => {
          if (tag.key === t) {
            tag.selected = true;
          }
        });
      });
    },
    async selectTag(name) {
      this.selected[name].selected = !this.selected[name].selected;
      let temparray = [];
      this.selected.forEach(tag => {
        if (tag.selected) {
          temparray.push(tag.key);
        }
      });
      this.object = temparray;
      this.$emit("input", temparray);
    },
    async infiniteHandler($state) {
      const { tags } = await this.$store.dispatch("book/searchTags", {
        page: this.page++,
        limit: 20,
        search: this.search,
        infinite: true
      });

      if (tags.length > 0) {
        tags.forEach(item => {
          this.selected.push({
            key: item.name,
            sum: item.books,
            selected: false
          });
        });
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>

<style lang="scss">
.browse-create {
  top: 50px;
  right: 10px;
  // right: 100px;
  margin-left: auto;
  position: sticky;
  width: 500px;
  height: 150px;
  margin-bottom: 1.5rem;
  padding: 10px;
  background-color: #fff;
  border-radius: 0.5rem;
  z-index: 100;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
  $self: &;
  overflow: auto;
  &__header {
    font-size: 17px;
  }
  .selected {
    // border: 1px solid $secondary;
    color: white !important;
    background-color: grey !important;
    &:hover {
      cursor: pointer;
      color: grey;
      border: 1px solid grey;
      transition: 200ms;
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    // overflow: auto;
    justify-content: flex-start;
    max-height: 400px;
    #{$self}__item {
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      color: grey;
      font-size: 12px;
      border: 1px solid grey;
      margin-right: 5px;
      margin-bottom: 5px;
      user-select: none;
      transition: 200ms;
      border-radius: 100px;
      &:hover {
        cursor: pointer;
        color: white;
        background-color: grey;
        transition: 200ms;
      }
    }
  }
  &__search {
    position: sticky;
    top: 0;
    margin-bottom: 10px;
    #{$self}__create-button {
      width: 70px;
      height: 30px;
      background-color: #fff;
      transition: 300ms;
      border: 1px solid rgb(236, 236, 236);

      &:focus,
      &:active {
        outline: none;
      }
      &:hover {
        cursor: pointer;
        background-color: $primary;
        color: white;
        transition: 300ms;
      }
    }
    &__input {
      height: 30px;
      font-size: 12px;
      padding: 2px 5px;
      width: 100%;
      border: 1px solid rgb(236, 236, 236);
      border-right: 0;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      &:focus,
      &:active {
        outline: none;
        // border: 1px solid grey;
        transition: 300ms;
      }
    }
  }
}
</style>
