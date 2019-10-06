<template>
  <div class="mobile-chapter__bottom" :class="'mobile-chapter__bottom--'+ theme">
    <div class="mobile-chapter__navigation flex-row flex--align">
      <div class="mobile-chapter__nav" @click="$emit('prev')">
        <fa icon="chevron-left"></fa>
      </div>
      <el-slider v-model="selected" :format-tooltip="formatTooltip" :max="max" @change="change"></el-slider>
      <div class="mobile-chapter__nav" @click="$emit('next')">
        <fa icon="chevron-right"></fa>
      </div>
    </div>
    <div class="mobile-chapter__options">
      <div class="mobile-chapter__option" v-ripple @click.stop="$emit('modalChange',5)">
        <fa icon="list"></fa>
      </div>
      <div class="mobile-chapter__option" v-ripple @click.stop="$emit('modalChange',1)">
        <fa icon="tint"></fa>
      </div>
      <div class="mobile-chapter__option" v-ripple @click.stop="$emit('modalChange',2)">
        <fa icon="font"></fa>
      </div>
      <div class="mobile-chapter__option" v-ripple @click.stop="$emit('modalChange',4)">
        <fa icon="comment"></fa>
      </div>
      <div class="mobile-chapter__option" v-ripple @click.stop="$emit('modalChange',3)">
        <fa icon="image"></fa>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async created() {},
  mounted() {
    // console.log(this.simpleList);
    this.selected = this.chapter.index || -this.chapter.setting_index;
    this.max = this.simpleList[this.simpleList.length - 1].index;
    this.min = this.simpleList[0].setting_index || 0;
  },
  props: {
    theme: String
  },
  computed: {
    ...mapGetters({
      simpleList: "chapter/getSimpleList",
      chapter: "chapter/getChapter"
    })
  },
  data() {
    return {
      selected: 0,
      min: 0,
      max: 0
    };
  },
  methods: {
    ...mapActions({
      fetchList: "chapter/fetchChapterList"
    }),
    formatTooltip(val) {
      return `${((val / this.max) * 100).toFixed(0)}%`;
    },
    change: function() {
      this.simpleList.forEach(chap => {
        if (chap.index === this.selected) {
          this.$router.push(`/books/${this.$route.params.id}/${chap.id}`);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mobile-chapter {
  $self: &;
  &__bottom {
    position: fixed;
    bottom: -1px;
    height: 12rem;
    left: 0;
    width: 100vw;
    z-index: 100;
    &--black {
      background-color: #19191a;
      color: #949698;
    }
    &--tan {
      background-color: #e9e1b8;
    }
    background-color: white;
    // padding: 2rem;
    padding: 1rem;
    box-sizing: border-box;

    #{$self}__options {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      #{$self}__option {
        width: 5rem;
        height: 5rem;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    #{$self}__nav {
      font-size: 2.5rem;
      padding: 1rem 1.5rem;
    }
    .el-slider__bar {
      background-color: #3b66f5;
    }
    .el-tooltip {
      background-color: #3b66f5;
      border: 0;
    }
    .el-slider {
      flex-grow: 1;
    }
  }
}
</style>
