<template>
  <div class="book-show-dashboard">
    <div class="book-show flex flex--align flex--between">
      <!-- <p class="book-show__title">{{$store.state.book.book.title}}</p> -->
    </div>
    <div class="book-tab flex-row flex--align flex--between">
      <div class="book-tab__container flex-row">
        <div class="book-tab__item">
          <nuxt-link
            class="book-tab__item__text text--black"
            to="draft"
          >下書き({{$store.getters['chapter/getDraft'].length}})</nuxt-link>
        </div>
        <div class="book-tab__item">
          <nuxt-link class="book-tab__item__text" to="published">公開済</nuxt-link>
        </div>
        <div class="book-tab__item">
          <nuxt-link
            class="book-tab__item__text"
            to="deleted"
          >削除済({{$store.getters['chapter/getDeleted'].length}})</nuxt-link>
        </div>
      </div>
      <div class="flex-divider flex-row">
        <div
          class="book-tab__add-volume flex-row flex--align"
          style="margin-right:1rem;"
          v-ripple
          @click.stop="toggleVolume"
        >
          <fa icon="plus" class="book-tab__icon"></fa>
          <div class="book-tab__volume">章を作る</div>
        </div>
        <nuxt-link v-ripple class="book-tab__add-volume flex-row flex--align" :to="{path: `new`}">
          <fa icon="pen-nib" style="margin-right:5px;"></fa>新しい話を書く
        </nuxt-link>
      </div>
    </div>
    <keep-alive>
      <nuxt-child></nuxt-child>
    </keep-alive>
    <!-- <volume-form></volume-form> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  layout: "user-nav/User",
  components: {
    // VolumeForm: () => import("@/components/Dashboard/Forms/Volume")
  },
  async fetch({ store, params }) {
    await store.dispatch("chapter/fetchNotPublishedList", {
      bookId: params.id
    });
    await store.dispatch("chapter/fetchPublishedList", { bookId: params.id });
    // await store.dispatch("book/getBook", params.id);
  },
  created() {},
  computed: {},
  scrollToTop: true,
  methods: {
    handleClick() {},
    ...mapMutations({
      toggleVolume: "TOGGLE_VOLUME"
    })
  },
  data() {
    return {
      createVolume: false,
      volume: {
        title: "",
        desc: ""
      }
    };
  }
};
</script>

<style lang="scss">
.book-show-dashboard {
  min-height: 100vh;
  .book-show {
    padding: 5px 0;
    &__cover {
      height: 103px;
      width: 70px;
      border-radius: 10px;
      box-shadow: 1px 1px 5px 0px rgb(189, 189, 189);
    }

    &__title {
      font-size: 25px;
    }
  }
  .v-dialog {
    padding: 2rem;
    background-color: #fff;
  }
  .book-form__form {
  }
  .book-tab {
    margin-bottom: 1rem;
    $self: &;
    &__item {
      margin-right: 10px;
      font-size: 14px;
      margin-bottom: 10px;
      &__text {
        color: black;
        font-size: 20px;
        &:visited {
          color: black;
        }
        &:hover {
          border-bottom: 2px solid rgb(230, 230, 230);
        }
        padding-bottom: 4px;
      }
      .nuxt-link-exact-active {
        border-bottom: 2px solid $secondary;
      }
    }
    &__add-volume {
      font-size: 1.6rem;
      padding: 0.8rem 2rem;
      background-color: #f6f9fc;
      // displa
      color: #4f566b;
      box-shadow: rgba(42, 47, 69, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
        rgba(42, 47, 69, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
      background-color: rgb(255, 255, 255);
      border-radius: 4px;
      // border: 0.5px solid #cfd0d4;
      &:hover {
        cursor: pointer;
      }
    }
    &__volume {
      font-size: inherit;
    }
    &__icon {
      margin-right: 1rem;
    }
  }
}
</style>
