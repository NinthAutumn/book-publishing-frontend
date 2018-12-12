<template>
  <div class="swiping-page">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="book in books" :key="book.id">
          <Book :book="book" :size="size = 'big'"></Book>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Book from "~/components/Book";
export default {
  data() {
    return {
      books: [
        {
          title: "神達に拾われた男",
          cover: require("~/assets/bookcover.png"),
          rating: 5,
          synopsis:
            "ウィズに正体を暴露され、バニルに金をむしられたダークプリースト・セレナはカズマとの交渉の末、これから行うことを口外しないようお互い約束する。これをきっかけに再びアクセルの街に波乱が訪れ——!? ※電子特別版として、暁なつめ書き下ろしショートストーリー収録！"
        },
        {
          title: "この素晴らしい世界に祝福を!",
          cover: require("~/assets/book1.jpeg"),
          rating: 4.3
          synopsis: "時限爆弾を領主の家にテレポートさせたカズマは、国家転覆罪の容疑で裁判にかけられることに。アクアの不祥事のせいで、カズマに不利な証言が続く中、いよいよ判決が下される。「うん。死刑」……俺、また死ぬの？　電子版特典として、電子限定書き下ろし短編『眠れる森のクルセイダー』を特別収録！"
        },
        {
          title:
            "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
          cover: require("~/assets/book2.jpeg"),
          rating: 2.5,
          synopsis: "時限爆弾を領主の家にテレポートさせたカズマは、国家転覆罪の容疑で裁判にかけられることに。アクアの不祥事のせいで、カズマに不利な証言が続く中、いよいよ判決が下される。「うん。死刑」……俺、また死ぬの？　電子版特典として、電子限定書き下ろし短編『眠れる森のクルセイダー』を特別収録！"
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/bookcover.png"),
          rating: 3.4,
          synopsis: "時限爆弾を領主の家にテレポートさせたカズマは、国家転覆罪の容疑で裁判にかけられることに。アクアの不祥事のせいで、カズマに不利な証言が続く中、いよいよ判決が下される。「うん。死刑」……俺、また死ぬの？　電子版特典として、電子限定書き下ろし短編『眠れる森のクルセイダー』を特別収録！"
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/book1.jpeg"),
          rating: 1.2,
          synopsis: "時限爆弾を領主の家にテレポートさせたカズマは、国家転覆罪の容疑で裁判にかけられることに。アクアの不祥事のせいで、カズマに不利な証言が続く中、いよいよ判決が下される。「うん。死刑」……俺、また死ぬの？　電子版特典として、電子限定書き下ろし短編『眠れる森のクルセイダー』を特別収録！"
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/book2.jpeg"),
          rating: 4.5,
          synopsis: "時限爆弾を領主の家にテレポートさせたカズマは、国家転覆罪の容疑で裁判にかけられることに。アクアの不祥事のせいで、カズマに不利な証言が続く中、いよいよ判決が下される。「うん。死刑」……俺、また死ぬの？　電子版特典として、電子限定書き下ろし短編『眠れる森のクルセイダー』を特別収録！"
        },
        {
          title: "この素晴らしい世界に祝福を!",
          cover: require("~/assets/book1.jpeg")
        },
        {
          title:
            "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
          cover: require("~/assets/book2.jpeg")
        },
        {
          title: "この素晴らしい世界に祝福を!",
          cover: require("~/assets/book1.jpeg")
        },
        {
          title:
            "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
          cover: require("~/assets/book2.jpeg")
        }
      ],
      swiperOption: {
        // loop: true,
        slidesPerView: "7",
        // centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        },
        mousewheel: {
          invert: true,
          sensitivity: 10,
          forceToAxis: true
        },
        on: {
          slideChange() {
            console.log("onSlideChangeEnd", this);
          },
          tap() {
            console.log("onTap", this);
          }
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };
  },
  components: {
    Book
  }
};
</script>
<style lang="scss">
.my-swiper {
  height: 300px;
  width: 100%;
  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}

.swiping-page {
  // margin-left: 24rem;
  // margin-top: 5rem;
  // padding: 1rem 5rem;
}
</style>
