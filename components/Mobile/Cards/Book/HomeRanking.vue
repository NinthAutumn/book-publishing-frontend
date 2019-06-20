<template>
  <div class="home-ranking">
    <div
      class="home-ranking__container"
      v-observe-visibility="visibilityChanged"
      :class="{'home-ranking__container--visible': isVisible}"
    >
      <div class="home-ranking__header">
        <div class="home-ranking__title">{{title}}</div>
        <div class="home-ranking__see-all"></div>
      </div>
      <div class="home-ranking__list">
        <nuxt-link
          tag="div"
          :to="`/books/${book.id}`"
          class="home-ranking__item"
          v-ripple
          v-for="(book,index) in books"
          :key="book.id"
        >
          <div class="home-ranking__cover">
            <v-img
              class="home-ranking__img"
              :src="book.cover"
              :lazy-src="lazyCover"
              :aspect-ratio="1/1.5"
              max-width="10rem"
              min-width="3.5rem"
            >
              <template v-slot:placeholder>
                <div class="home-ranking__loading">
                  <trinity-rings-spinner :animation-duration="1500" :size="50" color="#ff1d5e"/>
                </div>
              </template>
            </v-img>
          </div>
          <div class="home-ranking__index" v-text="book.dense_ranking || index+1"></div>
          <div class="home-ranking__meta">
            <div class="home-ranking__book-title">
              <p v-text="book.title"></p>
            </div>
            <div class="home-ranking__genre" v-text="book.name"></div>
            <div class="home-ranking__rating flex-row flex--align">
              <v-rating color="#FF8D29" readonly :size="18" half-increments :value="+book.rating"></v-rating>
              {{book.rating}}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    books: Array
  },
  data() {
    return {
      lazyCover: require("@/assets/img/NobleCardLight.png"),
      isVisible: false
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (this.isVisible) {
        return;
      }
      this.isVisible = isVisible;
    }
  }
};
</script>

<style lang="scss">
.home-ranking {
  $self: &;
  &__container {
    margin: 1rem;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    border-radius: 1rem;
    margin-bottom: 2rem;

    perspective-origin: 49% 33%;
    &--visible {
      @keyframes down-play {
        from {
          opacity: 0;
          transform: perspective(400px) translateZ(-100px);
        }
        to {
          opacity: 1;
          perspective: 400;
          transform: perspective(400px) translateZ(0);
        }
      }
      animation: down-play 400ms ease;
      // animation-delay: 200ms;

      #{$self}__item {
      }
    }
    #{$self}__header {
      #{$self}__title {
        font-size: 4vw;
        color: #83848f;
        font-weight: bold;
      }
      margin-bottom: 1rem;
    }
    #{$self}__list {
      #{$self}__item {
        display: flex;

        // transform:
        max-width: 100%;
        // justify-content: space-between;
        width: 100%;
        // align-items: center;
        margin-bottom: 0.5rem;
        #{$self}__cover {
          #{$self}__img {
            border-radius: 0.4rem;
            box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
              0 1px 1px 0 rgba(0, 0, 0, 0.07);
          }
          min-width: 20%;
        }
        #{$self}__loading {
          height: 100%;
          width: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #{$self}__index {
          font-size: 3.5vw;
          font-weight: bold;
          align-self: flex-start;
          width: 2rem;
          min-width: 2rem;
          text-align: center;
        }
        #{$self}__genre {
          font-size: 3.5vw;
          color: #83848f;
        }
        #{$self}__meta {
          width: 100%;
          max-width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        #{$self}__book-title {
          // width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          p {
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 3.5vw;
          }
          font-size: 3.5vw;
        }
        #{$self}__rating {
          font-size: 3vw;
          .v-icon {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
