<template>
  <div class="comment-hidden">
    <div class="comment-hidden__list">
      <Zondicon class="comment-hidden__icon" icon="add-solid" style="width:14px;"></Zondicon>
      <div class="comment-hidden__username">{{comment.username}}</div>
      <div class="comment-hidden__likes">{{comment.likes}}</div>
      <div
        class="comment-hidden__createdAt"
      >・{{$moment(comment.created_at).startOf('minute').fromNow()}}</div>
      <div class="comment-hidden__child-count">(返事{{comment.children.length}}個)</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
