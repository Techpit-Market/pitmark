<template>
  <div class="container">
    <div class="columns" v-if="profile">
      <div class="column is-one-fifth">
        <p class="image is-128x128">
          <img :src="profile.avatarUrl || profile.gravatarUrl" />
        </p>
        <p>name: {{ profile.name }}</p>
        <div class="columns">
          <div class="column">
            <button
              class="button is-small is-primary is-outlined is-fullwidth"
              @click="showProfileEditModal"
            >
              編集
            </button>
          </div>
          <div class="column">
            <button
              class="button is-small is-danger is-outlined is-fullwidth"
              @click="showRetireModal"
            >
              退会
            </button>
          </div>
        </div>
      </div>
      <div class="column is-for-fifths">
        <div class="card" v-for="b in bookmarks" :key="b.id">
          <div class="card-content">
            <div class="content">
              <div>
                <a :href="b.url">{{ b.title }}</a>
              </div>
              <div>{{ b.comment }}</div>
              <div>
                <time
                  class="is-size-7"
                  :datetime="formatTime(b.bookmarkedAt)"
                  >{{ formatTime(b.bookmarkedAt) }}</time
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pm-profile-edit-modal
      v-if="profile"
      v-model="editProfileModalActive"
      :name="profile.name"
      @update="updateProfile"
    ></pm-profile-edit-modal>
    <pm-retire-modal
      v-if="profile"
      v-model="retireModalActive"
      @retire="retire"
    ></pm-retire-modal>
  </div>
</template>

<script>
import dayjs from "dayjs";
import pmProfileEditModal from "@/components/ProfileEditModal";
import pmRetireModal from "@/components/RetireModal";
import { authService } from "@/services/AuthService";
import { userService } from "@/services/UserService";
import { userBookmarkService } from "@/services/UserBookmarkService";
import { storageService } from "@/services/StorageService";

export default {
  name: "profile",
  components: { pmProfileEditModal, pmRetireModal },
  data() {
    return {
      user: null,
      profile: null,
      bookmarks: [],
      editProfileModalActive: false,
      retireModalActive: false
    };
  },
  async created() {
    authService.onStateChanged(async user => {
      this.user = user;
      if (user) {
        this.profile = await userService.getCurrentUser();
        this.bookmarks = await userBookmarkService.getBookmarks(this.profile);
      }
    });
  },
  methods: {
    showProfileEditModal() {
      this.editProfileModalActive = true;
    },
    async updateProfile(val) {
      const data = { name: val.name };
      if (val.file) {
        data.avatarUrl = await storageService.uploadAvatar(
          this.profile.id,
          val.file
        );
      }
      await userService.updateUser(this.profile.id, data);
      this.profile = await userService.getCurrentUser();
      if (val.teardown) {
        val.teardown();
      }
    },
    showRetireModal() {
      this.retireModalActive = true;
    },
    async retire(val) {
      await authService.retire(val.password);
      this.retireModalActive = false;
      await authService.signOut();
      window.location.href = "/thanks";
    },
    formatTime(dateTime) {
      return dayjs(dateTime).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
