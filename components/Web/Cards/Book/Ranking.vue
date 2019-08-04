<template>
  <div class="book-ranking">
    <div class="book-ranking__container">
      <div class="book-ranking__cover">
        <v-img
          :aspect-ratio="1/1.5"
          max-width="15rem"
          class="update-book__img"
          :src="book[0].cover + '/m'"
          :lazy-src="cover"
          style="border-radius: 0.4rem;"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="black "></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </div>
      <div class="book-ranking__meta"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
