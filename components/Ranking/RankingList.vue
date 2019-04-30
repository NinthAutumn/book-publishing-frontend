<template>
  <div id="ranking-list">
    <div class="ranking-select">
      <ul class="ranking-select__list">
        <div name="list" class="ranking-select__container">
          <li
            v-for="(type, index) in ranking_type"
            :key="type.key"
            class="ranking-select__item"
            v-ripple
            @click="select_menu(type.key,type.value)"
            :class="{first: index === 0, last: ranking_type[ranking_type.length - 1].key === type.key,selected:type.selected}"
          >
            <fa class="ranking-select__icon" :icon="type.icon"></fa>
            {{type.key}}
          </li>
        </div>
      </ul>
    </div>
    <div class="ranking-select__options">
      <div class="ranking-genre" v-if="selected_ranking_type === 2">
        <div class="ranking-genre__title">ジャンル</div>
        <ul class="ranking-genre__list">
          <li
            class="ranking-genre__item"
            @click="genre = item"
            v-for="(item,index) in genres"
            v-ripple
            :key="index"
            :class="{selected: genre === item}"
          >{{item}}</li>
        </ul>
      </div>
      <div
        class="ranking-date"
        v-if="selected_ranking_type === 0|| selected_ranking_type === 2 || selected_ranking_type === 3"
      >
        <div class="ranking-genre__title">時期</div>
        <ul class="ranking-date__list flex-row">
          <li
            v-ripple
            class="ranking-date__item"
            v-for="(date, index) in sort_type"
            :key="index"
            @click="time_day = date.value"
            :class="{selected: time_day === date.value}"
          >{{date.key}}</li>
        </ul>
      </div>
    </div>
    <transition-group
      name="list"
      tag="ul"
      class="book-list"
      v-if="selected_ranking_type===0||selected_ranking_type===2"
    >
      <ranking-item
        :index="index"
        trending
        :score="book.score"
        :book="book"
        v-for="(book, index) in list"
        :key="book.id"
      ></ranking-item>
    </transition-group>
    <transition-group name="list" tag="ul" class="book-list" v-if="selected_ranking_type===1">
      <ranking-item
        :index="index"
        trending
        :score="book.sum"
        :book="book"
        v-for="(book, index) in trending"
        :key="book.id"
      ></ranking-item>
    </transition-group>
    <transition-group name="list" tag="ul" class="book-list" v-if="selected_ranking_type===3">
      <ranking-item
        :index="index"
        trending
        :score="book.votes"
        :book="book"
        v-for="(book, index) in vote"
        :key="book.id"
      ></ranking-item>
    </transition-group>
  </div>
</template>

