<template>
  <div class="chapter-new">
    <div class="chapter-title__wrapper flex flex--align">
      <h3 class="chapter-new-title">
        話を書く
        <fa icon="pen-nib" class="title-icon"></fa>
      </h3>
    </div>
    <create-chapter class="chapter-forms"></create-chapter>
  </div>
</template>

<script>
export default {
  name: "new-chapter",
  layout: "user-nav/User",
  data() {
    return {
      chapter: {}
    };
  },
  components: {
    CreateChapter: () => import("@/components/Dashboard/Forms/Chapter/index")
  },
  created() {},
  async fetch({ store, params }) {
    // await store.dispatch("chapter/fetchPublishedTOC", params.id);
    await store.dispatch("chapter/fetchVolumeList", params.id);
    await store.dispatch("chapter/fetchLatestIndex", { bookId: params.id });
  }
};
</script>

<style lang="scss">
.chapter-forms {
  padding: 0px 45px;
}
.chapter-new {
  /* width: 100%; */
  padding: 0 !important;
  // background-color: white !important;
}
.chapter-new-title {
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  // font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  // background-color: rgb(199, 199, 199);
}
.chapter-title__wrapper {
  background-color: rgb(248, 246, 246);
  // width: 100%;
  height: 50px;
  padding: 0px 45px;
}
.title-icon {
  font-size: 22px;
  // margin-left: 10px;
}
</style>
