<template>
  <div id="ranking-list">
    <div class="ranking-select">
      <ul class="ranking-select__list">
        <transition-group name="list" class="ranking-select__container">
          <li
            v-for="(type, index) in ranking_type"
            :key="index"
            class="ranking-select__item"
            @click="select_menu(type.key,index)"
            :class="{first: index === 0, last: index === 2,selected:type.selected}"
          >
            <fa class="ranking-select__icon" :icon="type.icon"></fa>
            {{type.key}}
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="ranking-select__options">
      <div class="ranking-date" v-if="selected_ranking_type === 0|| selected_ranking_type=== 2">
        <Select
          v-model="time_day"
          name="時間"
          def="日間"
          :object="sort_type"
          :mheight="125"
          transition="grow-shrink"
        ></Select>
      </div>
    </div>
    <ul class="book-list" v-if="selected_ranking_type === 0">
      <ranking-item
        :index="index"
        :score="book.sum"
        :book="book.book[0]"
        v-for="(book, index) in list"
        :key="index"
      ></ranking-item>
    </ul>
    <ul class="book-list" v-if="selected_ranking_type === 1">
      <ranking-item
        :index="index"
        trending
        :score="book.sum"
        :book="book.book[0]"
        v-for="(book, index) in trending"
        :key="index"
      ></ranking-item>
    </ul>
  </div>
</template>

<script>
import RankingItem from "./RankingItem";
import Select from "@/components/All/Select";

export default {
  components: { RankingItem, Select },
  data() {
    return {
      ranking_type: [
        { key: "総合", value: 0, selected: true, icon: "layer-group" },
        { key: "急上昇中", value: 1, selected: false, icon: "fire" },
        { key: "ジャンル", value: 2, selected: false, icon: "landmark" }
      ],
      selected_ranking_type: 0,
      sort_type: [
        { key: "日間", value: 1 },
        { key: "週間", value: 7 },
        { key: "月間", value: 31 },
        { key: "年間", value: 365 },
        { key: "総合", value: "whole" }
      ],
      time_day: 0
    };
  },
  computed: {
    list() {
      return this.$store.getters["ranking/getRankingList"];
    },
    trending() {
      return this.$store.getters["ranking/getTrendingList"];
    }
  },
  async mounted() {
    await this.$store.dispatch("ranking/fetchRanking", {
      limit: 10,
      page: 1,
      days: 1
    });
  },
  watch: {
    time_day: function(val) {
      this.composite_time();
    },
    selected_ranking_type: function(val) {
      this.changeListType();
    }
  },
  methods: {
    async changeListType() {
      if (this.selected_ranking_type === 0) {
      } else if (this.selected_ranking_type === 1) {
        if (this.trending.length > 0) {
          return;
        }
        await this.$store.dispatch("ranking/fetchTrending", {
          days: this.time_day,
          limit: 10,
          page: 1
        });
      }
    },
    async composite_time() {
      if (this.time_day !== "whole") {
        await this.$store.dispatch("ranking/fetchRanking", {
          days: this.time_day,
          limit: 10,
          page: 1
        });
      } else {
        await this.$store.dispatch("ranking/fetchRanking", {
          limit: 10,
          page: 1
        });
      }
    },
    select_menu(key, index) {
      this.ranking_type.forEach(type => {
        if (type.key === key) {
          type.selected = true;
        } else {
          type.selected = false;
        }
      });
      this.selected_ranking_type = index;
    }
  }
};
</script>

<style lang="scss">
#ranking-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .book-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    // width: 1010px;
  }
  .ranking-select {
    user-select: none;
    &__icon {
      margin-right: 5px;
    }
    &__list {
      display: flex;
      justify-content: center;
      height: 45px;
      .selected {
        color: white;
        background-color: #f4648a;
      }
      .first {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .last {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    &__container {
      display: flex;
      border-radius: 10px;
      box-shadow: 1px 1px 5px rgb(243, 243, 243);
    }
    &__item {
      height: 100%;
      width: 120px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        user-select: none;
        cursor: pointer;
        color: white;
        background-color: #f4648a;
      }
      // box-shadow: 1px 1px 5px grey;
    }
    &__options {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .ranking-date {
    width: 100px;
  }
  .first {
    // grid-area: first;
  }
  .second {
    // grid-area: second;
  }
  .third {
    // grid-area: third;
  }
  .others {
  }
}
</style>
