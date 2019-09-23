<template>
  <div class="imagelist-modal dialog dialog__container">
    <div class="imagelist-modal__container dialog__content" v-click-outside="closeHander">
      <div class="imagelist-modal__header flex-row flex--align flex--between">
        <div class="imagelist-modal__title">ユーザーの投稿画像</div>
        <div class="imagelist-modal__upload" v-if="!cover||!edit">
          <label
            for="file-upload"
            class="custom-file-upload"
            v-ripple
            v-text="!loading? `画像を投稿`: '投稿中...'"
          >
            <fa style="margin-right:0.5rem;" icon="plus"></fa>
          </label>
          <input
            :multiple="multiple"
            　
            id="file-upload"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />
        </div>
        <div class="imagelist-modal__select" v-else-if="edit" @click.prevent.stop="edit = !edit">
          <label v-ripple v-text="!loading? `画像を選ぶ`: '投稿中...'">
            <fa style="margin-right:0.5rem;" icon="plus"></fa>
          </label>
        </div>
      </div>
      <ul class="imagelist-modal__list" v-if="!cover||!edit">
        <li class="imagelist-modal__item" v-for="drawing in drawings" :key="drawing.id">
          <image-card @selected="selectedHandler" :drawing="drawing"></image-card>
        </li>
      </ul>
      <div class="imagelist-modal__editor flex-column flex--align" v-if="edit">
        <Cropper
          :src="selected"
          :stencilComponent="$options.components.CircleStencil"
          @change="onChange"
        />
        <div class="imagelist-modal__use" v-text="'画像を投稿する'" @click="uploadAvatar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    multiple: Boolean,
    cover: Boolean,
    current: String
  },
  data() {
    return {
      loading: false,
      selected: "",
      select: false,
      edit: false
    };
  },
  components: {
    ImageCard: () => import("./Image")
  },
  methods: {
    ...mapActions({
      upload: "upload/uploadAvatar",
      fetchDrawings: "drawing/fetchAllDrawings"
    }),
    async uploadAvatar() {
      const { url } = await this.upload(this.files);
      this.$emit("input", url);
      this.$emit("close");
    },
    selectedHandler(drawing) {
      if (!this.multiple) {
        this.$emit("input", drawing.url);
        this.$emit("close");
      }
    },
    onChange({ coordinates, canvas }) {
      canvas.toBlob(blob => {
        this.files = blob;
      });
    },
    async onFileChange(e) {
      this.loading = true;
      // this.$nuxt.$loading.start();

      try {
        this.files = e.target.files || e.dataTransfer.files;
        // return console.log(this.files);
        if (this.cover) {
          this.files = this.files[0];
          const url = window.URL.createObjectURL(this.files);
          this.selected = url;
          this.loading = false;
          return (this.edit = !this.edit);
        }
        for (let file of this.files) {
          // alert(this.file);
          // if
          // alert(file);
          await this.upload(file);
        }
        await this.fetchDrawings();
        // this.$nuxt.$loading.finish();
      } catch (error) {
        console.log(error);
      }
      this.defDrawings = this.drawings;
      this.loading = false;
    },
    closeHander() {
      this.$emit("close");
    }
  },
  async mounted() {
    await this.$store.dispatch("drawing/fetchAllDrawings");

    if (this.cover) {
      this.selected = this.current;
      // this.edit = true;
    }

    // alert(this.selected);
  },
  // comments:{}
  computed: {
    ...mapGetters({
      drawings: "drawing/getAllDrawings"
    })
  }
};
</script>

<style lang="scss">
.imagelist-modal {
  $self: &;
  &__container {
    width: 65rem;
    min-height: 50rem;
    .vue-advanced-cropper {
      width: 27rem;
      height: 27rem;
    }
    #{$self}__header {
      margin-bottom: 1rem;
      #{$self}__title {
        font-size: 1.6rem;
      }
    }
    #{$self}__use {
      font-size: 1.4rem;
      padding: 0.5rem 2rem;
      background-color: $secondary;
      color: white;
      border-radius: 0.5rem;
      margin-top: 1rem;
      &:hover {
        cursor: pointer;
      }
    }

    #{$self}__select {
      label {
        user-select: none;
        &:hover {
          cursor: pointer;
          color: $primary;
          background-color: #fff;
        }
        font-size: 1.4rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        color: white;
        margin-bottom: 0;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: $primary;
      }
    }
    #{$self}__upload {
      font-size: 1.4rem;
      label {
        user-select: none;
        font-size: 1.4rem;
        &:hover {
          font-size: 1.4rem;
          font-size: inherit;
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
    #{$self}__list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      // max-height: 10rem;
      grid-gap: 1rem;
      max-height: 40rem;
      // height: 40rem;
      overflow: auto;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
  }
}
</style>
