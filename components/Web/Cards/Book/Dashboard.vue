<template>
  <div class="dashboard-book">
    <div class="dashboard-book__container">
      <div class="dashboard-book__content flex-row flex--between">
        <div class="dashboard-book__information">
          <div class="dashboard-book__title" v-text="book.title"></div>
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(value,key) in stats" :key="key">
                <div class="dashboard-book__item">
                  <div class="dashboard-book__name" v-text="key"></div>
                  <div class="dashboard-book__data" v-text="value"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-book__cover">
          <v-img
            class="book-card__img"
            :src="`${book.cover}/m`"
            :lazy-src="lazyCover"
            :aspect-ratio="1/1.5"
            width="100%"
          ></v-img>
        </div>
      </div>

      <div class="dashboard-book__footer flex-row flex--align flex--between">
        <div class="dashboard-book__actions flex-row flex--align">
          <div
            @click.stop="$emit('toggleAnnouncement',book.id)"
            class="dashboard-book__action dashboard-book__action--news"
          >
            <fa icon="newspaper"></fa>
          </div>
          <nuxt-link
            :to="`/dashboard/books/${book.id}/published`"
            class="dashboard-book__action dashboard-book__action--toc"
          >
            <fa icon="scroll"></fa>
          </nuxt-link>
          <nuxt-link
            :to="`/dashboard/books/new?bookId=${book.id}`"
            class="dashboard-book__action dashboard-book__action--setting"
          >
            <fa icon="cog"></fa>
          </nuxt-link>
        </div>
        <nuxt-link
          tag="div"
          class="dashboard-book__chapter"
          :to="`/dashboard/books/${book.id}/new`"
          v-text="'話を投稿'"
        ></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    book: Object
  },
  data() {
    return {
      lazyCover: require("~/assets/img/NobleCardLight.png"),
      stats: {},
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 5,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        on: {},
        breakpoints: {}
      }
    };
  },
  async mounted() {
    const data = await this.$store.dispatch("dashboard/fetchBookStats", {
      bookId: this.book.id
      // type: this.type
    });
    this.stats = data;
  }
};
</script>

<style lang="scss">
.dashboard-book {
  $self: &;
  &__container {
    .swiper-slide {
      width: 16rem;
    }
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(243, 243, 243);
    // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
    //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
    #{$self}__content {
      margin-bottom: 1rem;
      width: 100%;
      #{$self}__information {
        margin-right: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #{$self}__title {
        font-size: 1.8rem;
        // font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    #{$self}__item {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 1rem;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 1rem;
      width: 14rem;
      #{$self}__name {
        color: grey;
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
      #{$self}__data {
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
    #{$self}__actions {
      #{$self}__action {
        display: flex;

        align-items: center;
        justify-content: center;
        // width:
        height: 3.5rem;
        width: 3.5rem;
        font-size: 1.4rem;
        color: white;
        background-color: #2a2f45;
        user-select: none;
        &:hover {
          cursor: pointer;
        }
        border-radius: 0.5rem;
        &--news {
          margin-right: 1rem;
          background-color: #2a2f45;
        }
        &--toc {
          margin-right: 1rem;
        }
      }
    }
    #{$self}__chapter {
      font-size: 1.4rem;
      color: white;
      height: 3.5rem;
      width: 20%;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
      // background-color: #
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2a2f45;
      border-radius: 0.5rem;
    }
    #{$self}__list {
    }

    #{$self}__cover {
      width: 20%;
      min-width: 20%;
      overflow: hidden;
      border-radius: 0.5rem;
    }
  }
}
</style>
