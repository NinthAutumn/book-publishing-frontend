<template>
  <div class="mobile-toc" :class="`mobile-toc--${theme}`">
    <transition name="slide-right">
      <ul class="mobile-toc__volumes" v-touch:swipe.left="closeTOC" v-click-outside="closeTOC">
        <div class="mobile-toc__spinner" v-if="loading">
          <breeding-rhombus-spinner :animation-duration="1000" :size="50" color="#ff1d5e" />
        </div>
        <li class="mobile-toc__volume" v-for="volume in list" :key="volume.volume">
          <h3 class="mobile-toc__volume-title">{{`第${volume.volume}章 ${volume.title||""}`}}</h3>
          <ul class="mobile-toc__chapters">
            <nuxt-link
              v-ripple="{class:'ripple-color'}"
              tag="li"
              :to="`/books/${$route.params.id}/${chapter.id}`"
              class="mobile-toc__chapter"
              :class="{'mobile-toc__chapter--disable':chapter.locked&&!auth}"
              v-for="chapter in volume.chapters"
              :key="chapter.id"
            >
              <div class="flex-divider flex-row" style="width:100%;">
                <div class="mobile-toc__chapter-index">{{chapter.index}}</div>
                <div class="mobile-toc__chapter-meta">
                  <div class="mobile-toc__chapter-title">{{chapter.title}}</div>
                  <div
                    class="mobile-toc__chapter-date"
                  >{{$moment(chapter.created_at).startOf('minute').fromNow()}}</div>
                </div>
              </div>

              <div class="mobile-toc__chapter-locked">
                <fa
                  class="book-chapters_chapter-item__content--locked"
                  icon="lock"
                  v-if="chapter.locked&&!chapter.bought"
                ></fa>
                <fa
                  class="book-chapters_chapter-item__content--locked"
                  icon="unlock"
                  v-if="chapter.locked&&chapter.bought"
                ></fa>
              </div>
            </nuxt-link>
          </ul>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BreedingRhombusSpinner } from "epic-spinners";
export default {
  data() {
    return {
      loading: false
    };
  },
  props: { value: Boolean },
  created: function() {
    this.loading = true;
  },
  mounted: async function() {
    await this.$store.dispatch("chapter/fetchChapterList", {
      bookId: this.$route.params.id,
      state: "published",
      structured: true
    });
    this.loading = false;
    const chapter = document.querySelector(".nuxt-link-exact-active");
    // this.$refs.chapters;
    chapter.scrollIntoView();
  },
  computed: {
    ...mapGetters({
      list: "chapter/getChapterList",
      theme: "user/getTheme",
      auth: "auth/isAuthenticated"
    })
  },
  methods: {
    closeTOC: function() {
      this.$emit("toggle", 0);
    }
  },
  components: {
    BreedingRhombusSpinner
  }
};
</script>

<style lang="scss">
.mobile-toc {
  $self: &;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: fixed;
  // position
  top: 0;
  left: 0;
  // scroll-behavior: none;
  // background-color: rgba(65, 65, 65, 0.527);
  &--black {
    #{$self}__volumes {
      background-color: #030303;
      color: rgb(215, 218, 220);
      .ripple-color {
        color: rgb(146, 146, 146);
      }
    }
  }
  &--tan {
    #{$self}__volumes {
      background: url("../../../assets/noise/noise-tan-all.png");
      //  colo
      border: 1px solid #e7dfbd !important;
      // color: #2b352f !important;
      .ripple-color {
        color: rgb(146, 146, 146);
      }
    }
  }
  &__spinner {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__volumes {
    .nuxt-link-exact-active {
      color: $primary;
    }
    .ripple-color {
      color: rgb(206, 206, 206);
    }
    height: 100vh;
    position: fixed;

    top: 0;
    left: 0;
    width: 85vw;
    background-color: #fff;
    z-index: 1000;
    overflow: auto;

    #{$self}__volume {
      padding: 0 1rem;
    }
    #{$self}__chapters {
      #{$self}__chapter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 5rem;

        width: 100%;
        #{$self}__chapter-index {
          // align-self: flex-start;
          font-size: 1.5rem;
          width: 4.5rem !important;
        }
        #{$self}__chapter-meta {
          display: flex;
          // min-width: 75%;
          width: 75%;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }
        #{$self}__chapter-title {
          width: 100%;
          font-size: 1.5rem;
          word-break: break-word;
        }
        #{$self}__chapter-date {
          font-size: 1.2rem;
          color: darkgrey;
        }
        #{$self}__chapter-locked {
          // width: 2.5rem;
          color: #aab7c4;
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
