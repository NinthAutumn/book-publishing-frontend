<template>
  <div class="recommendation-books" :class="{'recommendation-books--mobile': $device.isMobile}">
    <div class="recommendation-books__list" v-if="loading">
      <book-skeleton v-for="i in 6" :key="i"></book-skeleton>
    </div>

    <div class="recommendation-books__list" v-else>
      <nuxt-link
        tag="div"
        :to="'/books/' + book.id"
        class="recommendation-books__item"
        v-for="book in books"
        :key="book.id"
        v-ripple=" $device.isMobile"
      >
        <div class="recommendation-books__cover" ref="cover">
          <v-img
            :src="book.cover + `/m`"
            :aspect-ratio="1/1.5"
            :lazy-src="cover"
            max-width="12rem"
            alt="Book cover"
            style="border-radius: 0.4rem;     box-shadow: 0 2px 5px 0 rgba(60,66,87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, .07); "
            class="recommendation-books__img"
          ></v-img>
          <div
            v-if="!$device.isMobile"
            class="recommendation-books__status"
            :class="{'recommendation-books__status--completed':book.status === 'completed'}"
            v-text="status(book.status)"
          ></div>
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
              <p>{{book.chapter_count}} chapters</p>
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
      cover: require("~/assets/img/NobleCardLight.png?size=200"),
      cover_size: 0,
      loading: true,
      status_types: {
        completed: "完結",
        ongoing: "連載中",
        hiatus: "休憩中"
      }
    };
  },
  components: {
    BookSkeleton: () => import("@/components/Web/Cards/Skeleton/RBook")
  },
  beforeMount() {
    this.loading = false;
  },
  mounted() {
    this.cover_size = this.$refs.cover.clientWidth;
  },
  methods: {
    status(status) {
      return this.status_types[status];
    }
  },
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
    #{$self}__meta {
      width: 100% !important;
    }
    #{$self}__list {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      /* autoprefixer: ignore next */
      grid-gap: 0.5rem;
      padding: 0;
      #{$self}__item {
        margin: 0;
        flex-direction: column;
        width: 100%;
        margin-right: 0 !important;
        #{$self}__cover {
          margin: 0;

          width: 100% !important;
          min-width: 8rem !important;
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
        word-break: break-word;
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
        padding: 0 !important;
        margin-top: 0.5rem;
      }
    }
  }
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, 1fr);
    /* autoprefixer: ignore next */
    grid-gap: 1.5rem;
    padding-right: 2rem;
    #{$self}__item {
      display: flex;
      &:hover {
        cursor: pointer;
      }
      #{$self}__cover {
        position: relative;
        margin-right: 2rem;
        width: 45%;
        max-width: 12rem;
        min-width: 12rem;
        #{$self}__status {
          font-size: 1.2rem;
          position: absolute;
          bottom: 0;
          left: 0;
          border-radius: 0.5rem;
          padding: 0.3rem 1rem;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
          color: white;
          font-weight: bold;
          background-color: #2a2f45;
          &--completed {
            background-color: white;
            // text-shadow: 1px 1px 5px #2a2f4527;
            color: #2a2f45;
          }
        }
        #{$self}__img {
          &:hover {
            transition: 200ms;
          }
          transition: 200ms;
        }
      }
      #{$self}__meta {
        width: 50%;
        padding: 1rem 0;
      }
      #{$self}__title {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        word-break: break-all;

        span {
          font-size: 1.6rem;
          // word-break: break-all;
        }
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
