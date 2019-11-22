<template>
  <div class="drawing-modal dialog dialog__container">
    <div class="drawing-modal__container dialog__content">
      <div class="flex-divider flex-row flex--between flex--align drawing-modal__header">
        <div class="drawing-modal__icon-container" @click="$emit('close')">
          <fa class="drawing-modal__close" icon="times"></fa>
        </div>
        <div class="drawing-modal__upload">
          <label
            for="file-upload"
            class="custom-file-upload"
            v-ripple
            v-text="!loading? '絵を投稿': '投稿中...'"
          >
            <fa style="margin-right:0.5rem;" icon="plus"></fa>
          </label>
          <input multiple　 id="file-upload" type="file" accept="image/*" @change="onFileChange" />
        </div>
      </div>

      <div class="drawing-modal__grid">
        <drawing-item
          @select="selectImage"
          :selected="selected[drawing.id]"
          :drawing="drawing"
          v-for="drawing in defDrawings"
          :key="drawing.id"
          :notmultiple="multiple"
        ></drawing-item>
        <!-- <div class="drawing-modal__add"></div> -->
      </div>
      <div class="drawing-modal__button">
        <div
          class="drawing-modal__submit"
          @click="editor?$emit('select'):$emit('close')"
        >{{editor?'選んだ画像を挟む':'絵を話に付ける'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DrawingItem: () => import("./DrawingItem")
  },
  computed: {
    ...mapGetters({
      drawings: "drawing/getAllDrawings"
    })
  },
  props: {
    editor: Boolean,
    value: Object,
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selected: {},
      defDrawings: [],
      files: "",
      loading: false
    };
  },
  methods: {
    ...mapActions({
      upload: "upload/uploadAvatar",
      fetchDrawings: "drawing/fetchAllDrawings"
    }),
    async onFileChange(e) {
      this.loading = true;
      this.$nuxt.$loading.start();
      this.files = e.target.files || e.dataTransfer.files;
      for (let file of this.files) {
        await this.upload(file);
      }
      try {
        await this.fetchDrawings();
        this.$nuxt.$loading.finish();
      } catch (error) {
        console.log(error);
      }
      this.defDrawings = this.drawings;
      this.loading = false;
    },
    selectImage(drawing) {
      if (!this.multiple) {
        const bug = { [drawing.id]: drawing };
        this.$emit("input", bug);
        return this.$emit("select");
      }
      if (this.selected[drawing.id]) {
        delete this.selected[drawing.id];
      } else {
        this.selected[drawing.id] = drawing;
      }
      this.$emit("input", this.selected);
    }
  },
  async mounted() {
    await this.$store.dispatch("drawing/fetchAllDrawings");
    this.defDrawings = this.drawings;

    if (this.value) {
      this.selected = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.drawing-modal {
  $self: &;
  .upload-btn {
    padding: 0 !important;
    label {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 1.6rem;
    }
  }
  &__container {
    width: 50rem;
    height: 50rem;
    max-height: 50rem;
    #{$self}__button {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 1rem;
      justify-content: flex-end;
      #{$self}__submit {
        font-size: 1.4rem;
        padding: 0.5rem 2rem;
        border-radius: 0.5rem;
        background: #3ecc8d;
        color: white;
        &:hover {
          cursor: pointer;
        }
      }
    }
    #{$self}__upload {
      label {
        user-select: none;
        &:hover {
          cursor: pointer;
          color: $secondary;
          background-color: #fff;
        }
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        color: white;
        margin-bottom: 0;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: $secondary;
      }

      input[type="file"] {
        display: none;
      }
    }
    #{$self}__grid {
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #e3e8ee;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      // justify-content: space-between;

      overflow: auto;
      height: 40rem;
      // height: 100%;
      // max-height: 100%;
      grid-gap: 1rem;
      // overflow: auto;
    }
    #{$self}__icon-container {
      border-radius: 100px;
      background-color: #e3e8ee;
      width: 3.25rem;
      height: 2.5rem;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #575e68;
    }
    #{$self}__close {
      // font-size: 1.8rem;
      // padding: 1rem;
    }
    #{$self}__header {
      margin-bottom: 1rem;
    }
    #{$self}__add {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
    }
  }
}
</style>
