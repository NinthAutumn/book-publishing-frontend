
<template>
  <div class="chapter-form">
    <form action class="flex flex-column chapter-new">
      <!-- <h3></h3> -->
      <!-- <fa icon="plus"></fa> -->
      <div class="chapter-form__navigation flex flex--between">
        <div class="divider">
          <div @click="back" class="button button--secondary" v-if="progress > 0">
            <fa style="font-size:14px;" icon="chevron-left"></fa>
            <p style="font-size:14px;margin-left:2px;">前</p>
          </div>
        </div>
        <div class="divider">
          <div @click="front" class="button button--primary flex flex--align" v-if="progress < 2">
            <p style="font-size:14px;margin-right:2px;">次</p>
            <fa style="font-size:14px;" icon="chevron-right"></fa>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="chapter-form__announcement" v-if="progress === 0">
          <div class="form-control flex-column">
            <textarea placeholder="前書き" name="header" id rows="5"></textarea>
          </div>
          <div class="form-control flex-column">
            <textarea placeholder="後書き" name="footer" id rows="5"></textarea>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="chapter-form__content-subject" v-if="progress === 1">
          <div class="form-control">
            <input
              placeholder="タイトル"
              type="text"
              class="chapter-title form-input"
              v-model="form.title"
            >
          </div>
          <div class="form-control" style="height:500px;">
            <vue-editor
              class="chapter-content-new"
              :editorToolbar="customToolbar"
              v-model="form.content"
              placeholder="本文"
            ></vue-editor>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="chapter-form__extra" v-if="progress === 2"></div>
      </transition>
      <div class="chapter-form__navigation flex flex--between">
        <div class="divider">
          <div @click="back" class="button button--secondary" v-if="progress > 0">
            <fa style="font-size:14px;" icon="chevron-left"></fa>
            <p style="font-size:14px;margin-left:2px;">前</p>
          </div>
        </div>
        <div class="divider">
          <div @click="front" class="button button--primary flex flex--align" v-if="progress < 2">
            <p style="font-size:14px;margin-right:2px;">次</p>
            <fa style="font-size:14px;" icon="chevron-right"></fa>
          </div>
        </div>
      </div>

      <div class="flex flex--right" v-if="progress === 2">
        <input
          type="submit"
          class="form-submit form-submit--primary chapter-new-submit"
          value="話を投稿する"
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      form: {
        title: "",
        content: "",
        date: "",
        extra: {
          announcement: {
            header: "",
            footer: ""
          }
        }
      },
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["clean"]
      ],
      lang: {
        days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
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
          date: "日にちを選ぶ(選ばなかったら関係ない)",
          dateRange: "Select Date Range"
        }
      }
    };
  },
  methods: {
    front() {
      this.progress++;
    },
    back() {
      this.progress--;
    }
    // move(e){
    //   if(e === )
    // }
  }
};
</script>

<style lang="scss">
.chapter-new-submit {
  margin-bottom: 10px;
}
.ql-editor {
  padding: 0 15px !important;
}
.ql-editor.ql-blank:before {
  font-style: none;
}
.ql-snow * {
  font-size: 16px;
}
.quillWrapper .ql-snow.ql-toolbar {
  // padding: 0 15px !important;
  padding-top: 5px !important;
  padding-bottom: 0px !important;
}
.ql-toolbar.ql-snow {
  border: 1px solid $review-color !important;
  border-bottom: 0 !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
  // box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
  p {
    font-size: 16px;
  }
}
.ql-editor.ql-blank:before {
  font-style: normal !important;
}
.ql-container.ql-snow {
  border: 1px solid $review-color !important;
  border-top: 0 !important;
  // border-radius: 10px;

  p {
    font-size: 16px;
    font-family: $text-font-stack;
    font-weight: 400;
  }

  background-color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #979797;
  //
}
.chapter-form {
  .chapter-new {
    box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    padding: 10px 40px !important;
    margin-top: 10px;
    background-color: white;
  }
  label {
    font-size: 16px;
  }
  .form-control {
    margin-top: 10px;
  }
  .draft-checkbox {
    // height: 50px;
    font-size: 16px;
  }
  textarea {
    resize: none;
    font-size: 16px;
    padding: 10px;
    // box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    margin-bottom: 10px;
    color: #a3a3a3;
    border: 1px solid $review-color !important;
    border-radius: 5px;
    line-height: 20px;

    &:focus {
      outline: none;
    }
  }
  .chapter-title {
    height: 50px;
    font-size: 20px;
    width: 100%;
    border: none;
    padding: 12px 12px !important;
    border: 1px solid rgb(202, 202, 202);
    border-radius: 5px;
    // box-sizing: bord !important;
    // box-shadow: 1px 1px 5px 0px rgb(209, 209, 209);
    // margin-bottom: 10px;
    &:focus {
      outline: none;
    }
  }
  .chapter-content-new {
    margin-bottom: 10px;
    // height: 100vh;
    height: 88%;
  }
}
</style>
