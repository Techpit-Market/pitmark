<template>
  <div class="container">
    <div class="columns is-multiline bookmarks">
      <div class="column is-4" v-for="b in bookmarks" :key="b.id">
        <pm-bookmark-card
          :id="b.id"
          :url="b.url"
          :title="b.title"
          :userCount="b.userCount"
          :createdAt="b.createdAt"
        ></pm-bookmark-card>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <button
          class="button is-rounded is-fullwidth"
          v-if="hasNext"
          @click="loadNextBookmarks"
        >
          もっと見る
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import pmBookmarkCard from "@/components/BookmarkCard";
import { authService } from "@/services/AuthService";
import { bookmarkService } from "@/services/BookmarkService";

export default {
  name: "home",
  components: { pmBookmarkCard },
  data() {
    return {
      bookmarks: [],
      user: null,
      hasNext: false
    };
  },
  async created() {
    authService.onStateChanged(user => {
      this.user = user;
    });
    const bookmarks = await bookmarkService.getBookmarks(30);
    this.bookmarks = bookmarks;
    this.hasNext = this.bookmarks.length === 30;
  },
  methods: {
    async loadNextBookmarks() {
      const nextBookmarks = await bookmarkService.getBookmarks(
        30,
        this.bookmarks[this.bookmarks.length - 1].createdAt
      );
      this.hasNext = nextBookmarks.length === 30;
      this.bookmarks.push(...nextBookmarks);
    }
  }
};
</script>

<style scoped>
.bookmarks {
  margin-top: 1rem;
}
</style>
