<template>
  <div class="image-modal dialog dialog__container" v-if="container">
    <transition name="grow-shrink" appear>
      <div class="image-modal__container dialog__content" v-if="value" v-click-outside="closeModal">
        <div class="image-modal__header flex-row flex--between">
          <div class="image-modal__nav">
            <div
              class="image-modal__nav-item"
              :key="key"
              v-for="(value,key) in nav"
              v-text="value.name"
              @click="selected = value.key"
              :class="{'image-modal__nav-item--selected': selected === value.key}"
            ></div>
          </div>
          <div class="image-modal__upload">
            <label
              for="file-upload"
              class="custom-file-upload"
              v-ripple
              v-text="!loading? 'カバーを投稿': '投稿中...'"
            >
              <fa style="margin-right:0.5rem;" icon="plus"></fa>
            </label>
            <input　 id="file-upload" type="file" accept="image/*" @change="onFileChange" />
          </div>
        </div>
        <div class="image-modal__main">
          <div class="image-modal__image-list">
            <transition name="slide-right">
              <div class="image-modal__list image-modal__list--site" v-if="selected === 'site'">
                <div
                  class="image-modal__item"
                  v-for="item in site"
                  :key="item.id"
                  @click="selectImage(item)"
                >
                  <v-img :aspect-ratio="1/1.5" :src="item.url"></v-img>
                </div>
              </div>
              <div class="image-modal__list image-modal__list--user" v-if="selected === 'user'">
                <div
                  @click="selectImage(item)"
                  class="image-modal__item"
                  v-for="item in list"
                  :key="item.id"
                >
                  <v-img :aspect-ratio="1/1.5" :src="item.url"></v-img>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import imageResize from "@/static/js/imageresize.js";
import uuid from "uuid/v1";

import { mapActions } from "vuex";

export default {
  props: ["value"],
  data() {
    return {
      nav: {
        default: {
          name: "デフォルト",
          key: "site"
        },
        user: {
          name: "ユーザー",
          key: "user"
        }
      },
      loading: false,
      selected: "site",
      list: [],
      site: [],
      file: "",
      image: "",
      cover: {
        m: {
          size: {
            width: 140, // maximum width
            height: 210 // maximum height
          },
          name: "m",
          file: ""
        },
        s: {
          size: {
            width: 55, // maximum width
            height: 82.5
          },
          name: "s",
          file: ""
        },
        l: {
          size: { width: 200, height: 300 },
          name: "l",
          file: ""
        },
        default: {
          size: null,
          name: "",
          file: ""
        }
      },
      container: false
    };
  },
  watch: {
    value: function(val) {
      if (val === false) {
        setTimeout(() => {
          this.container = false;
        }, 300);
      } else {
        this.container = true;
      }
    }
  },
  methods: {
    ...mapActions({
      upload: "upload/uploadCover"
    }),
    closeModal() {
      this.$emit("input", false);
    },
    selectImage(item) {
      this.$emit("selectImage", item);
      this.closeModal;
    },
    async onFileChange(e) {
      this.loading = true;
      this.$nuxt.$loading.start();
      this.file = e.target.files || e.dataTransfer.files;
      this.file = this.file[0];
      let unique = uuid();
      const cover_keys = Object.keys(this.cover);
      try {
        for (let key of cover_keys) {
          await this.resizeHandler({ file: this.file, cover: this.cover[key] });
        }
        for (let key of cover_keys) {
          await this.upload({
            file: this.cover[key].file,
            unique,
            size: this.cover[key].name
          });
        }
        const { data } = await this.$axios.get("/v2/drawing/cover/list");
        const { user, site } = data;
        this.list = user;
        this.site = site;
        this.selected = "user";
        this.$nuxt.$loading.finish();
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async resizeHandler({ file, cover }) {
      try {
        // import { readAndCompressImage } from "browser-image-resizer";
        const resize = require("browser-image-resizer").readAndCompressImage;
        if (!cover.name) {
          this.image = file;
          this.cover["default"]["file"] = file;
          return Promise.resolve();
        }
        const config = {
          qualit: 0.8,
          maxWidth: cover["size"]["width"],
          maxHeight: cover["size"]["height"],
          mimeType: file.type
        };
        let newFile = await resize(file, config);
        this.cover[cover.name]["file"] = newFile;
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
  },
  async mounted() {
    this.container = this.value;
    const { data } = await this.$axios.get("/v2/drawing/cover/list");
    const { user, site } = data;
    this.list = user;
    this.site = site;
  }
};
</script>

<style lang="scss">
.image-modal {
  $self: &;
  &__container {
    width: 70vw;
    position: relative;
    #{$self}__upload {
      label {
        user-select: none;
        &:hover {
          cursor: pointer;
          color: $secondary;
          background-color: #fff;
        }
        // border: 1px solid $secondary;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        color: white;
        margin-bottom: 0;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: $secondary;
      }

      input[type="file"] {
        display: none;
      }
    }
    #{$self}__nav {
      display: flex;

      #{$self}__nav-item {
        font-size: 1.6rem;
        // margin-right: 1rem;

        &--selected {
          font-weight: bold;
          border-bottom: 2px solid $primary;
        }
        &:hover {
          cursor: pointer;
        }
        border-bottom: 2px solid $secondary;
        padding: 0.25rem 1rem;
      }

      border-radius: 2rem;

      margin-bottom: 1rem;
    }
    .upload-btn {
      padding: 0 !important;
    }
    #{$self}__main {
      height: 70vh;
      // max-height: 50vh;
      overflow: auto;
    }
    #{$self}__list {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      grid-gap: 0.5rem;
      #{$self}__item {
        // width: 20rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.07);
        border: 1px solid #dadce0;
        border-radius: 0.5rem;
        padding: 0.5rem;
        // max-height: 21rem;
        overflow: hidden;
        &:hover {
          cursor: pointer;
          box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.07);
        }
        // margin-right: 0.5rem;
        // margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
