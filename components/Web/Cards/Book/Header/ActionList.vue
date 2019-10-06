<template>
  <div class="bheader-actions">
    <div class="bheader-actions__container">
      <div
        class="bheader-actions__item"
        v-for="(value,key) in actions"
        :key="key"
        :class="`bheader-actions__item--${key}`"
        v-ripple
      >
        <div
          @click.stop="actionHandler(key)"
          class="bheader-actions__button"
          :class="{'bheader-actions__button--bookmarked': key==='bookmark'&&bookmarked}"
        >
          <div class="bheader-actions__content" v-if="loading !== key">
            <fa class="bheader-actions__button-icon" :icon="value.icon"></fa>
            <div class="bheader-actions__button-text" v-text="value.title"></div>
          </div>
          <div class="bheader-actions__content bheader-actions__content--loading" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    bookmarked: Boolean,
    auth: Boolean
  },
  data() {
    return {
      loading: false,
      actions: {
        vote: {
          icon: "bolt",
          title: "投票をかける"
        },
        list: {
          icon: "list",
          title: "リストに入れる"
        },
        support: {
          icon: "gift",
          title: "サポートする"
        },
        bookmark: {
          icon: "bookmark",
          title: "ブックマークする"
        }
      }
    };
  },
  computed: {},

  mounted() {
    if (this.bookmarked) {
      this.actions["bookmark"]["title"] = "ブックーク済み";
    }
  },
  methods: {
    ...mapActions({
      updateLibrary: "library/patchStore",
      setVote: "book/postVote"
    }),
    ...mapMutations({
      toggleReadingModal: "reading/TOGGLE_STATE",
      toggleLoginState: "LOGIN_STATE",
      fetchWealth: "wallet/wealth"
    }),
    async actionHandler(key) {
      if (!this.auth) return this.toggleLoginState();
      switch (key) {
        case "vote":
          this.voteHandler();
          break;
        case "support":
          this.$toast.show("現在サポート機能が公開されていません");
          break;
        case "list":
          this.toggleReadingModal(this.$route.params.id);
          break;
        default:
          this.bookmarkHandler();
          break;
      }
    },
    async bookmarkHandler() {
      this.loading = "bookmark";
      const store = {
        type: "bookmark",
        bookId: this.$route.params.id
      };
      if (this.bookmarked) {
        try {
          await this.updateLibrary({ store });

          this.$emit("toggleBookmark", false);
        } catch (error) {
          this.$toast.error(`ブックマーク解除に失敗しました`);
        }
      } else {
        try {
          await this.updateLibrary({ store });
          this.$emit("toggleBookmark", true);
        } catch (error) {
          this.$toast.error(`ブックマークを失敗しました`);
        }
      }
      this.loading = false;
    },
    async voteHandler() {
      this.loading = "vote";
      try {
        const { error } = await this.setVote({ bookId: this.$route.params.id });
        if (error) this.$toast.error(`${error}`);
      } catch (error) {
        console.log(error.message);
      }
      this.loading = false;
      await this.fetchWealth();
    }
  }
};
</script>

<style lang="scss">
.bheader-actions {
  grid-area: action;
  justify-self: end;
  align-self: end;
  display: flex;
  align-items: center;
  $self: &;
  &__container {
    display: flex;
    align-items: center;

    #{$self}__item {
      border: 1px solid;
      border-radius: 0.5rem;
      margin-right: 1rem;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      &--bookmark {
        border-color: $secondary;
        color: $secondary;
      }
      &--list {
        border-color: #00c5ff;
        color: #00c5ff;
      }
      &--vote {
        border-color: #f4648a;
        color: #f4648a;
      }
      &--support {
        border-color: $primary;
        color: $primary;
      }
      // &--
    }
    #{$self}__button {
      #{$self}__content {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        width: 14rem;
        height: 3.5rem;
        padding: 0.4rem;
        box-sizing: border-box;
        justify-content: center;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
      &--bookmarked {
        color: white;
        // border-color:none;
        background: $secondary;
      }

      #{$self}__button-icon {
        margin-right: 1rem;
      }
      #{$self}__button-text {
        font-size: inherit;
      }
    }
  }
}
</style>
