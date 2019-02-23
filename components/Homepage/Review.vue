<template>
  <div class="review-card flex flex-row--between">
    <div class="review-card__profile flex-column">
      <div class="divider">
        <img class="review-card__profile__pic" :src="this.review._id.user[0].avatar" alt>
      </div>
      <div class="divider">
        <p class="review-card__profile__username">{{review._id.review[0].author}}</p>
      </div>
    </div>
    <div class="review-card__info flex-column flex--grow">
      <div class="divider flex-row flex--align">
        <div class="review-card__info__title">{{review._id.review[0].title}}</div>
      </div>
      <div class="review-card__info__content" v-html="review._id.review[0].content"></div>
    </div>
    <div class="review-card__book flex-column flex--center flex--around">
      <div class="review-card__info__rating">
        <no-ssr>
          <star-rating
            v-model="review._id.review[0].rating.total"
            :star-size="17"
            :read-only="true"
            :show-rating="false"
            inactive-color="#D8D7D5"
            active-color="#FFB727"
            :increment="0.01"
            :round-start-rating="false"
            border-color="#FFB727"
            class="star-rating"
          ></star-rating>
        </no-ssr>
      </div>

      <div class="review-card__book__cover">
        <img
          class="review-card__book__cover__item"
          :src="'https://storage.googleapis.com/theta-images/' + review._id.book[0].cover"
        >
      </div>
      <div class="review-card__button button button--small button--primary--open">Read</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object
  },
  created() {
    // console.log(this.review._id.user[0].avatar);
  },
  filters: {
    truncate: (string, number) => {
      if (string.length > 8) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss">
.review-card {
  // transform: rotateX(0deg) rotateY(0deg);
  // transform: rotateX(-100deg);
  transition: 300ms;
  &:hover {
    transition: 300ms;
  }
  // background-color: $review-color;
  border: 2px solid $review-color;
  margin: 10px 5px;
  margin-left: 1px;
  margin-right: 10px;
  // border-radius: 5px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
  -moz-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
  box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
  // height: 20vh;
  // width: 40%;
  /* margin-right: 10px; */
  padding: 10px;
  // box-sizing: border-box;
  // align-items: center;

  &__profile {
    // justify-content:space-
    // margin-left: 10px;
    margin: 0 5px 0 0px;
    align-items: center;
    &__pic {
      width: 100px;
      border-radius: 100px;
    }
    &__username {
      // text-align: center;
    }
  }
  &__info {
    width: 60%;
    &__title {
      font-size: 18px;
      overflow: hidden;
      white-space: nowrap;
      height: 25px;
      text-overflow: ellipsis;
    }
    &__rating {
      .vue-star-rating-rating-text {
        margin: 0 !important;
        font-size: 12px;
      }
    }
    &__content {
      overflow: hidden;
      font-size: 15px;
      line-height: 28px;
      height: 20vh;
      // width: 70%;
      // text-overflow: ellipsis;
    }
  }
  &__book {
    align-items: center;
    width: 20%;
    &__cover {
      &__item {
        height: 11.9rem;
        width: 8.1rem;
        // border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .review-card__book {
    display: none;
  }
  .review-card__info__title {
    font-size: 16px;
  }
  .review-card__info__content {
    font-size: 14px;
  }
}

@media screen and (max-width: 1264px) {
  .review-card {
    &__book {
      align-items: center;
      width: 20%;
      &__cover {
        &__item {
          height: 9.9rem;
          width: 6.1rem;
          border-radius: 10px;
        }
      }
    }
    &__button {
      width: 6.1rem;
    }
    .review-card__book {
      // height: 15px;
      display: none;
    }
  }
  .review-card__info__title {
    font-size: 16px;
  }
  .review-card__info__content {
    font-size: 14px;
  }
}
</style>
