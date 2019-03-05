<template>
  <div class="tag-list">
    <div class="tag-list__container">
      <div class="tag-list__title flex flex--align flex--center">
        <fa icon="tags"></fa>
        <header>タグリスト</header>
        <fa class="tag-list__help" icon="question-circle"></fa>
      </div>
      <div class="tag-list__nav flex flex--align flex--center">
        <div class="tag-list__nav__item tag-list__nav__item--search">検索</div>
        <div class="tag-list__nav__item tag-list__nav__item--filter">除外</div>
      </div>

      <ul class="tag-list__list flex" v-if="tags.length > 0">
        <li
          class="tag-list__item flex flex--align"
          v-for="(tag, index) in tags"
          :key="index"
          @click="removeItem(tag)"
          @mouseenter="batsuState"
          @mouseleave="batsuState"
        >
          {{tag}}
          <!-- <fa style="margin-left:4px;" icon="times" v-if="batsu"></fa> -->
        </li>
      </ul>
      <div class="tag-add__form flex flex--align">
        <transition name="form-right">
          <div class="tag-list__add-input" v-if="form">
            <input
              v-model="tag"
              name="taginput"
              ref="taginput"
              type="text"
              @keypress.enter="showForm"
              placeholder="タグ"
            >
          </div>
        </transition>
        <div class="tag-list__add" @click="showForm">
          <fa icon="plus"></fa>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/All/Select";
export default {
  async mounted() {
    await this.$store.dispatch("book/tagList", { page: 1, limit: 10 });
  },
  components: {
    Select
  },
  computed: {
    // tags() {
    //   return this.$store.state.book.tagList;
    // }
  },
  methods: {
    showForm() {
      if (this.tag) {
        let tagExists = this.tags.filter(ele => ele === this.tag);
        if (tagExists.length > 0) {
          return this.$message({
            message: "タグがもう存在してっしょ",
            type: "error"
          });
        }

        this.tags.push(this.tag);
        this.$emit("input", this.tags);
        this.tag = "";
        return;
      }
      this.form = !this.form;
      if (this.form) {
        this.$refs.taginput.focus();
      }
    },
    removeItem(tag) {
      this.tags = this.tags.filter(t => t !== tag);
    },
    batsuState() {
      this.batsu = !this.batsu;
    }
  },
  data() {
    return {
      tags: [],
      tag: "",
      form: false,
      batsu: false,
      selected_type: "",
      type: [{ key: "検索", value: "in" }, { key: "除外", value: "all" }]
    };
  }
};
</script>

<style lang="scss">
.tag-list {
  &__title {
    font-size: 17px;
  }
  &__container {
    box-shadow: 1px 1px 5px rgb(236, 236, 236);
    width: 200px;
    padding: 10px;
    height: 300px;
    overflow: scroll;
  }
  &__select {
    width: 100px;
  }
  &__help {
    font-size: 12px;
    &:hover {
      color: green;
      cursor: pointer;
    }
  }
  &__list {
    // grid-template-columns: repeat(auto-fill, 100px);
    flex-wrap: wrap;
  }
  &__add-input {
    input {
      height: 25px;
      width: 80px;
      font-size: 13px;
      padding: 0 5px;
      border: 1px solid white;
      box-shadow: 1px 1px 5px rgb(240, 240, 240);
      color: $secondary;
    }
    margin-right: 5px;
  }
  &__nav {
    &__item {
      height: 35px;
      font-size: 14px;
      &--search {
        margin-right: 5px;
      }
    }
  }
  &__add {
    font-size: 14px;
    color: $secondary;
    transition: 300ms;
    .fa-plus {
      // transform: scale(1.1);
      transition: 300ms;
    }
    &:hover {
      cursor: pointer;

      .fa-plus {
        transform: scale(1.1);
        transition: 300ms;
      }
    }
  }
  &__item {
    font-size: 13px;
    margin-right: 5px;
    height: 25px;
    padding: 0 5px;
    color: $secondary;
    border: 1px solid $secondary;
    margin-bottom: 5px;
    transition: 100ms;
    &:hover {
      transition: 100ms;
      cursor: pointer;
      user-select: none;
      color: white;
      background-color: $secondary;
    }
    // color: $primary;
  }
}
</style>
