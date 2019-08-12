<template>
  <div class="drawing-modal dialog dialog__container">
    <div class="drawing-modal__container dialog__content">
      <div class="flex-divider flex-row flex--between flex--align">
        <div class="drawing-modal__icon-container" @click="$emit('close')">
          <fa class="drawing-modal__close" icon="times"></fa>
        </div>
        <upload-btn
          accept="image/*"
          block="image/svg"
          multiple
          title="投稿"
          :fileChangedCallback="upload"
        >
          <template slot="icon">
            <v-icon>add</v-icon>
          </template>
        </upload-btn>
      </div>

      <div class="drawing-modal__grid">
        <drawing-item
          @select="selectImage"
          :selected="selected[drawing.id]"
          :drawing="drawing"
          v-for="drawing in defDrawings"
          :key="drawing.id"
        ></drawing-item>
        <!-- <div class="drawing-modal__add"></div> -->
      </div>

      <!-- {{fileList}} -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    value: Object
  },
  data() {
    return {
      selected: {},
      defDrawings: []
    };
  },
  methods: {
    async upload(files) {
      let dogs = Object.keys(files);
      let store = [];
      dogs.forEach(dog => {
        store.push(files[dog]);
      });
      const reader = new FileReader();
      for (let file of store) {
        file;
        // this.draw.push({
        //   file: file,
        //   old: false,
        //   url: URL.createObjectURL(file)
        // });
        await this.$store.dispatch("upload/image", file);
      }

      await this.$store.dispatch("drawing/fetchAllDrawings");
      this.defDrawings = this.drawings;
    },
    selectImage(drawing) {
      if (this.selected[drawing.id]) {
        this.selected[drawing.id] = null;
      } else {
        this.selected[drawing.id] = drawing;
      }
      this.$emit("input", this.selected);
      this.selected;
      this.defDrawings;
    }
  },
  async mounted() {
    if (this.$route.query.chapterId) {
      // const { data } = await this.$axios.get(
      //   `/drawing/chapter/${this.$route.query.chapterId}`
      // );
    }
    await this.$store.dispatch("drawing/fetchAllDrawings");
    this.defDrawings = this.drawings;
    this.selected = this.value;
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
    #{$self}__grid {
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #e3e8ee;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
      padding: 0.8rem 1rem;
    }
    #{$self}__close {
      font-size: 1.8rem;
      // padding: 1rem;
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
