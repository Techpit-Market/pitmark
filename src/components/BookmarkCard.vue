<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <router-link :to="{ name: 'bookmark_detail', params: { id: id } }"
          >{{ userCount }} users</router-link
        >
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div>
          <a :href="url">{{ title }}</a>
        </div>
        <div>
          <time class="is-size-7" :datetime="timestamp">{{ timestamp }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "pm-bookmark-card",
  props: {
    id: String,
    title: String,
    url: String,
    userCount: Number,
    createdAt: Date
  },
  computed: {
    timestamp() {
      return dayjs(this.createdAt).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
