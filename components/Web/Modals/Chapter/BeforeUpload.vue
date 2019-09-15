<template>
  <div class="cbu-modal dialog dialog__container" :class="{'cbu-modal--disabled':!value}">
    <transition name="grow-shrink">
      <div class="cbu-modal__container dialog__content" v-if="value">
        <div class="cbu-modal__header flex-row flex--align flex--between">
          <h3>話を公開する</h3>
          <fa class="close-icon" icon="times" @click="$emit('input',false)"></fa>
        </div>
        <div class="cbu-modal____content">
          <div class="cbu-modal__info">
            <span class="cbu-modal__placeholder">タイトル</span>
            <span class="cbu-modal__content">{{form.title}}</span>
          </div>
          <div class="form-control flex-row flex--between">
            <div class="cbu-modal__info" style="margin-top:10px;">
              <span class="cbu-modal__placeholder">話の章</span>
              <span class="cbu-modal__content">第{{form.volume.index}}章</span>
            </div>
            <div class="cbu-modal__info" style="margin-top:10px;">
              <span class="cbu-modal__placeholder">話の字数</span>
              <span class="cbu-modal__content">{{form.wordCount}}字</span>
            </div>
            <div class="cbu-modal__info" v-if="form.locked" style="margin-top:10px;">
              <span class="cbu-modal__placeholder">有料</span>
              <span class="cbu-modal__content">
                <Currency :amount="form.wordCount.length*0.0303"></Currency>
              </span>
            </div>
          </div>

          <div class="form-control flex-row flex--align flex--between">
            <label for="schedule" style="margin-right:10px;font-size:14px;color: #949499;">予約公開する</label>
            <el-switch v-model="schedule"></el-switch>
          </div>
          <transition name="grow-shrink">
            <div class="form-control" v-if="schedule">
              <date-picker
                type="datetime"
                format="DD/MM/YYYY HH:mm"
                :not-before="$moment()"
                :minute-step="1"
                :lang="lang"
                v-model="form.date"
              ></date-picker>
            </div>
          </transition>
          <div class="form-control flex-row flex--align flex--right">
            <div class="cbu-modal__submit" @click="createChapter">公開</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    form: Object,
    value: Boolean,
    index: [String, Number]
  },
  data() {
    return {
      schedule: false,
      date: "",
      lang: {
        days: ["日", "月", "火", "水", "木", "金", "土"],
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "日にちを選ぶ"
        }
      }
    };
  },
  mounted() {
    this.date = this.$moment();
  },
  methods: {
    async createChapter() {
      this.loading = true;
      this.postChapter();

      this.loading = false;
      this.$router.push(`/dashboard/books/${this.$route.params.id}/published`);
    },
    async postChapter(val) {
      let state = "published";
      if (this.schedule) {
        state = "scheduled";
      }
      const bookId = this.$route.params.id;

      const chapter = {
        title: this.form.title,
        content: this.form.content,
        word_count: this.form.wordCount,
        locked: this.form.locked,
        volume_id: this.form.volume.id,
        index: this.index,
        state,
        header: this.form.header,
        footer: this.form.footer,
        book_id: bookId,
        drawings: this.form.drawings,
        date: this.form.date
      };

      if (this.$route.query.chapterId) {
        await this.$store.dispatch("chapter/patchChapter", {
          chapter,
          chapterId: this.$route.query.chapterId
        });
      } else {
        await this.$store.dispatch("chapter/createChapter", {
          chapter
        });
      }
    }
  }
};
</script>

<style lang="scss">
.cbu-modal {
  $self: &;
  &--disabled {
    visibility: hidden;
    transition: 300ms;
  }
  &__container {
    width: 50rem;
    #{$self}__header {
      h3 {
        font-size: 1.4rem;
      }
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    #{$self}__info {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      #{$self}__placeholder {
        color: #949499;
        // font-size: inherit;
        font-size: 1.4rem;
      }
      #{$self}__content {
        font-size: 1.6rem;
        // font-size: inherit;
      }
    }
    #{$self}__submit {
      margin-top: 1rem;
      padding: 0.5rem 2rem;
      border-radius: 0.5rem;
      background-color: #2a2f45;
      color: white;
      font-size: 1.4rem;
    }
  }
}
</style>
