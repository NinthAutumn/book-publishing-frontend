<template>
  <li class="sublist-content">
    <nuxt-link
      tag="a"
      :to="`/books/${$route.params.id}/${chapter.id}`"
      class="sublist-content__container"
      v-ripple
    >
      <div class="sublist-content__index">{{chapter.index}}</div>
      <div class="sublist-content__meta">
        <div class="sublist-content__title">{{chapter.title}}</div>
        <div class="sublist-content__divider">
          <div class="sublist-content__date">{{formatCreatedAt()}}</div>
          <div class="sublist-content__locked" v-if="chapter.locked">
            <fa :icon="chapter.bought?'unlock':'lock'"></fa>
          </div>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    chapter: {
      type: Object
    }
  },
  methods: {
    formatCreatedAt() {
      const TODAY = this.$moment().toDate();
      let date = "";
      if (
        TODAY <
          this.$moment(this.chapter.created_at)
            .add(6, "days")
            .toDate() &&
        this.chapter.created_at
      ) {
        date = this.$moment(this.chapter.created_at)
          .startOf("minute")
          .fromNow();
      } else {
        date = this.$moment(this.chapter.created_at).format("l");
      }
      return date;
    }
  }
};
</script>

<style lang="scss">
.sublist-content {
  $self: &;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &__container {
    display: flex;
    width: 100%;
    max-width: 100%;
    padding: 1rem;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #fff;
    #{$self}__index {
      font-size: 1.5rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    #{$self}__meta {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      #{$self}__title {
        font-size: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.5rem;
      }
      #{$self}__divider {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #{$self}__date {
        font-size: 1.3rem;
      }
      #{$self}__locked {
        font-size: 1.3rem;
      }
    }
  }
}
</style>
