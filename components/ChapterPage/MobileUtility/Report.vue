<template>
  <div class="report-dialog dialog dialog__container">
    <div v-click-outside="closeHandler" class="report-dialog__container dialog__content">
      <div @submit.prevent class="report-dialog__form flex-column">
        <label class="flex-row flex--between flex--align">
          報告の理由
          <span>
            <fa @click="closeHandler" class="report-dialog__close" icon="times"></fa>
          </span>
        </label>
        <v-radio-group v-model="report.problem">
          <v-radio v-for="n in problems" :key="n" :label="n" :value="n"></v-radio>
        </v-radio-group>
        <textarea
          v-model="report.moreInfo"
          placeholder="詳しく報告の理由"
          v-if="report.problem === 'その他'"
          name="problem"
          id
        ></textarea>
        <div class="flex-divider flex-row report-dialog__button">
          <button
            class="report-dialog__submit report-dialog__submit--close"
            @click="closeHandler"
          >キャンセル</button>
          <button class="report-dialog__submit" @click="reportHandler">報告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      problem: false,
      report: {
        problem: "",
        moreInfo: ""
      },
      problems: [
        "差別的または攻撃的な内容",
        "テロリズムの助長",
        "スパムや誤解を招く話",
        "児童虐待",
        "その他"
      ]
    };
  },
  methods: {
    closeHandler() {
      this.$emit("close");
    },
    reportHandler: async function() {
      try {
        const report = {
          type: "chapter",
          type_id: this.chapter.id,
          problem: this.report.problem,
          more_info: this.report.moreInfo
        };
        try {
          this.loading = true;
          await this.$store.dispatch("report/postReport", { report });
          this.loading = false;
          this.$emit("close");
          this.problem = !this.problem;
          return this.$toast.show("報告に成功しました", {
            theme: "toasted-primary",
            position: "bottom-center",
            duration: 1000,
            icon: "check_circle"
          });
        } catch (error) {}
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss">
.report-dialog {
  $self: &;
  .v-label {
    line-height: 25px;
  }
  #{$self}__container {
    border-radius: 2rem;
    max-width: 95%;
    // bottom: ;
    max-height: 50vh;
    #{$self}__form {
      font-size: 3vh;

      span {
        padding: 0.5rem 0.75rem;
        border-radius: 10rem;
        background-color: #e3e8ee;
      }
      #{$self}__close {
        font-size: 2vh;
        color: #4f566b;
      }
      label {
        font-size: 3vh;
      }
      textarea {
        font-size: 3vh;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
      #{$self}__button {
        width: 100%;
        height: 7vh;
        border-radius: 1rem;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      #{$self}__submit {
        font-size: 3vh;
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
