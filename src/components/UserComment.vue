<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="avatarUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong>{{ userName }}</strong>
        <div>{{ comment }}</div>
      </div>
      <nav class="level" v-if="comment">
        <div class="level-left">
          <button
            class="level-item button is-outlined is-info"
            v-if="showAddButton"
            @click="addStar"
          >
            <pm-icon class="is-small" mode="far" name="star"></pm-icon>
          </button>
          <pm-star v-for="s in stars" :key="s" :userId="s"></pm-star>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import pmIcon from "./Icon";
import pmStar from "./Star";

export default {
  name: "pm-user-comment",
  components: { pmIcon, pmStar },
  props: {
    avatarUrl: String,
    userName: String,
    comment: String,
    commentId: String,
    stars: Array,
    showAddButton: Boolean
  },
  methods: {
    addStar() {
      this.$emit("add-star", this.commentId);
    }
  }
};
</script>