<script>
export default {
  components: {
    RankingItem: () => import("./RankingItem"),
    Select: () => import("@/components/All/Select")
  },
  data() {
    return {
      ranking_type: [
        { key: "総合", value: 0, selected: true, icon: "layer-group" },
        { key: "投票", value: 3, selected: false, icon: "bolt" },
        { key: "急上昇中", value: 1, selected: false, icon: "fire" },
        { key: "ジャンル別", value: 2, selected: false, icon: "landmark" }
      ],
      selected_ranking_type: 0,
      sort_type: [
        { key: "日間", value: "daily" },
        { key: "週間", value: "weekly" },
        { key: "月間", value: "monthly" },
        { key: "年間", value: "yearly" },
        { key: "累計", value: "total" }
      ],
      time_day: "daily",
      genre: "ファンタジー",
      genres: [
        "ファンタジー",
        "恋愛",
        "メカ",
        "少年",
        "青年",
        "音楽",
        "日常",
        "ゲーム",
        "文学",
        "異世界",
        "空想科学",
        "冒険",
        "アクション",
        "SF",
        "武術",
        "ミステリー",
        "サスペンス",
        "ノンフィクション",
        "ホラー",
        "オカルト",
        "時代",
        "歴史",
        "コメディ",
        "政治",
        "スポーツ",
        "武俠",
        "経済",
        "推理",
        "青春",
        "学園",
        "ボーイズラブ",
        "ガールズラブ"
      ]
    };
  },
  computed: {
    list() {
      return this.$store.getters["analytic/getRankingList"];
    },
    trending() {
      return this.$store.getters["analytic/getTrendingList"];
    },
    vote() {
      return this.$store.getters["analytic/getVoteRanking"];
    }
  },
  async mounted() {
    await this.$store.dispatch("analytic/fetchRanking", {
      limit: 10,
      page: 1,
      time: "daily"
    });
    if (this.$device.isMobile) {
      this.ranking_type = [
        { key: "総合", value: 0, selected: true, icon: "layer-group" },
        { key: "投票", value: 3, selected: false, icon: "bolt" },
        { key: "急上昇中", value: 1, selected: false, icon: "fire" }
      ];
    }
  },
  watch: {
    time_day: function(val) {
      this.composite_time();
    },
    genre: function(val) {
      this.composite_time();
    },
    selected_ranking_type: function(val) {
      this.composite_time();
    }
  },
  methods: {
    async changeListType() {
      if (this.selected_ranking_type === 0) {
      } else if (this.selected_ranking_type === 1) {
      }
    },
    async composite_time() {
      let param = {};
      switch (this.selected_ranking_type) {
        case 0:
          if (this.time_day === "total") {
            param = {
              limit: 10,
              page: 1
            };
          } else {
            param = {
              days: this.time_day,
              limit: 10,
              page: 1
            };
          }
          await this.$store.dispatch("analytic/fetchRanking", {
            time: this.time_day,
            page: 1
          });
          break;
        case 1:
          if (this.trending.length > 0) {
            return;
          }
          await this.$store.dispatch("analytic/fetchTrending", {
            limit: 10,
            page: 1,
            time: "weekly"
          });
          break;
        case 2:
          await this.$store.dispatch("analytic/fetchRanking", {
            time: this.time_day,
            page: 1,
            genre: this.genre
          });
          break;
        case 3:
          await this.$store.dispatch("analytic/fetchVoteRanking", {
            time: this.time_day,
            page: 1
          });
          break;
      }
    },
    select_menu(key, index) {
      this.time_day = "daily";
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
@media screen and (max-width: 400px) {
  .ranking-select__container {
    // font-size: 8px !important;
  }
}
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
    $self: &;

    &__icon {
      margin-right: 5px;
    }
    &__list {
      display: flex;
      justify-content: center;
      max-height: 45px;
      font-size: 10px;

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
      font-size: 10px;
    }
    &__item {
      max-width: 14rem;
      min-width: 10rem;
      min-height: 4rem;
      max-height: 4.5rem;
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6em;

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
      // justify-content: center;
    }
  }
  .ranking-genre {
    margin-top: 1rem;
    user-select: none;
    &__title {
      font-size: 1.7rem;
    }
    .selected {
      color: $primary;
      border-bottom: 2px solid $primary;
    }
    &__list {
      display: flex;
      overflow: auto;
      flex-wrap: wrap;
    }
    &__item {
      &:hover {
        color: $primary;
        cursor: pointer;
        border-bottom: 2px solid $primary;
      }
      border-bottom: 2px solid rgb(247, 247, 247);
      font-size: 1.6rem;
      flex-basis: auto;
      // min-width: 100%;
      color: grey;
      padding: 1rem 1rem;
      // display: flex;
    }
  }
  .ranking-date {
    margin-top: 1rem;
    .selected {
      border-bottom: 2px solid $secondary;
      color: $secondary;
    }
    &__title {
      font-size: 1.7rem;
    }
    &__list {
      // margin-bottom: 0.2rem;
      width: 100%;
    }
    &__item {
      font-size: 1.6rem;
      padding: 0 1rem;
      color: grey;
      user-select: none;
      transition: 200ms;
      border-bottom: 2px solid rgb(247, 247, 247);

      &:hover {
        border-bottom: 2px solid $secondary;
        color: $secondary;
        transition: 200ms;
        cursor: pointer;
      }
    }
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
