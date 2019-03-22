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
    <ul class="book-list">
      <ranking-item
        :index="index"
        :score="book.sum"
        :book="book.book[0]"
        v-for="(book, index) in list"
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
        { key: "日間", value: 0 },
        { key: "週間", value: 1 },
        { key: "月間", value: 2 },
        { key: "年間", value: 3 },
        { key: "総合", value: 4 }
      ],
      time_day: 0
    };
  },
  computed: {
    list() {
      return this.$store.getters["ranking/getRankingList"];
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
    }
  },
  methods: {
    async composite_time() {
      switch (this.time_day) {
        case 0:
          await this.$store.dispatch("ranking/fetchRanking", {
            days: 1,
            limit: 10,
            page: 1
          });
          break;
        case 1:
          await this.$store.dispatch("ranking/fetchRanking", {
            days: 7,
            limit: 10,
            page: 1
          });
          break;
        case 2:
          await this.$store.dispatch("ranking/fetchRanking", {
            days: 31,
            limit: 10,
            page: 1
          });
          break;
        case 3:
          await this.$store.dispatch("ranking/fetchRanking", {
            days: 365,
            limit: 10,
            page: 1
          });
          break;
        case 4:
          await this.$store.dispatch("ranking/fetchRanking", {
            limit: 10,
            page: 1
          });
          break;
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
    // width: 1010px;
  }
  .ranking-select {
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
      width: 150px;
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
