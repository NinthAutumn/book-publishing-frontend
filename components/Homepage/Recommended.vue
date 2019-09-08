<template>
  <div class="recommendation-books" :class="{'recommendation-books--mobile': $device.isMobile}">
    <div class="recommendation-books__list">
      <nuxt-link
        tag="div"
        :to="'/books/' + book.id"
        class="recommendation-books__item"
        v-for="book in books"
        :key="book.id"
        v-ripple=" $device.isMobile"
      >
        <div class="recommendation-books__cover">
          <v-img
            :src="book.cover + '/m'"
            :aspect-ratio="1/1.5"
            :lazy-src="cover"
            max-width="20rem"
            :min-width="$device.isMobile?'8rem':'12rem'"
            alt="Book cover"
            style="border-radius: 0.4rem;     box-shadow: 0 2px 5px 0 rgba(60,66,87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, .07); "
            class="recommendation-books__img"
          ></v-img>
        </div>
        <div class="recommendation-books__meta">
          <div class="recommendation-books__rating" v-if="!$device.isMobile">
            <v-rating color="#FF6452" readonly size="20" half-increments :value="+book.rating"></v-rating>
          </div>
          <div class="recommendation-books__title">
            <p v-line-clamp="2" v-text="book.title"></p>
            <!-- <p v-line-clamp="{lines:1,text: book.title}"></p> -->
            <!-- <v-clamp autoresize :max-lines="100"></v-clamp> -->
          </div>
          <div class="recommendation-books__author" v-if="!$device.isMobile">{{book.pen_name}}</div>
          <div class="recommendation-books__info" v-if="!$device.isMobile">
            <div class="recommendation-books__genre">
              <fa class="recommendation-books__icon" icon="th-large"></fa>
              <p>{{book.name}}</p>
            </div>
            <div class="recommendation-books__chapter-list">
              <fa class="recommendation-books__icon" icon="eye"></fa>
              <p>{{book.chapter_count}}話</p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png?size=200")
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      books: "analytic/getRecommended"
    })
  }
};
</script>

<style lang="scss">
.recommendation-books {
  display: flex;
  $self: &;
  &--mobile {
    #{$self}__list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      /* autoprefixer: ignore next */
      grid-gap: 1rem;
      padding: 0;
      #{$self}__item {
        margin: 0;
        flex-direction: column;
        #{$self}__cover {
          margin: 0;
        }
      }
      #{$self}__info {
        display: none;
      }
      #{$self}__author {
        margin: 0;
      }
      #{$self}__title {
        font-size: 1.5rem;
        word-break: break-all;
        @media screen and (max-width: 450px) {
          p {
            font-size: 1.2rem;
          }
        }
        @media screen and (max-width: 375px) {
          p {
            font-size: 1.1rem;
          }
        }
        @media screen and (max-width: 320px) {
          p {
            font-size: 1rem;
          }
        }
        p {
          font-weight: bold;
          word-break: break-all;
        }
        margin: 0;
      }
      #{$self}__rating {
        margin: 0;
      }
      #{$self}__meta {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
      }
    }

    // padding-right: 2rem;
  }
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* autoprefixer: ignore next */
    grid-gap: 1.5rem;
    padding-right: 2rem;
    #{$self}__item {
      display: flex;
      // transform: scale(1);
      // align-items: center;
      &:hover {
        cursor: pointer;
      }
      &:focus,
      &:active {
      }
      #{$self}__cover {
        margin-right: 2rem;
        // overflow: hidden;
        #{$self}__img {
          // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
          &:hover {
            transition: 200ms;
          }
          transition: 200ms;
        }
      }
      #{$self}__meta {
        padding: 1rem 0;
      }
      #{$self}__title {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        word-break: break-all;
        // max-height: 4rem;
        // max-height: 4rem;
        span {
          font-size: 1.6rem;
          // word-break: break-all;
        }
        p {
          // font-size: 1.6rem;
          // word-break: break-all;
        }
        // overflow: hidden;
      }
      #{$self}__author {
        margin-bottom: 2rem;
        font-size: 1.4rem;
      }
      #{$self}__rating {
        // margin: 1.5rem 0;
        margin-bottom: 1rem;
        .v-icon {
          padding: 0px;
        }
      }
      #{$self}__icon {
        color: #68b2ff;
        margin-right: 1rem;
      }
      #{$self}__genre {
        display: flex;
        font-size: 1.2rem;
        align-items: center;
        margin-bottom: 0.5rem;

        p {
          color: black;
          font-size: 1.2rem;
        }
      }
      #{$self}__chapter-list {
        display: flex;
        font-size: 1.2rem;
        align-items: center;
        p {
          font-size: 1.2rem;
        }
      }
    }
  }

  .v-icon {
  }
  .v-icon--link {
  }
}
</style>
