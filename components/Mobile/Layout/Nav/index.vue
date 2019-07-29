<template>
  <div class="layout-main">
    <div class="layout-main__container">
      <div class="layout-main__list">
        <div class="layout-main__item" v-for="(menu,key) in menus" :key="key">
          <div class="layout-main__item-container" :style="menu.style">
            <fa class="layout-main__icon" :icon="menu.icon"></fa>
          </div>
          <div class="layout-main__text" v-text="menu.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: {
        search: {
          style: {
            color: "white",
            background:
              "#7328C3 linear-gradient(-225deg, rgb(178, 107, 255) 0%, #7328C3 100%)",
            boxShadow: "0 2px 4px 0 rgb(178, 107, 255,0.24)"
          },
          icon: "search",
          text: "検索"
        },

        update: {
          style: {
            background:
              "  #00D3D8  linear-gradient(-225deg, rgb(52, 240, 243) 0%,   #00D3D8 100%)",
            color: "white",
            textShadow: "0 1px 3px rgba(36, 180, 126, 0.4)",
            boxShadow: "0 2px 4px 0 rgb(52, 240, 243,0.24) "
          },
          icon: "globe",
          text: "更新"
        },
        ranking: {
          style: {
            background:
              " #f53165 linear-gradient(-225deg, #fb5f9e 0%, #f53165 100%)",
            color: "white",
            boxShadow: "0 2px 4px 0 rgba(245, 49, 101, 0.24)"
          },
          icon: "fire",
          text: "ランキング"
        },
        library: {
          style: {
            background:
              "#ff8d29 linear-gradient(-225deg, #ffc152 0%, #ff8d29 100%)",
            color: "white",
            boxShadow: "0 2px 4px 0 rgba(255, 141, 41, 0.24)"
          },
          icon: "book-open",
          text: "本棚"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.layout-main {
  $self: &;
  &__container {
    #{$self}__list {
      display: flex;
      margin-top: 2rem;
      justify-content: space-around;
      #{$self}__item {
        transition: 200ms;
        padding: 1rem;
        transform: scale(1);
        border-radius: 0.5rem;
        &:active,
        &:focus,
        &:hover {
          background-color: rgb(241, 241, 241);
          transform: scale(0.98);
          transition: 200ms;
        }

        #{$self}__item-container {
          width: 5rem;
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          font-size: 2rem;
          background-color: grey;
        }
        #{$self}__text {
          margin-top: 0.5rem;
          color: #5a5b66;
          text-align: center;
        }
        display: flex;
        flex-direction: column;

        // justify-content: center;
      }
      // color:
    }
  }
}
</style>
