<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">プロファイル編集</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>
      <section class="modal-card-body">
        <pm-text-field
          type="text"
          label="ユーザー名"
          placeholder="ユーザー名"
          :error="userNameError"
          v-model="userName"
        />
        <div class="field">
          <label class="label">アバター画像</label>
          <div class="control">
            <div class="file has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="resume"
                  @change.prevent="selectFile"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file…</span>
                </span>
                <span class="file-name">{{
                  avatarFile ? avatarFile.name : ""
                }}</span>
              </label>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="update">更新</button>
        <button class="button" @click="cancel">キャンセル</button>
      </footer>
    </div>
  </div>
</template>

<script>
import pmTextField from "./TextField";

export default {
  name: "pm-profile-edit-modal",
  components: { pmTextField },
  props: {
    name: String,
    value: Boolean
  },
  data() {
    return {
      userName: this.name,
      userNameError: null,
      avatarFile: null
    };
  },
  computed: {
    active: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    update() {
      if (!this.userName) {
        this.userNameError = "ユーザー名は必須です";
        return;
      }
      this.$emit("update", {
        name: this.userName,
        file: this.avatarFile,
        teardown: () => {
          this.userNameError = null;
          this.avatarFile = null;
          this.active = false;
        }
      });
    },
    cancel() {
      this.userName = this.name;
      this.userNameError = null;
      this.avatarFile = null;
      this.active = false;
    },
    selectFile(e) {
      this.avatarFile = e.target.files[0];
    }
  }
};
</script>
