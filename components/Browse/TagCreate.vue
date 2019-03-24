<template>
  <div class="tag-create">
    <div class="tag-create__header">タグで検索</div>
    <div class="tag-create__search flex flex--align">
      <input
        v-model="search"
        placeholder="タグを検索"
        class="tag-create__search__input"
        type="text"
        @change="filterTags"
      >
    </div>
    <transition-group name="list" class="tag-create__list">
      <li
        class="tag-create__item"
        @click="selectTag(index)"
        v-for="(tag,index) in selected"
        :key="index"
        :class="{selected: tag.selected}"
      >{{tag.key}}({{tag.sum}})</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selected: [],
      object: []
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
    await this.$store.dispatch("book/searchTags", {
      page: 1,
      limit: 30,
      search: this.search
    });
    let object = [];
    this.tags.forEach(item => {
      object.push({ key: item._id, sum: item.sum, selected: false });
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
        object.push({ key: item._id, sum: item.sum, selected: false });
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
    }
  }
};
</script>

<style lang="scss">
.tag-create {
  top: 60px;
  // right: 100px;
  margin-left: 10px;
  position: sticky;
  height: 500px;
  width: 300px;
  padding: 10px;
  background-color: #fff;
  overflow: auto;
  $self: &;
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
    #{$self}__item {
      padding: 5px;
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
      box-shadow: 1px 1px 5px rgb(247, 247, 247);
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
