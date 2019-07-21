<template>
  <div class="browse-tag">
    <div class="browse-tag__container">
      <div class="browse-tag__title flex flex--align flex--center"></div>
      <fa class="browse-tag__icon" icon="tags"></fa>
      <fa class="browse-tag__help" icon="question-circle"></fa>
      <div class="browse-tag__nav flex flex--align flex--center" @mouseleave="navLineOut">
        <div
          @mouseenter="moveline(1)"
          @click="navClick(1)"
          class="browse-tag__nav__item flex flex--align browse-tag__nav__item--search"
        >検索</div>
        <div
          @click="navClick(2)"
          @mouseenter="moveline(2)"
          class="browse-tag__nav__item flex flex--align browse-tag__nav__item--filter"
        >除外</div>
        <i
          class="browse-tag__nav__line"
          :class="{'browse-tag__nav__line--include': index ===1}"
          :style="line"
        ></i>
      </div>

      <ul class="browse-tag__list flex" v-if="tags.include.length > 0&&index === 1">
        <li
          class="browse-tag__item flex flex--align"
          v-for="(tag, index) in tags.include"
          :key="index"
          @click="removeItem(tag)"
          @mouseenter="batsuState"
          @mouseleave="batsuState"
        >
          {{tag}}
          <fa style="margin-left:5px;" icon="times"></fa>
        </li>
      </ul>
      <ul class="browse-tag__list flex" v-if="tags.exclude.length > 0&&index !== 1">
        <li
          class="browse-tag__item browse-tag__item--exclude flex flex--align"
          v-for="(tag, index) in tags.exclude"
          :key="index"
          @click="removeItem(tag)"
          @mouseenter="batsuState"
          @mouseleave="batsuState"
        >
          {{tag}}
          <fa style="margin-left:5px;" icon="times"></fa>
        </li>
      </ul>

      <div class="tag-add__form flex flex--align">
        <transition name="form-right">
          <div class="browse-tag__add-input" v-if="form">
            <input
              v-model="tag"
              ref="taginput"
              type="text"
              @keypress.enter="showForm"
              placeholder="タグをたす"
            />
          </div>
        </transition>
        <div
          class="browse-tag__add"
          :class="{'browse-tag__add--exclude':index!==1}"
          @click="showForm"
          v-if="!form"
        >
          <fa icon="plus"></fa>
        </div>
        <div
          class="browse-tag__add"
          :class="{'browse-tag__add--exclude': index!==1}"
          @click="showForm"
          v-if="form&&tag"
        >
          <fa icon="plus"></fa>
        </div>
        <div
          class="browse-tag__add"
          :class="{'browse-tag__add--exclude':index!==1}"
          @click="showForm"
          v-if="form&&!tag"
        >
          <fa icon="minus"></fa>
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
    navLineOut() {
      this.line = this.selectedTab;
    },
    navClick(index) {
      if (index === 1) {
        this.index = 1;
        this.selectedTab = {
          width: "32px",
          left: "64px"
        };
      } else {
        this.index = 2;
        this.selectedTab = {
          width: "32px",
          left: "104px"
        };
      }
    },
    showForm() {
      if (this.index === 1) {
        if (this.tag) {
          let tagExistsi = this.tags.include.filter(ele => ele === this.tag);
          let tagExistse = this.tags.exclude.filter(ele => ele === this.tag);
          if (tagExistsi.length > 0 || tagExistse.length > 0) {
            return this.$toast.show("タグがもう存在しています", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 1000,
              icon: "extension"
            });
          }
          this.tags.include.push(this.tag);
          this.$emit("input", this.tags);
          this.tag = "";
          return;
        }
      } else {
        if (this.tag) {
          let tagExistsi = this.tags.include.filter(ele => ele === this.tag);
          let tagExistse = this.tags.exclude.filter(ele => ele === this.tag);
          if (tagExistsi.length > 0 || tagExistse.length > 0) {
            return this.$toast.show("タグがもう存在しています", {
              theme: "toasted-primary",
              position: "top-right",
              duration: 1000,
              icon: "extension"
            });
          }

          this.tags.exclude.push(this.tag);
          this.$emit("input", this.tags);
          this.tag = "";
          return;
        }
      }

      this.form = !this.form;
    },
    removeItem(tag) {
      if (this.index === 1) {
        this.tags.include = this.tags.include.filter(t => t !== tag);
      } else {
        this.tags.exclude = this.tags.exclude.filter(t => t !== tag);
      }
    },
    batsuState() {
      this.batsu = !this.batsu;
    },
    moveline(index) {
      if (index === 1) {
        this.line = {
          width: "32px",
          left: "64px"
        };
      } else {
        this.line = {
          width: "32px",
          left: "104px"
        };
      }
    }
  },
  data() {
    return {
      tags: {
        include: [],
        exclude: []
      },
      tag: "",
      form: false,
      batsu: false,
      index: 1,
      selected_type: "",
      line: {
        width: "32px",
        left: "64px"
      },
      selectedTab: {
        width: "32px",
        left: "64px"
      },
      type: [{ key: "検索", value: "in" }, { key: "除外", value: "all" }]
    };
  }
};
</script>

<style lang="scss">
.browse-tag {
  position: relative;
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
    position: absolute;
    top: 10px;
    right: 40px;
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
    position: relative;
    margin-bottom: 5px;
    &__item {
      height: 35px;
      font-size: 16px;
      position: relative;
      user-select: none;

      &:hover {
        cursor: pointer;
      }

      &--search {
        margin-right: 10px;
      }
    }
    &__line {
      position: absolute;
      top: 100%;
      content: "";
      border-top: 3px solid $primary;
      transition: 300ms;
      &--include {
        border-top: 3px solid $secondary;
      }
    }
  }
  &__add {
    font-size: 14px;
    color: $secondary;
    transition: 300ms;
    &--exclude {
      color: $primary;
    }
    .fa-plus {
      // transform: scale(1.1);
      transition: 300ms;
      font-size: 20px;
    }
    &:hover {
      cursor: pointer;

      .fa-plus {
        transform: scale(1.1);
        transition: 300ms;
      }
    }
  }
  &__icon {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 5px;
    color: $primary;
    transform: rotate(45deg);
  }
  &__item {
    font-size: 13px;
    margin-right: 5px;
    height: 25px;
    // padding: 0 5px;
    color: $secondary;
    border: 1px solid $secondary;
    margin-bottom: 5px;
    transition: 100ms;
    &--exclude {
      color: $primary;
      border: 1px solid $primary;
      &:hover {
        transition: 100ms;
        cursor: pointer;
        user-select: none;
        color: white;
        background-color: $primary !important;
      }
    }
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
