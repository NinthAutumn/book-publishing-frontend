<template>
  <div class="reading-list">
    <div class="reading-list__container">
      <div class="reading-list__header">
        <div class="reading-list__like-number" v-text="likes"></div>
        <div @click.stop="likeHandler" class="reading-list__like">
          <fa class="reading-list__icon reading-list__icon--like" :icon="heart"></fa>
        </div>
        <div
          class="reading-list__follow"
          :class="{'reading-list__follow--followed':followed}"
          v-if="!library&&reading.user_id !== user.id"
          @click.stop="followHandler"
        >
          <fa class="reading-list__icon reading-list__icon--like" icon="stream"></fa>
          <span class="tooltiptext" v-text="followed? 'フォローを解除':'フォロー'"></span>
        </div>
      </div>
      <div
        class="reading-list__books"
        @click.stop="$store.commit('reading/TOGGLE_LIST_MODAL',reading.id)"
        :class="{'reading-list__books--1':reading.books.length === 1,'reading-list__books--2':reading.books.length === 2,'reading-list__books--3':reading.books.length === 3,'reading-list__books--4':reading.books.length === 4,'reading-list__books--all':reading.books.length >4}"
      >
        <v-img
          :src="book.cover"
          class="reading-list__cover"
          :class="`reading-list__cover--${index+1}`"
          v-for="(book,index) in reading.books"
          :key="index"
          max-width="7.5rem"
          height="11.25rem"
        ></v-img>
      </div>
      <div class="reading-list__footer">
        <div
          class="reading-list__title"
          @click.stop="$store.commit('reading/TOGGLE_LIST_MODAL',reading.id)"
          v-text="reading.title"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: { reading: Object, library: Boolean },
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
  },
  data() {
    return {
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
  }
};
</script>

<style lang="scss">
.reading-list {
  $self: &;
  width: 19rem;
  &__container {
    padding: 1rem 2rem;
    padding-top: 0.5rem;
    width: 100%;
    min-height: 30rem;
    max-width: 19rem;
    box-sizing: border-box;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    position: relative;
    #{$self}__header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      #{$self}__like-number {
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
      #{$self}__follow {
        font-size: 2rem;
        margin-left: 1rem;
        color: rgb(185, 185, 185);
        position: relative;
        // display: inline-block;

        &--followed {
          color: black;
        }
        &:hover {
          cursor: pointer;
          .tooltiptext {
            visibility: visible;
            opacity: 1;
            transition: opacity 200ms;
          }
        }
        .tooltiptext {
          visibility: hidden;
          opacity: 0;
          transition: opacity 200ms;
          min-width: 6rem;
          background-color: black;
          text-align: center;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          right: 110%;
          position: absolute;
          z-index: 1;
        }
      }
      #{$self}__like {
        color: red;
        font-size: 2rem;
        &:hover {
          cursor: pointer;
        }
      }
      height: 3rem;
    }
    #{$self}__books {
      height: 22.5rem;

      &--1 {
        min-width: 15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        #{$self}__cover {
          // width: 100%;
          width: 7.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
        }
      }
      &--2 {
        display: grid;
        // align-items: center;

        // grid-template-columns: repeat(2, 1fr);
        min-width: 15rem;
        #{$self}__cover {
          min-width: 7.5rem;
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
          &--1 {
            grid-column: 2/6;
            grid-row: 4/6;
            z-index: 1000;
          }
          &--2 {
            z-index: 100;
            grid-row-start: 1;
            grid-column: 4/6;
            grid-row: 3/6;
            justify-self: center;
          }
        }
      }
      &--3 {
        display: grid;
        // align-items: center;
        // grid-template-columns: repeat(2, 1fr);

        width: 100%;
        #{$self}__cover {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
          min-width: 7.5rem;
          &--1 {
            grid-column: 1/3;
            grid-row: 1/4;
          }
          &--2 {
            grid-row-start: 1;
            grid-column: 3/3;
            grid-row: 1/4;
            justify-self: flex-end;
          }
          &--3 {
            grid-column: 2/4;
            grid-row: 3/6;
            z-index: 10;
          }
        }
      }
      &--4 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        // min-width: 7.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        // grid-template-rows: repeat(2, fr);
      }
      &--all {
        display: grid;
        // grid-template-columns: repeat(2, 1fr);
        // grid-template-rows: repeat(2, 1fr);
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        // min-width: 7.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        #{$self}__cover {
          min-width: 7.5rem;
          &--1 {
            grid-column: 1/3;
            grid-row: 1/3;
          }
          &--2 {
            grid-column: 3/3;
            grid-row: 1/3;
          }

          &--3 {
            grid-column: 1/3;
            grid-row: 3/3;
          }

          &--4 {
            grid-column: 3/3;
            grid-row: 3/3;
          }
          &--5 {
            box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
              0 1px 1px 0 rgba(0, 0, 0, 0.07);
            border-radius: 0.5rem;
            // margin: 0 auto;
            width: 7.5rem;
            height: 11.25rem;
            // bottom: 0;
            // top: 0;
            // bottom: 0;
            justify-self: flex-start;
            grid-column: 2/4;
            grid-row: 2/4;
            z-index: 1000;
          }
        }
      }
    }
    #{$self}__footer {
      margin-top: 1rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: space-between;

      #{$self}__menu {
        font-size: 1.6rem;

        #{$self}__modal {
          position: absolute;
          bottom: 0;
          background-color: #fff;
          z-index: 10000;
          border-radius: 0.5rem;
          left: 90%;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
          #{$self}__select {
            user-select: none;
            &:hover {
              cursor: pointer;
            }
            font-size: 1.4rem;
            padding: 0.5rem 1rem;
          }
        }
        // color:
      }
      #{$self}__title {
        font-size: 1.6rem;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        // text-align: center;
      }
    }
  }
}
</style>
