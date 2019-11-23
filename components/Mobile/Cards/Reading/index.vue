<template>
  <div class="rm-card">
    <div
      class="rm-card__container container"
      v-ripple
      @click.stop="$store.commit('reading/TOGGLE_LIST_MODAL',reading.id)"
    >
      <div class="rm-card__content">
        <div class="rm-card__header">
          <div class="flex-divider flex-row flex--align flex--between">
            <div class="rm-card__title text--overflow" v-text="reading.title"></div>
            <div @click.stop="likeHandler" class="rm-card__like flex-row flex--align">
              <div class="rm-card__like-number" v-text="likes"></div>
              <fa class="rm-card__icon rm-card__icon--like" :icon="heart"></fa>
            </div>
          </div>
          <div class="rm-card__description" v-line-clamp="2" v-text="reading.description"></div>
        </div>
        <div class="rm-card__books">
          <div
            class="rm-card__book-container"
            :class="{'rm-card__book-container--disable':index > 2}"
            v-for="(book,index) in reading.books"
            :key="book.id"
          >
            <v-img
              v-if="index < 3"
              :lazy-src="cover"
              :src="book.cover"
              :width="'6.5rem'"
              :aspect-ratio="1/1.5"
            ></v-img>
          </div>
          <div class="rm-card__no-book" v-if="reading.books.length === 1">
            <!-- <fa icon="empty-set"></fa> -->
          </div>
          <div class="rm-card__no-book" v-if="reading.books.length < 3">
            <!-- <fa icon="empty-set"></fa> -->
          </div>
        </div>
        <div class="rm-card__footer">
          <div class="rm-card__open">開く</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    reading: Object
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auth: "auth/isAuthenticated"
    })
  },
  mounted() {
    this.likes = this.reading.likes;
    this.followed = this.reading.followed;
    if (this.reading.liked) {
      this.heart.prefix = "fa";
    }
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png"),
      heart: {
        prefix: "far",
        iconName: "heart"
      },
      followed: false,
      modal: false,
      likes: 0,
      options: {
        follow: {
          title: "このリストをフォローする"
        }
        // add: {
        //   title: "このリストの作品全部を自分のリストに入れる"
        // }
      }
    };
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
    async followHandler() {
      if (!this.auth) return this.$store.commit("LOGIN_STATE");
      this.followed = !this.followed;
      await this.$store.dispatch("reading/followReadingList", {
        id: this.reading.id
      });
    },
    async likeHandler() {
      if (!this.auth) return this.$store.commit("LOGIN_STATE");
      if (this.heart.prefix === "far") {
        this.heart.prefix = "fa";
        this.likes++;
        await this.$store.dispatch("reading/likeReadingList", {
          id: this.reading.id
        });
      } else {
        this.likes--;
        this.heart.prefix = "far";
        await this.$store.dispatch("reading/likeReadingList", {
          id: this.reading.id
        });
      }
    }
  }
};
</script>

<style lang="scss">
.rm-card {
  $self: &;
  // margin-right: 1rem;
  &__container {
    // border-xi
    box-sizing: border-box;
    padding: 1rem 1rem;
    padding-top: 2rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    // width: 100%;
    #{$self}__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #{$self}__header {
      #{$self}__title {
        font-size: 1.4rem;
      }
      #{$self}__like {
        color: red;
        font-size: 1.4rem;
        #{$self}__like-number {
          font-size: inherit;
          margin-right: 0.5rem;
        }
        #{$self}__icon {
        }
      }
      #{$self}__description {
        font-size: 1.2rem;
        color: rgb(141, 141, 141);
      }
    }
    #{$self}__books {
      display: flex;
      justify-content: space-between;
      #{$self}__book-container {
        &--disable {
          display: none;
        }
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        // min-width: 6.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
      }
      #{$self}__no-book {
        width: 6.5rem;
        height: 9.75rem;
        background-color: rgb(235, 235, 235);
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
    }
    #{$self}__footer {
      font-size: 1.3rem;
      text-align: center;
      margin-top: 1rem;
      #{$self}__open {
        color: $secondary;
        font-size: inherit;
      }
    }
  }
}
</style>
