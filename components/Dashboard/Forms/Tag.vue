<template>
  <div class="tag-create">
    <div class="tag-create__header">タグ検索または作成！</div>
    <div class="tag-create__search flex flex--align">
      <input
        v-model="search"
        placeholder="タグ検索または作成"
        class="tag-create__search__input"
        type="text"
        @change.stop="filterTags"
      />
      <button class="tag-create__create-button" @click="createTag">作る</button>
    </div>
    <transition-group name="list" class="tag-create__list">
      <li
        class="tag-create__item"
        @click="selectTag(index)"
        v-for="(tag,index) in selected"
        :key="tag.key"
        :class="{selected: tag.selected}"
      >{{tag.key}}({{tag.sum}})</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    limit: Number
  },
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
  async mounted() {
    let object = [];
    const { tags } = await this.$store.dispatch("tag/fetchTagList", {
      page: 1,
      limit: 30,
      search: this.search
    });
    for (let tag of tags) {
      object.push({
        key: tag.name,
        sum: tag.book_count,
        selected: false,
        value: tag.id
      });
    }
    if (this.value) {
      this.value.forEach(val => {
        object.forEach(ob => {
          if (ob.value === val.id) {
            ob.selected = true;
          }
        });
      });
    }
    this.selected = object;
  },
  methods: {
    async createTag() {
      const { data } = await this.$axios.post("/v2/tag", {
        name: this.search
      });
      let name = this.search;
      if (data.error) {
        if (data.error === "もうこの名前のタグが存在しています") {
          // this.selectTag(name);
        }
        return this.$toast.show(data.error);
      }

      // this.search = "";
      this.filterTags();
      // this.selectTag(name);
    },
    async filterTags() {
      const { tags } = await this.$store.dispatch("tag/fetchTagList", {
        page: 1,
        limit: 30,
        search: this.search
      });
      let object = [];

      tags.forEach(item => {
        object.push({
          key: item.name,
          value: item.id,
          sum: item.book_count,
          selected: false
        });
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
          temparray.push({ name: tag.key, id: tag.value });
        }
      });
      if (temparray.length > this.limit) {
        this.selected[name].selected = false;
        temparray = temparray.filter(val => {
          return val.name !== this.selected[name].key;
        });
      }
      this.object = temparray;
      console.log(temparray);

      this.$emit("input", temparray);
    }
  }
};
</script>

<style lang="scss">
.tag-create {
  // top: 60px;
  // right: 100px;
  // margin-left: 10px;
  // position: sticky;
  margin-bottom: 2rem;
  height: 300px;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  $self: &;
  &__header {
    font-size: 17px;
  }
  .selected {
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
    max-height: 200px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    #{$self}__item {
      padding: 5px;
      height: 3rem;
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
      min-width: 7rem;
      height: 3.5rem;
      background-color: #fff;
      transition: 300ms;
      border: 1px solid rgb(236, 236, 236);
      font-size: 1.4rem;
      &:focus,
      &:active {
        outline: none;
      }
      &:hover {
        cursor: pointer;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        transition: 300ms;
      }
    }
    &__input {
      height: 3.5rem;
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
        transition: 300ms;
      }
    }
  }
}
</style>
