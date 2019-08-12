<template>
  <div class="mobile-detailed">
    <div class="mobile-detailed__container">
      <div class="mobile-detailed__cover">
        <v-img
          class="mobile-detailed__img"
          :src="book.cover"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="7rem"
        >
          <template v-slot:placeholder>
            <div class="mobile-detailed__loading">
              <trinity-rings-spinner :animation-duration="1500" :size="30" color="#ff1d5e" />
            </div>
          </template>
        </v-img>
      </div>
      <div class="mobile-detailed__meta">
        <div class="mobile-detailed__title" v-line-clamp="2">{{book.title}}</div>
        <div class="mobile-detailed__author">
          <div class="mobile-detailed__pen-name">{{book.pen_name}}・{{book.name}}</div>
        </div>
        <div class="mobile-detailed__genres">
          <div class="mobile-detailed__genre" v-for="(genre,index) in book.genres" :key="genre">
            <div class="mobile-detailed__genre-item" v-if="index < 3">{{genre}}</div>
          </div>
        </div>
        <div class="mobile-detailed__rating">
          <v-rating color="#FF8D29" readonly :size="15" half-increments :value="+book.rating"></v-rating>
          {{book.rating}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrinityRingsSpinner } from "epic-spinners";

export default {
  props: {
    book: Object
  },
  data() {
    return {
      lazyCover: require("@/assets/img/NobleCardLight.png")
    };
  },
  components: {
    TrinityRingsSpinner
  }
};
</script>

<style lang="scss">
.mobile-detailed {
  $self: &;
  &__container {
    padding: 1rem;
    display: flex;
    #{$self}__genres {
      display: flex;
      overflow: auto;
      @media screen and (max-width: 320px) {
        #{$self}__genre-item {
          font-size: 1.1rem !important;
          padding: 0.2rem 1rem !important;
        }
      }

      #{$self}__genre-item {
        padding: 0.25rem 2rem;
        border-radius: 2rem;
        margin-right: 1rem;
        font-size: 1.2rem;
        background-color: #e3e8ee;
        font-weight: bold;
        opacity: 0.8;
      }
    }
    #{$self}__meta {
      display: flex;
      flex-direction: column;
      #{$self}__title {
        font-weight: bold;
        font-size: 1.55rem;
        line-height: 1.8rem;
        margin-bottom: 0.5rem;
      }
      #{$self}__pen-name {
        color: #aab7c4;
        font-size: 1.3rem;
      }
    }
    #{$self}__cover {
      position: relative;
      padding-right: 1rem;

      #{$self}__img {
        border-radius: 0.5rem;
      }
      #{$self}__loading {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    #{$self}__rating {
      display: flex;
      align-items: center;
      // align-self: flex-end;
      justify-self: flex-end;
      margin-top: auto;
      font-size: 1.3rem;
      .v-icon {
        padding: 0;
      }
    }
  }
}
</style>
