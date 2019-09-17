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
        :class="{'browse-create__item--selected': tag.selected}"
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
      object: {},
      page: 1,
      id: 1
    };
  },
  props: ["value"],
  watch: {
    search: function(val) {
      // this.selected = [];
      this.filterTags();
      // this.page = 1;
      // this.id++;
    }
  },
  computed: {
    tags() {
      return this.$store.getters["book/getTagList"];
    }
  },
  async updated() {},
  async mounted() {
    let object = [];
    const { tags } = await this.$store.dispatch("tag/fetchTagList", {
      page: 1,
      limit: 30,
      search: this.search
    });
    tags.forEach(tag => {
      object.push({
        key: tag.name,
        sum: tag.book_count,
        selected: false,
        value: tag.id
      });
    });

    if (this.value) {
      this.value.forEach(key => {
        object.forEach(val => {
          if (val.value == key.id || val.key === key.name) {
            val.selected = true;
            if (!key.id) {
              this.object[val.value] = { id: val.value, name: val.key };
            } else {
              this.object[key.id] = key;
            }
          }
        });
      });
    }
    this.selected = object;
  },
  methods: {
    async filterTags() {
      const { tags } = await this.$store.dispatch("tag/fetchTagList", {
        page: 1,
        limit: 30,
        search: this.search
      });
      let object = [];
      tags.forEach(tag => {
        object.push({
          key: tag.name,
          sum: tag.book_count,
          selected: false,
          value: tag.id
        });
      });
      this.selected = object;

      Object.keys(this.object).forEach(key => {
        this.selected.forEach(tag => {
          if (tag.value === parseInt(key)) {
            tag.selected = true;
          }
        });
      });
    },
    async selectTag(name) {
      // return console.log(this.selected[name]);
      this.selected[name].selected = !this.selected[name].selected;
      let temparray = [];
      let tag_id = this.selected[name].value;
      if (this.object[tag_id]) {
        delete this.object[tag_id];
      } else {
        this.object[tag_id] = {
          id: this.selected[name].value,
          name: this.selected[name].key
        };
      }
      if (Object.keys(this.object).length > this.limit) {
        this.selected[name].selected = false;
        delete this.object[tag_id];
      }
      let tags = [];
      Object.keys(this.object).forEach(key => {
        tags.push(this.object[key]);
      });

      // this.object
      // console.log(tags);
      this.$emit("input", tags);
      this.$emit("selected");
    },
    async infiniteHandler($state) {
      const { tags } = await this.$store.dispatch("book/searchTags", {
        page: this.page++,
        limit: 40,
        search: this.search,
        infinite: true
      });

      if (tags.length > 0) {
        tags.forEach(item => {
          this.selected.push({
            key: item.name,
            value: item.id,
            sum: item.book_count,
            selected: false
          });
        });
        this.selected.forEach(tag => {
          this.object.forEach(t => {
            if (tag.key === t) {
              tag.selected = true;
            }
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
      &--selected {
        color: white;
        background-color: grey;
        &:hover {
          cursor: pointer;
          color: grey;
          border: 1px solid grey;
          transition: 200ms;
        }
      }
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
