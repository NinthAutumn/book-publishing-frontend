<template>
  <div class="dash-booklist">
    <ul class="dash-booklist__list">
      <li class="dash-booklist__item" v-for="(book, index) in books" :key="index">
        <Book :book="book"></Book>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array
  },
  data() {
    return {
      image: false
    };
  },
  components: {
    Book: () => import("./Book")
  }
};
</script>

<style lang="scss">
.dash-booklist {
  $self: &;
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    #{$self}__item {
      // width: 100%;
      // border-radius: 0.8rem;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-evenly;
      // position: relative;
      // background-color: #fff;

      // padding: 1rem;
      // &:hover {
      //   box-shadow: 1px 1px 10px rgb(255, 216, 255);
      //   // background-color: rgb(248, 248, 248);
      // }
    }
    // #{$self}__edit {
    //   font-size: 2rem;
    //   position: absolute;
    //   right: 1rem;
    //   top: 1rem;
    //   color: grey;
    // }
    // #{$self}__cover {
    //   // width: 13rem;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   // margin: 0 auto;
    //   margin-bottom: 0.5rem;
    //   position: relative;
    //   &:hover {
    //     // cursor: pointer;
    //   }
    // }
    // #{$self}__camera {
    //   font-size: 3.5rem;

    //   // top: 50%;
    //   // bottom: 50%;
    //   // margin: auto;
    //   position: absolute;
    //   z-index: 0;
    // }
    // #{$self}__title {
    //   font-size: 1.6rem;
    //   text-align: center;
    //   margin-bottom: 1rem;
    // }
    // #{$self}__stats-list {
    //   padding: 1rem;
    //   background-color: rgb(250, 250, 250);
    //   // border-radius: 1rem;
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-evenly;
    //   margin-bottom: 1rem;
    //   #{$self}__stats-item {
    //     // border-right: 1px solid grey;
    //     // padding: 0.5rem;
    //     // border-right: 1px solid rgb(241, 241, 241);
    //   }
    //   #{$self}__stats-title {
    //     font-size: 1.4rem;
    //     text-align: center;
    //   }
    //   #{$self}__stats-content {
    //     font-size: 1.2rem;
    //     color: grey;
    //     text-align: center;
    //   }
    // }
    // #{$self}__buttons {
    //   display: flex;
    //   justify-content: space-evenly;
    //   #{$self}__button {
    //     padding: 0.75rem 3rem;
    //     font-size: 1.4rem;
    //     &:hover {
    //       cursor: pointer;
    //       user-select: none;
    //     }
    //     &--chapter {
    //       background-color: #8860d0;
    //       color: white;
    //       &:hover {
    //         background-color: #fff;
    //         color: $primary;
    //         box-shadow: 1px 1px 5px $primary;
    //         transition: 300ms;
    //       }
    //     }
    //     &--create-chapter {
    //       background-color: $secondary;
    //       color: white;
    //       &:hover {
    //         background-color: #fff;
    //         color: $secondary;
    //         box-shadow: 1px 1px 5px $secondary;
    //         transition: 300ms;
    //       }
    //     }
    //     &--announcement {
    //       background-color: rgb(164, 136, 214);
    //       color: white;
    //       &:hover {
    //         background-color: #fff;
    //         color: rgb(164, 136, 214);
    //         box-shadow: 1px 1px 5px $primary-lighter;
    //         transition: 300ms;
    //       }
    //     }
    //   }
    // }
  }
}
</style>
