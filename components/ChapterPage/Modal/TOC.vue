<template>
  <div class="table-content">
    <div class="loading" v-if="loading">loading...</div>
    <ul class="table-content__volume-list" v-else>
      <li class="table-content__volume-item" v-for="(volume, index) in toc" :key="index">
        <h3>第{{volume.volume}}章 {{volume.title}}</h3>
        <ul class="table-content__chapter-list">
          <nuxt-link
            tag="li"
            v-ripple="{class:'ripple-color'}"
            class="table-content__chapter-item"
            v-for="(chapter,index) in volume.chapters"
            :to="`/books/${$route.params.id}/${chapter.id}`"
            :key="index"
          >
            <div class="table-content__chapter-item__title">{{chapter.index}}話 {{chapter.title}}</div>
            <div
              class="table-content__chapter-item__created_at"
            >{{$moment(chapter.created_at).startOf('hour').fromNow()}}</div>
          </nuxt-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/getChapterList"];
    },
    loading() {
      return this.$store.state.chapter.loading;
    }
  },
  async mount() {}
};
</script>

<style lang="scss">
.table-content {
  /* position: sticky; */
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  /* height: 100vh; */
  $self: &;
  .ripple-color {
    color: rgb(206, 206, 206);
  }
  .nuxt-link-exact-active {
    color: $primary;
  }
  &__volume-list {
    #{$self}__volume-item {
      h3 {
        height: 5rem;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
      }
    }
    #{$self}__chapter-list {
      #{$self}__chapter-item {
        user-select: none;
        border-bottom: 1px solid rgb(155, 155, 155);
        padding: 0.5rem;
        &:hover {
          cursor: pointer;
        }
        &__title {
          font-size: 1.5rem;
        }
        &__created_at {
          align-self: flex-end;
          font-size: 1.3rem;
        }
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
        height: 4.5rem;
      }
    }
  }
}
</style>
