<template>
  <div class="author-info">
    <div class="author-info__container">
      <div class="author-info__meta">
        <div class="author-info__name" v-text="author.pen_name"></div>
        <a :href="`mailto:${author.email}`" class="author-info__contact" v-text="'連絡先'"></a>
      </div>
      <div class="author-info__avatar">
        <v-avatar size="100">
          <v-img :src="author.avatar"></v-img>
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      author: {}
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/author/${this.id}`);
    this.author = data;
  }
};
</script>

<style lang="scss">
.author-info {
  $self: &;
  // position: absolute;

  &__container {
    // background-color: #fff;

    display: flex;
    align-items: center;
    width: 20rem;
    justify-content: space-between;
    // justify-content:ce
    #{$self}__meta {
      // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
      #{$self}__name {
        margin-bottom: 1rem;
        font-size: 1.6rem;
      }
      #{$self}__contact {
        &:hover {
          cursor: pointer;
        }
        padding: 0.5rem 2rem;
        color: white;
        background-color: #2a2f45;
        border-radius: 0.5rem;
        font-size: 1.4rem;
      }
    }
    #{$self}__avatar {
    }
  }
}
</style>
