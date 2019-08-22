<template>
  <div class="review-card" ref="review" :class="{'review-card--mobile':mobile}">
    <div class="review-card__cover">
      <v-img
        class="review-card__image"
        :aspect-ratio="1/1.5"
        min-width="90"
        :width="imageWidth"
        min-height="135"
        :height="imageHeight"
        :src="review.cover"
        :lazy-src="cover"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="black "></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
    </div>
    <div class="review-card__meta">
      <div class="review-card__title">
        <fa class="review-card__icon review-card__icon--left" icon="quote-left"></fa>
        <p>{{review.title}}</p>
        <fa class="review-card__icon review-card__icon--right" icon="quote-right"></fa>
      </div>
      <v-rating color="#FF8D29" readonly size="20" half-increments :value="+review.rating"></v-rating>
      <div class="review-card__content" v-html="truncate(review.content,wordCount)"></div>
    </div>
    <div class="review-card__author" v-if="!$device.isMobile">
      <v-avatar :size="imgSize" class="review-card__avatar">
        <v-img :src="review.avatar.img"></v-img>
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
    mobile: Boolean,
    user: Object,
    book: Object,
    height: Number
  },
  data() {
    return {
      width: 0,
      cover: require("~/assets/img/cover.png"),
      imageWidth: 130,
      wordCount: 200,
      imgSize: 60,
      iconMargin: 10,
      imageHeight: 202.5
    };
  },
  // updated() {
  //   this.handleResize();
  // },
  created() {},
  mounted() {
    // this.handleResize();
    // window.addEventListener("onload", this.handleResize);
    // window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // window.removeEventListener("resize", this.handleResize);
    // window.removeEventListener("onload", this.handleResize);
  },
  methods: {
    // handleResize: function() {
    //   this.width = this.$refs.review.clientWidth;

    //   this.imageWidth = this.width / 4;
    //   this.imageHeight = (this.width / 4) * 1.5;

    //   this.wordCount = this.width / 6;
    //   this.imgSize = this.width / 10;
    // },
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  },
  filters: {}
};
</script>

<style lang="scss">
// .review-card {
//   $self: &;
//   display: flex;
//   align-items: center;
//   background-color: #ffffff;

//   position: relative;
//   // min-height: 15rem;
//   // max-width: 60rem;
//   // min-width: 34rem;
//   border-radius: 2rem;
//   &:hover {
//     #{$self}__cover {
//       // transform:
//       clip-path: none;
//       transition: 200ms;
//       // transition: clip-path 300ms;
//       #{$self}__image {
//         // transform: scale(0.9) perspective(2910px) rotateY(20deg) rotateX(5deg)
//         //   rotate(-1deg);
//         &::after {
//         }
//       }
//     }
//   }
//   &__cover {
//     z-index: 1;
//     position: relative;
//     // clip-path: ellipse(130px 140px at 10% 20%);
//     transition: 200ms;
//     #{$self}__image {
//       // position:absolute;
//       border-radius: 0.6rem;
//       transform: translateY(-10%);
//       transition: transform 200ms;
//       box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
//         0 3px 9px 0 rgba(0, 0, 0, 0.08);
//     }
//     margin-right: 2rem;
//   }
//   // &__author {
//   //   position: absolute;
//   //   right: 1rem;
//   //   bottom: 1rem;
//   //   z-index: 1;
//   //   #{$self}__avatar {
//   //     box-shadow: 0 12px 18px 0 rgba(50, 50, 93, 0.11),
//   //       0 3px 9px 0 rgba(0, 0, 0, 0.08);
//   //   }
//   // }
//   &__meta {
//     z-index: 1;
//     display: flex;
//     align-self: flex-start;
//     flex-direction: column;
//     justify-content: flex-start;
//     height: 100%;
//     #{$self}__title {
//       #{$self}__icon {
//         &--left {
//           margin-right: 1rem;
//         }
//         &--right {
//           margin-left: 1rem;
//         }
//       }

//       display: flex;
//       p {
//         max-width: 100%;
//         font-size: 3vh;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//       }
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       overflow: hidden;
//       // margin-bottom: 2rem;
//     }
//     #{$self}__content {
//       display: -webkit-box;
//       -webkit-line-clamp: 3;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//       p {
//         font-size: 2vh;
//         display: -webkit-box;
//         -webkit-line-clamp: 5;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//       }
//     }
//   }
//   .v-icon {
//     padding: 0 !important;
//   }
//   &--mobile {
//     width: 80vw;
//     height: 150px !important;
//     #{$self}__image {
//       transform: translateX(0);
//     }
//     border-radius: 8px;
//   }
//   // transform: rotateX(0deg) rotateY(0deg);
//   // transform: rotateX(-100deg);
//   transition: 300ms;
//   &:hover {
//     transition: 300ms;
//   }
//   // background-color: $review-color;
//   // margin: 2rem 1rem;
//   // margin-left: 1px;
//   // margin-bottom: 5rem;
//   // margin-right: 10px;
//   // border-radius: 5px;

//   // height: 20vh;
//   // width: 40%;
//   /* margin-right: 10px; */
//   margin-top: 2rem;
//   margin: 2rem;

//   padding: 10px;
//   border-radius: 0.4rem;
//   -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
//     0 1px 3px rgba(0, 0, 0, 0.08);
//   box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//   -webkit-transition-duration: 0.15s;
//   transition-duration: 0.15s;
//   // box-sizing: border-box;
//   // align-items: center;

//   &__profile {
//     // justify-content:space-
//     // margin-left: 10px;
//     margin: 0 5px 0 0px;
//     align-items: center;
//     &__pic {
//       width: 100px;
//       border-radius: 100px;
//       -webkit-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
//       -moz-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
//       box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
//     }
//     &__username {
//       // text-align: center;
//     }
//   }
//   &__info {
//     width: 60%;
//     &__title {
//       font-size: 18px;

//       overflow: hidden;
//       white-space: nowrap;
//       height: 25px;
//       text-overflow: ellipsis;
//     }
//     &__rating {
//       .vue-star-rating-rating-text {
//         margin: 0 !important;
//         font-size: 12px;
//       }
//     }
//     &__content {
//       p {
//         font-size: 13px;
//         span {
//           font-size: 13px;
//         }
//       }
//       overflow: hidden;
//       line-height: 28px;
//       height: 180px;
//       word-break: break-word;

//       // width: 70%;
//       // text-overflow: ellipsis;
//     }
//   }
//   &__book {
//     align-items: center;
//     width: 20%;
//     &__cover {
//       &__item {
//         height: 11.9rem;
//         width: 8.1rem;
//         // border-radius: 10px;
//       }
//     }
//   }
// }

// @media screen and (max-width: 1080px) {
//   .review-card__book {
//     display: none;
//   }
//   .review-card__info__title {
//     font-size: 16px;
//   }
//   .review-card__info__content {
//     font-size: 14px;
//   }
// }

// @media screen and (max-width: 1264px) {
//   .review-card {
//     &__book {
//       align-items: center;
//       width: 20%;
//       &__cover {
//         &__item {
//           height: 9.9rem;
//           width: 6.1rem;
//           border-radius: 10px;
//         }
//       }
//     }
//     &__button {
//       width: 6.1rem;
//     }
//     .review-card__book {
//       // height: 15px;
//       display: none;
//     }
//   }
//   .review-card__info__title {
//     font-size: 16px;
//   }
//   .review-card__info__content {
//     font-size: 14px;
//   }
// }
</style>
