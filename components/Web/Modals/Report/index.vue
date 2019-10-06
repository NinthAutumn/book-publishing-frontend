<template>
  <div class="report-dialog dialog dialog__container">
    <div class="report-dialog__container dialog__content">
      <form @submit.prevent class="report-dialog__form flex-column">
        <label class="flex-row flex--between flex--align">
          報告の理由
          <span>
            <fa @click="$emit('toggleDialog')" class="report-dialog__close" icon="times"></fa>
          </span>
        </label>
        <v-radio-group v-model="report.problem">
          <v-radio v-for="n in problems" :key="n" :label="n" :value="n"></v-radio>
        </v-radio-group>
        <textarea
          placeholder="詳しく報告の理由"
          v-if="report.problem === 'その他'"
          v-model="report.moreInfo"
          name="problem"
        ></textarea>
        <div class="flex-divider flex-row report-dialog__button">
          <button
            class="report-dialog__submit report-dialog__submit--close"
            @click="$emit('toggleDialog')"
          >キャンセル</button>
          <button class="report-dialog__submit" v-loading="loading" @click="reportReview">報告</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    problems: [Object, Array],
    type: String,
    type_id: [String, Number]
  },
  data() {
    return {
      report: {
        problem: "",
        moreInfo: ""
      }
    };
  },
  methods: {
    async reportReview() {
      const report = {
        type: this.type,
        type_id: this.type_id,
        problem: this.report.problem,
        more_info: this.report.moreInfo
      };
      try {
        this.loading = true;
        await this.$store.dispatch("report/postReport", { report });
        this.loading = false;
        this.$emit("toggleDialog", false);
        return this.$toast.show("報告に成功しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "check_circle"
        });
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss">
.report-dialog {
  $self: &;

  #{$self}__container {
    border-radius: 2rem;
    // bottom: ;
    #{$self}__form {
      font-size: 1.8rem;
      span {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10rem;
        background-color: #e3e8ee;
      }
      #{$self}__close {
        font-size: 1.6rem;
        color: #4f566b;
      }
      label {
        font-size: 1.8rem;
      }
      textarea {
        font-size: 1.6rem;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
      #{$self}__button {
        width: 100%;
        height: 3.5rem;
        border-radius: 1rem;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      #{$self}__submit {
        font-size: 1.6rem;
        // align-self: flex-end;
        // padding: 0 2rem;
        width: 50%;
        background-color: #566cd6;
        color: white;

        &--close {
          background-color: white;
          color: #566cd6;
          // align-self: flex-start;
        }
      }
    }

    // background-color:;
  }
}
</style>
